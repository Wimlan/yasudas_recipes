import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Recipe } from "../pages/Recipe";

const carouselRecipes = [
  "Omelett med shredded chicken, spenat & fetaost",
  "Kycklinggryta med curry",
  "Sallad med yoghurtmarinerad lax",
];

function MainCarousel() {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);

  useEffect(() => {
    Promise.all(
      carouselRecipes.map((recipe) =>
        fetch(`/api/recipes/?search=${recipe}`)
          .then((response) => response.json())
          .then((result) => result[0]),
      ),
    ).then((results) => setRecipes(results));
  }, []);

  return (
    <>
      <Carousel id="main-carousel">
        {recipes?.map((recipe) => (
          <Carousel.Item interval={1500} key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>
              <img
                className="d-block w-100"
                src={recipe.image_url}
                alt="Slides"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: "60%",
                  background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                }}
              />
              <Carousel.Caption>
                <h3>{recipe.name}</h3>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

export default MainCarousel;
