import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navUl">
        <li>
          <Link to="/">
            <button className="navButton home">Home</button>
          </Link>
        </li>
        <li>
          <Link to="/bookings">
            <button className="navButton booking">Booking</button>
          </Link>
        </li>
        <li>
          <Link to="/getproducts">
            <button className="navButton getproducts">Products</button>
          </Link>
        </li>
        <li>
          <Link to="/addformdata">
            <button className="navButton addformdata">AddFormData</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
