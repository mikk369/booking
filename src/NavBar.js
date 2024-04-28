import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul className='navUl'>
        <li>
          <Link to="/"><button className="home">Home</button></Link>
        </li>
        <li>
          <Link to="/bookings"><button className="booking">Booking</button></Link>
        </li>
        <li>
          <Link to="/getproducts"><button className="getproducts">Products</button></Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
