import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

function Recommended() {
  const [meal, setMeal] = useState<Meal[] | null>(null);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese")
      .then((response) => response.json())
      .then((result) => {
        setMeal(result.meals);
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
        {meal?.slice(0, 6).map((value) => (
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
    </>
  );
}

export default Recommended;
