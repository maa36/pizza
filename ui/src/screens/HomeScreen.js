import React, { Component } from "react";
import Plats from "../components/Plats";
import Cart from "../components/Cart";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div id="top" className="starter_container bg">
          <div className="follow_container">
            <div className="col-md col-md-offset-3">
              <h2 className="top-title"> Restaurant</h2>
              <h2 className="white second-title">
                " Le meilleur de la ville "
              </h2>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="main">
            <Plats></Plats>
          </div>
          <div className="sidebar">
            <Cart />
          </div>
        </div>
        </div>
    );
  }
}
