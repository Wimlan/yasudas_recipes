import express from "express";
import pool from "./database.ts";

const app = express();
app.use(express.json());

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

interface Step {
  step_number: number;
  instruction: string;
}

interface Recipe {
  id: number;
  name: string;
  image_url: string;
  servings: number;
  time_minutes: number;
  category_id: number;
  ingredients: Ingredient[];
  steps: Step[];
}

//checks that there is no missing info
async function validateRecipe(
  req: express.Request<
    any, // request.params
    any, // response.send
    Recipe, // request.body
    any // request.query
  >,
  res: express.Response,
  next: express.NextFunction,
) {
  const required: (keyof Recipe)[] = [
    "name",
    "image_url",
    "servings",
    "time_minutes",
    "category_id",
    "steps",
    "ingredients",
  ];

  const missing = required.some(
    (field) => req.body[field] === undefined || req.body[field] === null,
  );

  if (missing) {
    res.status(400).send("Information in body missing");
  } else {
    next();
  }
}

async function getDetailedRecipes(recipes: Recipe[]) {
  return Promise.all(
    recipes.map(async (recipe) => {
      const result = await pool.query<Step>(
        "SELECT * FROM steps WHERE recipe_id=$1 ORDER BY step_number",
        [recipe.id],
      );

      const steps: Step[] = result.rows;

      const results = await pool.query<Ingredient>(
        `SELECT ingredients.name, recipes_ingredients.amount, units.name AS unit
      FROM recipes_ingredients
      JOIN ingredients ON recipes_ingredients.ingredient_id = ingredients.id
      JOIN units ON recipes_ingredients.unit_id = units.id
      WHERE recipes_ingredients.recipe_id = $1`,
        [recipe.id],
      );

      const ingredients: Ingredient[] = results.rows;

      return { ...recipe, steps, ingredients };
    }),
  );
}

//GET RECIPE LIST
app.get("/api/recipes", async (req, res) => {
  //Query can be used to filter recipes by category, if no query is provided all recipes will be returned
  let category = req.query.category as string | undefined;

  if (category !== undefined) {
    try {
      //retrieves the category id from the database based on the provided category name
      const categoryresult = await pool.query<{ id: number }>(
        "SELECT id FROM categories WHERE name ILIKE $1",
        [category],
      );
      const categoryId: Array<{ id: number }> = categoryresult.rows;

      if (categoryId.length === 0) {
        res.status(404).send("Category not found");
        return;
      }

      //retrieves the recipes that belong to the specified category using the retrieved category id
      const result = await pool.query<Recipe>(
        "SELECT * FROM recipes WHERE category_id=$1",
        [categoryId[0]?.id],
      );
      const recipes: Recipe[] = result.rows;

      res.send(await getDetailedRecipes(recipes));
    } catch {
      res.status(500).send("Category not found");
    }
  } else {
    try {
      //Retrieves all recipes if no category query is provided
      const result = await pool.query<Recipe>("SELECT * FROM recipes");
      const recipes: Recipe[] = result.rows;

      res.send(await getDetailedRecipes(recipes));
    } catch (error) {
      console.error("Error retrieving recipes:", error);
      res.status(500).send("Error retrieving recipes");
    }
  }
});

//ADD A RECIPE
app.post("/api/recipes/add", validateRecipe, async (req, res) => {
  const {
    name,
    image_url,
    servings,
    time_minutes,
    category_id,
    ingredients,
    steps,
  } = req.body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    //Adds recipe
    const recipe = await client.query(
      "INSERT INTO recipes (name, image_url, servings, time_minutes, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [name, image_url, servings, time_minutes, category_id],
    );
    const recipeId = recipe.rows[0].id;

    for (const step of steps) {
      //Adds instructions
      await client.query(
        "INSERT INTO steps (recipe_id, step_number, instruction) VALUES ($1, $2, $3)",
        [recipeId, step.step_number, step.instruction],
      );
    }

    for (const item of ingredients) {
      //Adds ingredient
      await client.query(
        "INSERT INTO ingredients (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
        [item.name],
      );
      const result = await client.query(
        "SELECT id FROM ingredients WHERE name=$1",
        [item.name],
      );
      const ingredientId = result.rows[0].id;

      //Adds unit
      await client.query(
        "INSERT INTO units (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
        [item.unit],
      );
      const unitResult = await client.query(
        "SELECT id FROM units WHERE name=$1",
        [item.unit],
      );
      const unitId = unitResult.rows[0].id;

      //Adds to recipe
      await client.query(
        "INSERT INTO recipes_ingredients (recipe_id, amount, unit_id, ingredient_id) VALUES ($1, $2, $3, $4)",
        [recipeId, item.amount, unitId, ingredientId],
      );
    }

    await client.query("COMMIT");
    res.status(201).json("Recipe created");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error saving recipe:", error);
    res
      .status(500)
      .send(
        "Failed to save recipe. It might already exist or there was an error with the database.",
      );
  } finally {
    client.release();
  }
});

//UPDATE A RECIPE
app.put(
  "/api/recipes/update/:id",
  async (
    req: express.Request<
      { id: string }, // request.params
      string, // response.send
      Recipe, // request.body
      void // request.query
    >,
    res: express.Response,
  ) => {
    const { name, image_url, servings, time_minutes, category_id } = req.body;
    const id = Number(req.params.id);
    const result = await pool.query<{ id: number }>(
      "SELECT id FROM recipes WHERE id=$1",
      [id],
    );

    const recipeId = result.rows[0]?.id;
    if (!recipeId) {
      res.status(404).send("ID not found");
      return;
    }

    try {
      await pool.query(
        `UPDATE recipes SET
        name = COALESCE($1, name),
        image_url = COALESCE($2, image_url),
        servings = COALESCE($3, servings),
        time_minutes = COALESCE($4, time_minutes),
        category_id = COALESCE($5, category_id)
        WHERE id=$6`,
        [name, image_url, servings, time_minutes, category_id, id],
      );
      res.send("Recipe updated");
    } catch (error) {
      console.error("Error updating recipe:", error);
      res.status(500).send("Update failed");
    }
  },
);

//DELETE RECIPE
app.delete(
  "/api/recipes/delete/:id",
  async (
    req: express.Request<
      { id: string }, // request.params
      string, // response.send
      void, // request.body
      void // request.query
    >,
    res: express.Response,
  ) => {
    const client = await pool.connect();
    try {
      const id = Number(req.params.id);
      const result = await pool.query<{ id: number }>(
        "SELECT id FROM recipes WHERE id=$1",
        [id],
      );
      const recipeId = result.rows[0]?.id;
      if (!recipeId) {
        res.status(404).send("ID not found");
        return;
      }

      await client.query("BEGIN");
      await client.query("DELETE FROM steps WHERE recipe_id=$1", [id]);
      await client.query("DELETE FROM recipes_ingredients WHERE recipe_id=$1", [
        id,
      ]);
      await client.query("DELETE FROM recipes WHERE id=$1", [id]);
      await client.query("COMMIT");

      res.send("Recipe deleted");
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error deleting recipe:", error);
      res.status(500).send("Failed to delete");
    } finally {
      client.release();
    }
  },
);

app.listen(3000, () => {
  console.log("Webbtjänsten kan nu ta emot anrop.");
});
