import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import {updateUser} from "../actions/userActions"
import {createOrder} from "../actions/orderActions"

import formatCurrency from "../util";

class Shipping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: "",
      name: "",
      adresse: "",
      rue: "",
      batiment: "",
      phone: "",
      methodPayment : true
    };
  }
  handlePayment = (e) => {
    this.setState({
      methodPayment : !this.state.methodPayment
    })
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidMount() {
    const { cartItems } = this.props;
console.log(cartItems);
    if (cartItems.length=== 0) {
      this.props.history.push("/");
    }
  }
  showModal = () => {
    this.setState({
      modal: true,
    });
  };
  Payer = () => {
    const { userInfo } = this.props.user;
    const { cartItems } = this.props;
    // let cart =[];
    
    let totalpanier = 0;
    cartItems.map((item) => (totalpanier = totalpanier + item.total));
   const order = {
     name : userInfo.name,
     email : userInfo.email,
     adresse : userInfo.adresse,
     total : totalpanier,
     cartItems : cartItems
   }
   console.log(order);
   this.props.createOrder(order);
   this.props.history.push("/order");
   

  }
  submitHandler = () => {
    //   console.log(this.props.user.userInfo._id );
    // e.preventDefault();
    this.props.updateUser(this.props.user.userInfo._id , this.state.name ,this.state.email ,this.state.phone,this.state.adresse,this.state.rue,this.state.batiment)
    this.setState({
      modal: false,
    });
  

  };
  render() {
    const { cartItems , commande } = this.props;
    const { userInfo } = this.props.user;
    console.log(this.state.methodPayment);
    let totalpanier = 0;
    cartItems.map((item) => (totalpanier = totalpanier + item.total));
    return (
      <div className="shipping">
        <div className="row ">
          <div className="col-5">
            <h2>Mon Panier</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Produit</th>
                  <th scope="col">Prix Unité</th>
                  <th scope="col">Quantité</th>
                  <th scope="col">Prix Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>
                      {formatCurrency(
                        item.price[item.sizes.indexOf(item.size)]
                      )}
                    </td>
                    <td>{item.count}</td>
                    <td>{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <label className="totalPanier">
                Total : {formatCurrency(totalpanier)}
              </label>
            </div>
          </div>
          <div className="col-3">
            {!userInfo ? (
              <div>loading...</div>
            ) : (
              <div>
                <div className="form-group">
                  <label className="col-form-label-lg" for="exampleInputEmail1">
                    Nom
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="exampleInputname"
                    value={userInfo.name}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label-lg" for="exampleInputEmail1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="exampleInputEmail1"
                    value={userInfo.email}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label-lg" for="exampleInputEmail1">
                    Telephone
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="exampleInputphone"
                    value={userInfo.phone}
                    disabled
                  />
                </div>
                {commande ==="livraison" && (
                  <div>
                  <div className="form-group">
                  <label className="col-form-label-lg" for="exampleInputEmail1">
                    Adresse
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="exampleInputAdresse"
                    value={userInfo.adresse}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label-lg" for="exampleInputEmail1">
                    Rue
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="exampleInputrue"
                    value={userInfo.rue}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label-lg" for="exampleInputEmail1">
                    Batiment
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="exampleInputbatiment"
                    value={userInfo.batiment}
                    disabled
                  />
                </div>
                </div>
                )
                }
                
              </div>
            )}

            <div>
            <button type="button"  onClick={this.showModal} className="btn btn-primary btn-lg">
             
                Modifiez les informations
              </button>
            </div>
          </div>
          <div className="col-3">
          <div>
                <div className="modal-body">
                  <h2>Choississez le type payment</h2>
                </div>
                <div className="Paymentmethod">
                <input type="checkbox" className="form-check-input" checked={this.state.methodPayment} onChange={this.handlePayment} name="methodPayment" />
    <label className="form-check-label" for="exampleCheck1"> Paypal</label>
           
                </div>
                <div>
                <button type="button" className="btn btn-primary btn-lg" onClick={this.Payer} >Valider et Payer</button>
                </div>
              </div>
          </div>
        </div>
        {!userInfo ? (
          <div></div>
        ) : (
          <Modal isOpen={this.state.modal}>
            <div className="center">
              <Zoom>
                <form onSubmit={this.submitHandler}>
                  <ul className="form-container">
                    <li>
                      <h2>Modifier mon compte</h2>
                    </li>

                    <li>
                      <label htmlFor="name">Nom</label>
                      <input
                        type="name"
                        name="name"
                        id="name"
                        placeholder={userInfo.name}
                        value={this.state.name}
                        onChange={this.handleInput}
                      ></input>
                    </li>
                    <li>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder={userInfo.email}
                        value={this.state.email}
                        onChange={this.handleInput}
                      ></input>
                    </li>
                    {commande ==="livraison" && (
                      <div>
                    <li>
                      <label htmlFor="adresse">Adresse</label>
                      <input
                        type="text"
                        id="adresse"
                        name="adresse"
                        placeholder={userInfo.adresse}
                        value={this.state.adresse}
                        onChange={this.handleInput}
                      ></input>
                    </li>
                    <li>
                      <label htmlFor="rue">Rue</label>
                      <input
                        type="text"
                        id="rue"
                        name="rue"
                        placeholder = {userInfo.rue}
                        value={this.state.rue}
                        onChange={this.handleInput}
                      ></input>
                    </li>
                    <li>
                      <label htmlFor="batiment">Bâtiment </label>
                      <input
                        type="text"
                        id="batiment"
                        name="batiment"
                        placeholder={userInfo.batiment}
                        value={this.state.batiment}
                        onChange={this.handleInput}
                      ></input>
                    </li>
                    </div>)}
                    <li>
                      <label htmlFor="phone">Telephone</label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder={userInfo.phone}
                        value={this.state.phone}
                        onChange={this.handleInput}
                      ></input>
                    </li>
                    <li>
                      <button type="submit" className="button primary">
                        Modifier
                      </button>
                    </li>
                  </ul>
                </form>
              </Zoom>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}
export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
    user: state.user,
    commande : state.commande.typeCommande

  }),
  { updateUser , createOrder}
)(Shipping);
