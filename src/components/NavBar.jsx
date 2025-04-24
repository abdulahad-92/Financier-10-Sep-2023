import React from "react";
import Home from "./icons/home.svg";
import History from "./icons/book.svg";
import Info from "./icons/info.svg";
import Logo from "./img/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar(props) {
  const [menu, openMenu] = useState(false);
  return (
    <nav>
      <div id="logo">
        <img src={Logo} alt="logo" />
      </div>
      <ul id="links" className={menu ? "open" : null}>
        <li onClick={() => (menu ? openMenu(false) : openMenu(true))}>
          <Link to="/">
            <span className="icon">
              <img src={Home} />
            </span>
            <span className="text">Home</span>
          </Link>
        </li>
        <li onClick={() => (menu ? openMenu(false) : openMenu(true))}>
          <Link to="/history">
            <span className="icon">
              <img src={History} alt="" />
            </span>
            <span className="text">History</span>
          </Link>
        </li>
        <li onClick={() => (menu ? openMenu(false) : openMenu(true))}>
          <Link to="/info">
            <span className="icon">
              <img src={Info} alt="" />
            </span>
            <span className="text">Info</span>
          </Link>
        </li>
      </ul>
      <div
        id="menu"
        className={menu ? "open" : null}
        onClick={() => (menu ? openMenu(false) : openMenu(true))}
      >
        <div id="burger"></div>
      </div>
    </nav>
  );
}
