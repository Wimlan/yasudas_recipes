import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import type { Recipe } from "../pages/Recipe";

function Recommended() {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);

  useEffect(() => {
    fetch("/api/recipes")
      .then((response) => response.json())
      .then((result) => {
        setRecipes(result);
      });
  }, []);

  return (
    <>
      <div className="rec-head">
        <h2>Nyheter!</h2>
        <Link to="/recipelist">
          {" "}
          <Button variant="primary">Alla Recept</Button>
        </Link>
      </div>

      <Row xs={1} md={2} className="g-5 meal-cards">
        {recipes?.slice(0, 6).map((recipe) => (
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
    </>
  );
}

export default Recommended;
