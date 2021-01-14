import React, { Component } from "react";
import formatCurrency from "../util";

import { connect } from "react-redux";

import Zoom from "react-reveal/Zoom";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  Payer = () => {
    this.props.history.push("/");
  };
 

  render() {
    const { order ,commande } = this.props;
    return (
      <div>
        <div className="checkout-steps">
          <div className="active">Connexion</div>
          <div className="active">Authentification</div>
          <div className="active">Paiement</div>
        </div>

        {order && (
          <div>
            <Zoom>
              <div className="order-details">
                <h3 className="success-message">
                  Votre commande a été enregistrée.
                </h3>
                <h2>Commande {order._id}</h2>
                <ul>
                  <li>
                    <div>Nom:</div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>Email:</div>
                    <div>{order.email}</div>
                  </li>
                  {commande ==="livraison" && (
                  <li>
                    <div>Adresse:</div>
                    <div>{order.adresse}</div>
                  </li>)}
                  <li>
                    <div>Date:</div>
                    <div>{order.createdAt}</div>
                  </li>
                  <li>
                    <div>Total:</div>
                    <div>{formatCurrency(order.total)}</div>
                  </li>
                  <li>
                    <div>Plats du panier:</div>
                    <div>
                      {order.cartItems.map((x) => (
                        <div>
                          {x.count} {" x "} {x.name}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
                <div>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={this.Payer}
                  >
                    {" "}
                    Payer
                  </button>
                </div>
              </div>
            </Zoom>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    order: state.order.order,
    commande : state.commande.typeCommande

  }),
  {}
)(Cart);
