import React, {Component} from 'react';
import Navbar from './Navbar';


export default function App ({ children }) {
  return (
    <div id="main" className="container-fluid">
      <div>
        { children }
      </div>
    </div>
  );
}
