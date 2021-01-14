import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      name: "",
      rePassword: "",
      adresse: "",
      rue: "",
      batiment: "",
      phone: "",
      success: false,
    };
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  redirect = this.props.location.search
    ? this.props.location.search.split("=")[1]
    : "/";
  componentDidMount() {
    if (this.props.userInfo) {
      this.props.history.push("/");
    }
  }
  submitHandler = (e) => {
    e.preventDefault();
    const self = this;

    axios
      .post("http://localhost:5000/api/register", {
        password: this.state.password,
        email: this.state.email,
        phone: this.state.phone,
        name: this.state.name,
        batiment: this.state.batiment,
        rue: this.state.rue,
        adresse: this.state.adresse,
      })
      .then(function (response) {
        console.log(response);
        self.setState({
          password: "",
          email: "",
          name: "",
          rePassword: "",
          adresse: "",
          rue: "",
          batiment: "",
          phone: "",
          success: true,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    
    return (
      <div className="form form_registe">
        <form onSubmit={this.submitHandler}>
          <ul className="form-container">
            {!this.state.success ? (
              <div></div>
            ) : (
              <div className="alert alert-success" role="alert">
                Votre compte a été créé avec succès
              </div>
            )}

            <li>
              <h2>Créer un compte</h2>
            </li>

            <li>
              <label htmlFor="name">Nom</label>
              <input
                type="name"
                name="name"
                id="name"
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
                value={this.state.email}
                onChange={this.handleInput}
              ></input>
            </li>
            <li>
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInput}
              ></input>
            </li>
            <li>
              <label htmlFor="rePassword">Entrez à nouveau Mot de passe</label>
              <input
                type="password"
                id="rePassword"
                name="rePassword"
                value={this.state.rePassword}
                onChange={this.handleInput}
              ></input>
            </li>
            <li>
              <label htmlFor="adresse">Adresse</label>
              <input
                type="text"
                id="adresse"
                name="adresse"
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
                value={this.state.batiment}
                onChange={this.handleInput}
              ></input>
            </li>
            <li>
              <label htmlFor="phone">Telephone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={this.state.phone}
                onChange={this.handleInput}
              ></input>
            </li>
            <li>
              <button type="submit" className="button primary">
                S'inscrire
              </button>
            </li>
            <li>
              Vous avez déjà un compte?
              <Link
                to={
                  this.redirect === "/"
                    ? "signin"
                    : "signin?redirect=" + this.redirect
                }
                className="button secondary text-center"
              >
                Connectez-vous à votre compte
              </Link>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}
export default connect(
  (state) => ({ userInfo: state.user.userInfo }),
  {}
)(RegisterScreen);
