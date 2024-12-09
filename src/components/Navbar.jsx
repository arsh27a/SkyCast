import React from "react";
import Logo from "/images/myLogo1.png";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <header class="py-3 mb-3   fixed-top">
        <div class="container-fluid d-flex flex-wrap justify-content-between align-items-center gap-3">
          <a
            href="/"
            class="d-flex align-items-center link-body-emphasis text-decoration-none"
          >
            <img src={Logo} class="bi me-2" alt="logo" />
            <span class="fs-2 text-light">SkyCast</span>
          </a>

          <div class="search">
            <form action="/weather" method="post">
              <input
                type="text"
                autocomplete="off"
                placeholder="Search your City..."
                name="loc"
                class="text-light"
              />
              <button type="submit" class="submit">
                <i class="bi bi-search"></i>
              </button>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
