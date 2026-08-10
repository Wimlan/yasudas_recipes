import { useEffect, useState, useContext } from "react";
import SearchContext from "./SearchContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import type { Categories } from "../pages/RecipeList";
// import Button from 'react-bootstrap/Button';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface SearchResultProps {
  category: Categories;
}

function SearchResult({ category }: SearchResultProps) {
  const { search } = useContext(SearchContext);
  const [meal, setMeal] = useState<Meal[] | null>(null);

  useEffect(() => {
    if (search === "") {
      fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese")
        .then((response) => response.json())
        .then((result) => {
          setMeal(result.meals);
        });
    } else {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then((response) => response.json())
        .then((result) => {
          setMeal(result.meals);
        });
    }
  }, [search]);

  useEffect(() => {
    if (category === null) {
      fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese")
        .then((response) => response.json())
        .then((result) => {
          setMeal(result.meals);
        });
    } else {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((response) => response.json())
        .then((result) => {
          setMeal(result.meals);
        });
    }
  }, [category]);

  return (
    <>
      <div className="all-recipes">
        <Row xs={1} md={2} className="g-5 meal-cards">
          {meal?.map((value) => (
            <Col key={value.idMeal}>
              <Link to={`/recipe/${value.idMeal}`}>
                <Card>
                  <Card.Img variant="top" src={value.strMealThumb} />
                  <Card.Body>
                    <Card.Title>{value.strMeal}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default SearchResult;
