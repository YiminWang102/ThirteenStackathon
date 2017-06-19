import React from 'react';
import {Link} from 'react-router';

const Navbar = props => {
  return (
    <nav className="navbar">
      <h1 className="navbar-brand mb-0">Navbar</h1>
      <button className="btn btn-outline-success" type="button">Main button</button>
    </nav>
  );
};

export default Navbar;

//
// <div>
//   <Link to="/handbuilder" className="btn btn-default">Hand Builder</Link>
//   <Link to="/practice" className="btn btn-default">Practice Against Computers</Link>
//   <Link to="/play" className="btn btn-default">Play Against People</Link>
// </div>
