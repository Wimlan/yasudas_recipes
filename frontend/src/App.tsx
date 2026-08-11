import RecipeList from "./pages/RecipeList";
import Recipe from "./pages/Recipe";
import Home from "./pages/Home";

import MenuIcon from "./assets/menu.png";
import CloseMenu from "./assets/close-menu.png";
import RecipeListIcon from "./assets/recipelist.png";

import { useState } from "react";
import styled from "styled-components";

import {
  createHashRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";

function App() {
  let [menuToggle, setMenuToggle] = useState(false);

  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: "/" },
        { element: <RecipeList />, path: "/recipelist" },
        { element: <Recipe />, path: "/recipe/:id" },
      ],
      element: (
        <>
          <header id="header">
            <Div className="navbar">
              <div>
                <Img
                  onClick={() => {
                    setMenuToggle(!menuToggle);
                  }}
                  className="menu-icon"
                  src={!menuToggle ? MenuIcon : CloseMenu}
                  alt="menu"
                  width="70px"
                  height="70px"
                />
              </div>
              <div className="header-title">
                <Link to="/">
                  <h1>YASUDAS</h1>
                  <h2>favoritrecept</h2>
                </Link>
              </div>
              <div>
                <Link to="/recipelist">
                  <img
                    className="book-icon"
                    src={RecipeListIcon}
                    alt="receptbok"
                    width="60px"
                    height="60px"
                  />
                </Link>
              </div>
            </Div>
            {menuToggle && (
              <nav>
                <Ul className="toggle-menu">
                  <li>
                    <Link to="/">Hem</Link>
                  </li>
                  <li>
                    <Link to="/recipelist">Receptbok</Link>
                  </li>
                </Ul>
              </nav>
            )}
          </header>
          <Main>
            <Outlet />
          </Main>
          <footer>
            <div>
              <p>
                Website by
                <br /> Wilma Yasuda
              </p>
              <a href="https://wilmayasuda.se/">wilmayasuda.se</a>
            </div>

            <ul>
              <h3>Icons Used</h3>
              <li>
                <a
                  target="_blank"
                  href="https://icons8.com/icon/TQynzdmQAZ0r/cooking-book"
                >
                  Recipe
                </a>{" "}
                from{" "}
                <a target="_blank" href="https://icons8.com">
                  Icons8
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://icons8.com/icon/nWGJKOIFzDXx/xbox-menu"
                >
                  Hamburger Button
                </a>{" "}
                from{" "}
                <a target="_blank" href="https://icons8.com">
                  Icons8
                </a>
              </li>
              <li>
                <a target="_blank" href="https://icons8.com/icon/18636/slider">
                  Filter
                </a>{" "}
                from{" "}
                <a target="_blank" href="https://icons8.com">
                  Icons8
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://icons8.com/icon/pHtKLuytfhLc/close-window"
                >
                  Close Window
                </a>{" "}
                from{" "}
                <a target="_blank" href="https://icons8.com">
                  Icons8
                </a>
              </li>
            </ul>
          </footer>
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 2em;
  @media (max-width: 540px) {
    padding: 1em 1em;
  }
`;
const Ul = styled.ul`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 2em 3em 3em 3em;
  position: absolute;
  z-index: 100;
  list-style-type: none;
`;
const Main = styled.main`
  position: relative;
`;
const Img = styled.img`
  cursor: pointer;
`;
