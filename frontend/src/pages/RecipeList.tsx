import SearchContext from "../components/SearchContext";
import SearchResult from "../components/SearchResult";
import Filter from "../components/Filter";
import { useState } from "react";

export type Categories = "seafood" | "meat" | "veg" | null;

function RecipeList() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Categories>(null);

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "1em 0" }}>Receptbok</h1>
      <SearchContext.Provider value={{ search, setSearch }}>
        <Filter setCategory={setCategory} />
        <SearchResult category={category} />
      </SearchContext.Provider>
    </>
  );
}

export default RecipeList;
