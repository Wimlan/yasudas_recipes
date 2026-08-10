import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

function Recipe() {
  const { id } = useParams();

  const [meal, setMeal] = useState<Meal | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [measure, setMeasure] = useState<string[]>([]);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((result) => {
        const mealData = result.meals?.[0];
        setMeal(mealData);

        const newIngredients: string[] = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = mealData[`strIngredient${i}`];
          if (ingredient && ingredient.trim() !== "") {
            newIngredients.push(ingredient);
          }
        }
        setIngredients(newIngredients);

        const newMeasure: string[] = [];
        for (let i = 1; i <= 20; i++) {
          const measure = mealData[`strMeasure${i}`];
          if (measure && measure.trim() !== "") {
            newMeasure.push(measure);
          }
        }
        setMeasure(newMeasure);
      });
  }, [id]);

  return (
    <>
      <article id="recipe-detail">
        <h2>{meal?.strMeal}</h2>
        <img src={meal?.strMealThumb} alt="" />

        <div className="instructions">
          <h3 className="amount">
            <span>Portioner: 4</span> <span>Tid: 40 min</span>
          </h3>

          <section>
            <h3>Ingredienser</h3>
            <div className="ingredients">
              <ul className="food">
                {ingredients.map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
              <ul>
                {measure.map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h3>Instruktioner</h3>
            <p>{meal?.strInstructions}</p>
          </section>
        </div>
      </article>
    </>
  );
}

export default Recipe;
