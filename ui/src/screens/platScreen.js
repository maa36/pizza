import React, { Component } from "react";
import { detailsPlat } from "../actions/platActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Checkbox, CheckboxGroup } from "rsuite";
import { addToCart } from "../actions/cartActions";
// import { push } from "react-router-redirect";

class Plat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taille: "petite",
      choixIngredients: [],
      choixSupllements: [],
      NbreTaille : 0,
      qty : 1 ,
      total : 0
    };
  }
  addData = (e) => {
    
    e.preventDefault();
  }
  componentDidMount() {
    this.props.detailsPlat(this.props.match.params.id);
  }
  handleAddToCart = () => {
    console.log("add to cart");
  };

  handleChange =(event) =>{
    const value = event.target.value;
    console.log(value);
    this.setState({qty: value});
  }
  setTaille = (e) => {
    let value = e.target.value ;
    if (value==="petite") {
      this.setState({
        taille: e.target.value,
        NbreTaille : 0
      });
    }
    
    else if(value==="moyenne") {
      this.setState({
        taille: e.target.value,
        NbreTaille : 1
      });
    }
    else {
      this.setState({
        taille: e.target.value,
        NbreTaille : 2
      });
    }
    this.setState({
      taille: e.target.value,
    });
  };



  addData = (e) => {
    e.preventDefault();

    let nbrIngredients = this.state.choixIngredients.length
    let nbrSupplements = this.state.choixSupllements.length
    let totalsup = parseInt(this.state.qty)*nbrSupplements * this.props.plat.priceSupplements 
    let totalIng = parseInt(this.state.qty)*nbrIngredients * this.props.plat.priceIngredients
    let total = parseInt(this.state.qty)* parseInt(this.props.plat.price[this.state.NbreTaille]) + totalIng +totalsup
    if (!nbrIngredients || !nbrSupplements) {
      alert("choississez aux moins un supplement et un ingredient")

    } else {
   
      this.props.addToCart(this.props.plat , this.state.qty ,this.state.choixSupllements ,this.state.choixIngredients,this.state.taille , total)
      this.props.history.push('/')
    }
  }


  render() {
    // console.log(this.props);
    const { plat } = this.props;
    
    return (
      <div className="product_detail_cart">
        <div className="back-to-result">
          <Link to="/">Returne Au Acceuil</Link>
        </div>
        {!plat ? (
          <div>Loading...</div>
        ) : (
          <div className="details">
            <div className="details-image  col-md-3">
              <img src={plat.image} alt="product"></img>
            </div>
            <div className="details-info  col-md-4">
              <ul>
                <li>
                  <h1>{plat.name}</h1>
                </li>
                <li>
                 <h2>
                 Taille: {plat.sizes[1]} par  ${plat.price[1]}
                   </h2> 
                  
                </li>

                <li>
                  Description:
                  {plat.description}
                </li>
              </ul>
            </div>
            <form onSubmit={this.addData} >
            <div className="form-group col-md-4">
      <label for="inputState" className="label_add_to_cart">Taille:{" "}</label>
            
                <select value={this.state.taille} className="form-control" onChange={this.setTaille}>
                  {plat.sizes.map((x) => (
                    <option value={x}>{x}</option>
                  ))}
                </select>
              </div>
              <div>
              <div className="form-group ">
             <label className="label_add_to_cart">Choisissez votre Quantity: </label> 
          
             
                <input type="number" min="1"  value={this.state.qty} onChange={this.handleChange} />
              </div>
              <div>
                <label className="label_add_to_cart">Price: {" "}  $ {plat.price[this.state.NbreTaille]}</label>
              </div>
              <div className="form-check">
                <CheckboxGroup
                  isRequired
                  value={this.state.choixIngredients}
                  onChange={(choixIngredients) => {
                    console.log(choixIngredients, "onChange");
                    this.setState({ choixIngredients });
                  }}
                  
                  
                >
                   <label className="form-check-label label_add_to_cart"> choisir Ingredients</label>
                  {plat.ingredients.map((x) => (
                    <Checkbox value={x}>
                      {" "}
                      {x} {plat.priceIngredients}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </div>
              <div className="form-check">
              <CheckboxGroup
                  isRequired
                  value={this.state.choixSupllements}
                  onChange={(choixSupllements) => {
                    console.log(choixSupllements, "onChange");
                    this.setState({ choixSupllements });
                  }}
                 
                  
                >
                   <label className="form-check-label label_add_to_cart"> choisir Supplements</label>
                  {plat.supplements.map((x) => (
                    <Checkbox value={x}>
                       {" "}
                      {x}  {" "} ${plat.priceSupplements} 
                    </Checkbox>
                  ))}
                </CheckboxGroup>
                </div>
                
              
               
              
              </div>
              
            <div className="details-action">
            <button type="submit" className="btn btn-primary">Ajouter aux Panier</button>

            </div>
            </form>

          </div>
        )}
      </div>
    );
  }
}

export default connect((state) => ({ plat: state.plat.detailproduct }), {
  detailsPlat, addToCart
})(Plat);
