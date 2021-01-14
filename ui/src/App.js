import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import PlatScreen from "./screens/platScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/shippingScreen";
import AdminScreen from "./screens/adminScreen"
import OrderScreen from "./screens/orderScreen"
import ProductsScreen from "./screens/productsScreen"
import { connect } from "react-redux";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import {addType} from "./actions/commandeActions"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commande: "livraison",
      modal : true
    };
  }
  validerChoix= () => {
    
    this.props.addType(this.state.commande)
  }
  setType = (e) => {
    this.setState({
      commande: e.target.value,
    });
  };


  render() {
    const { userInfo } = this.props.user;
    const {cartItems} = this.props.cart
   console.log(this.props.commande);

    return (
      <BrowserRouter>
        <div className="grid-container">
          <header className="header">
            <div className="brand">
              <Link to="/">Restaurant</Link>
            </div>
            <div className="header-links">
              {/* <a href="cart.html">Cart</a> */}
              <Link to="/">
              Panier
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
              {userInfo ? (
                <Link to="/profile">{userInfo.name}</Link>
              ) : (
                <Link to="/signin">Sign In</Link>
              )}
              {userInfo && userInfo.isAdmin && (
                
                <div className="dropdown">
                <Link href="#">Admin</Link>
                <ul className="dropdown-content">
                <li>
                  <Link to="/orders">Commandes</Link>
                  <Link to="/products">Plats</Link>
                </li>
              </ul>
              </div>

              
              )}
            </div>
          </header>
          {!this.props.commande && (
          <Modal className="modal_commande" isOpen={true}>
            <Zoom>
              <div>
                <div class="modal-body">
                  <h2>Choississez le type de commande </h2>
                </div>
                <div class="modal-body">
                  <select
                    value={this.state.commande}
                    onChange={this.setType}
                    class="form-control form-control-lg"
                  >
                    <option value="livraison"> Livraison</option>
                    <option value="emporter">Emporter</option>
                  </select>
                </div>
                <div>
                <button type="button" onClick={this.validerChoix} class="btn btn-primary">Valider</button>
                </div>
              </div>
            </Zoom>
          </Modal>
         
          )}

          <Route path="/" component={HomeScreen} exact />
          <Route path="/plat/:id" component={PlatScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/orders" component={AdminScreen} />
          <Route path="/products" component={ProductsScreen} />
          <Route path="/order" component={OrderScreen} />
        </div>
      </BrowserRouter>
    );
  }
}
export default connect(
  (state) => ({
    user: state.user,
    cart: state.cart,
    commande : state.commande.typeCommande
  }),
  {addType}
)(App);
