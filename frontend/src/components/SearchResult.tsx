import { useEffect, useState, useContext } from "react";
import SearchContext from "./SearchContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import type { Categories } from "../pages/RecipeList";
// import Button from 'react-bootstrap/Button';
import type { Recipe } from "../pages/Recipe";

interface SearchResultProps {
  category: Categories;
}

function SearchResult({ category }: SearchResultProps) {
  const { search } = useContext(SearchContext);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);

  useEffect(() => {
    if (search === "" && category === null) {
      fetch("/api/recipes")
        .then((response) => response.json())
        .then((result) => {
          setRecipes(result);
        });
    } else if (search !== "") {
      fetch(`/api/recipes/?search=${search}`)
        .then((response) => response.json())
        .then((result) => {
          setRecipes(result);
        });
    } else {
      fetch(`/api/recipes/?category=${category}`)
        .then((response) => response.json())
        .then((result) => {
          setRecipes(result);
        });
    }
  }, [search, category]);

  return (
    <>
      <div className="all-recipes">
        <Row xs={1} md={2} className="g-5 meal-cards">
          {recipes?.map((recipe) => (
            <Col key={recipe.id}>
              <Link to={`/recipe/${recipe.id}`}>
                <Card>
                  <Card.Img variant="top" src={recipe.image_url} />
                  <Card.Body>
                    <Card.Title>{recipe.name}</Card.Title>
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
