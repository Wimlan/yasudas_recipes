import { useState, useContext } from "react";
import SearchContext from "./SearchContext";

import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import type { Categories } from "../pages/RecipeList";

interface FilterProps {
  setCategory: (value: Categories) => void;
}

function Filter({ setCategory }: FilterProps) {
  const [input, setInput] = useState<string>("");
  const { setSearch } = useContext(SearchContext);

  return (
    <>
      <Accordion flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Filtrera</Accordion.Header>
          <Accordion.Body>
            <InputGroup className=" mt-3 m-auto search-input">
              <Form.Control
                placeholder="Sök efter recept"
                aria-label="Sök efter recept"
                aria-describedby="basic-addon2"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
              <Button
                variant="third"
                id="button-addon2"
                onClick={() => {
                  setSearch(input);
                  setInput("");
                }}
              >
                Sök
              </Button>
            </InputGroup>
            <div className="categories">
              <Button
                variant="third"
                id="button-addon2"
                onClick={() => setCategory("seafood")}
              >
                Fisk
              </Button>
              <Button
                variant="third"
                id="button-addon2"
                onClick={() => setCategory("beef")}
              >
                Kött
              </Button>
              <Button
                variant="third"
                id="button-addon2"
                onClick={() => setCategory("vegetarian")}
              >
                Vegetariskt
              </Button>

              <Button
                variant="primary"
                id="button-addon2"
                onClick={() => {
                  setCategory(null);
                  setSearch("");
                }}
              >
                Visa alla recept
              </Button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default Filter;
