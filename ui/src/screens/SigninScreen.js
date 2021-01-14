import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {addUser } from "../actions/userActions"
import { connect } from "react-redux";
import jwt_decode from "jwt-decode"


 class SigninScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    password : "",
    email : ""
  }
}
  redirect = this.props.location.search ? this.props.location.search.split("=")[1] : '/';

 
  componentDidMount() {
    if (this.props.userInfo) {
      this.props.history.push(this.redirect);
    }
    
  }
  setPassword = (e) => {
    this.setState({
      password : e.target.value
    })
  }
  setMail = (e) => {
    this.setState({
      email : e.target.value
    })
  }
   submitHandler = (e) => {
    var self=this;
    e.preventDefault();
   
   axios
     .post(
       "http://localhost:5000/api/signin" 
        ,
       {email :   this.state.email ,
       password : this.state.password }
     )
     
     .then(function(response) {
       
       if (response.data.token) {
       
         const { token } = response.data;
        
   
     const decoded = jwt_decode(token);
     console.log(decoded);
           self.props.addUser(decoded)
           if (self.redirect) {
      self.props.history.push(self.redirect);
   window.location.reload();

             
           } else {
      self.props.history.push("/");
             
           }
          
        //    push(        
        //      "/Dashboard" 
             
        //  );         
       }  else if (response.data.error === "invalid password" ) {
         console.log(response.data);

         alert("verifier votre mot de passe");
       
         self.props.errorUser(response.data)

       }
       else {
         console.log(response.data);

         alert("verifier votre mail");
       

         self.props.errorUser(response.data)

       }
     })
     .catch(function(error) {
       console.log(error);

     });
 };

  
  render() {
    console.log(this.redirect);
    console.log(this.props.userInfo);
    return (
        <div className="form">
        <form onSubmit={this.submitHandler} >
          <ul className="form-container">
            <li>
              <h2>Se connecter</h2>
            </li>
          
            <li>
              <label htmlFor="email">
                Email
              </label>
              <input type="email" name="email" id="email" onChange={this.setMail}>
              </input>
            </li>
            <li>
              <label htmlFor="password">Mot de passe</label>
              <input type="password" id="password" name="password" onChange={this.setPassword}>
              </input>
            </li>
            <li>
              <button type="submit" className="button primary">Se connecter</button>
            </li>
            <li>
            Nouveau au Restaurant?
            </li>
            <li>
              <Link to={this.redirect === "/" ? "register" : "register?redirect=" + this.redirect} className="button secondary text-center" >Créez votre compte dans Restaurant</Link>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}
export default connect( (state) => ({ userInfo: state.user.userInfo }),{
  addUser
})(SigninScreen);