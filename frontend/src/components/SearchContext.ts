import { createContext } from "react";

type SearchContextType = {
  search: string;
  setSearch: (value: string) => void;
};

const SearchContext = createContext<SearchContextType>({
  search: "",
  setSearch: () => {},
});

export default SearchContext;
