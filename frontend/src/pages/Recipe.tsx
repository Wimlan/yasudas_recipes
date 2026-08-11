import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export interface Recipe {
  id: string;
  name: string;
  image_url: string;
  ingredients: Ingredient[];
  steps: Step[];
}

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}
interface Step {
  id: number;
  step_number: number;
  instruction: string;
}

function Recipe() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then((response) => response.json())
      .then((result) => {
        setRecipe(result[0]);
      });
  }, [id]);

  return (
    <>
      <article id="recipe-detail">
        <h2>{recipe?.name}</h2>
        <img src={recipe?.image_url} alt="" />

        <div className="guide">
          <h3 className="amount">
            <span>Portioner: 4</span> <span>Tid: 40 min</span>
          </h3>

          <section className="ingredients">
            <h3>Ingredienser</h3>
            <div>
              {recipe?.ingredients.map((ingredient, index) => (
                <ul className="food">
                  <li key={index}>{ingredient.name}</li>
                  <div className="unit">
                    <li key={index}>{ingredient.amount}</li>
                    <li key={index}>{ingredient.unit}</li>
                  </div>
                </ul>
              ))}
            </div>
          </section>

          <section className="instructions">
            <h3>Instruktioner</h3>

            {recipe?.steps.map((step) => (
              <ul className="steps" key={step.id}>
                <li>{step.step_number}.</li>
                <li>{step.instruction}</li>
              </ul>
            ))}
          </section>
        </div>
      </article>
    </>
  );
}

export default Recipe;
