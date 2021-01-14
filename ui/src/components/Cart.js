import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../actions/cartActions";
// import Modal from "react-modal";
// import Zoom from "react-reveal/Zoom";
// import { removeFromCart } from "../actions/cartActions";
// import { createOrder, clearOrder } from "../actions/orderActions";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { cartItems } = this.props;
    let totalpanier = 0;
    cartItems.map((item) => (totalpanier = totalpanier + item.total));
    // console.log(totalpanier);
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Panier est vide</div>
        ) : (
          <div className="cart cart-header">
            Vous avez {cartItems.length} plats dans la panier{" "}
          </div>
        )}

        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {cartItems.map((item , index) => (
                  <li key={item._id + index} id={item._id + index}>
                    <div>
                      <img src={item.image} alt={item.title}></img>
                    </div>
                    <div>
                      <div>{item.name}</div>
                <div>Taille : {' '}{item.size}</div>
                      <div>
                        {" "}
                        les supplements :
                        <ul>
                          {item.supplement.map((item,indice) => (
                            <li key={indice}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        {" "}
                        les ingredients :
                        <ul>
                          {item.ingredient.map((x,i) => (
                            <li key={i}>{x}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="right">
                        {formatCurrency(item.price[(item.sizes.indexOf(item.size))])} x {item.count}{" "}
                        <button
                          onClick={() =>
                            this.props.removeFromCart(item._id,item.size )
                          }
                          type="button"
                          className="btn btn-danger"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
        </div>
        {cartItems.length === 0 ? (
          <div></div>
        ) : (
          <div className="cart">
            <div className="total">
              <div>Total: ${totalpanier}</div>
              <button type="button" className="btn btn-success">
                <Link className="button primary" to="/signin?redirect=shipping">
                  Commander
                </Link>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart }
)(Cart);
