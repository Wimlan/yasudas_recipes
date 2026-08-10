import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

function MainCarousel() {
  const [meal, setMeal] = useState<Meal[] | null>(null);
  const meals = [
    "Japanese Katsudon",
    "Ramen Noodles with Boiled Egg",
    "Sweet and Sour Pork",
  ];

  useEffect(() => {
    Promise.all(
      meals.map((m) =>
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${m}`)
          .then((response) => response.json())
          .then((result) => result.meals[0]),
      ),
    ).then((results) => setMeal(results));
  }, []);

  return (
    <>
      <Carousel id="main-carousel">
        {meal?.map((value) => (
          <Carousel.Item interval={1500} key={value.idMeal}>
            <Link to={`/recipe/${value.idMeal}`}>
              <img
                className="d-block w-100"
                src={value.strMealThumb}
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
                <h3>{value.strMeal}</h3>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

export default MainCarousel;
