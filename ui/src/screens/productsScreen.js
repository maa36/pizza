import React, { Component } from "react";
import axios from "axios";
import { fetchPlats } from "../actions/platActions";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";

class AdminProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      id: "",
      uploading: false,
      image: "",
      supplements: [],
      supplement: "",
      ingredient: "",
      ingredients: [],
      description: "",
      price_grand: "",
      price_petit: "",
      price_moyen: "",
      price_supplement : "",
      price_ingredient : ""
    };
  }
  componentDidMount() {
    const { userInfo } = this.props 
    if(userInfo) 
    {
      if (!userInfo.isAdmin) {
        this.props.history.push("/");
      } else {
        this.props.fetchPlats();
        
      }
    } 
    else {
      this.props.history.push("/");

    }  

  }
  deletesupplement (value) {
   let result = this.state.supplements.filter((el,i) => i !== value.index)
   this.setState({
     supplements : result
  });
  }
  deleteingredient (value) {
    let result = this.state.ingredients.filter((el,i) => i !== value.index)
    this.setState({
      ingredients : result
   });
   }
  handleSupplement = () => {
    this.setState((state) => ({
      supplements: [...state.supplements, this.state.supplement],
      supplement: "",
    }));
  };
  handleIngredient = () => {
    this.setState((state) => ({
      ingredients: [...state.ingredients, this.state.ingredient],
      ingredient: "",
    }));
  };
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  setModalVisible = () => {
    this.setState({
      modalVisible: false,
    });
  };
  openModal = (product) => {
    if (!product._id) {
      this.setState({modalVisible : true})
    } else {
    this.setState({
      modalVisible: true,
      id: product._id,
      ingredients : product.ingredients,
      supplements : product.supplements,
      image : product.image,
      price_ingredient : product.priceIngredients ,
      price_supplement: product.priceSupplements ,
      description : product.description ,
      price_grand: product.price[2],
      price_petit: product.price[0],
      price_moyen: product.price[1],
      name : product.name
    });
  }
};
  deleteHandler = (product) => {
    const { userInfo } = this.props 
    console.log(userInfo.isAdmin);    
    console.log(product._id);    
      axios
      .delete("http://localhost:5000/api/product/"+product._id,  {
        headers: {
          Authorization: userInfo.isAdmin,
        },
      })
      .then(function (response) {
        console.log(response);
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
       
  };
  uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);

    this.setState({ uploading: true });

    axios
      .post("http://localhost:5000/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        this.setState({ uploading: false, 
           image: "/images/"+response.data.filename
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ uploading: false });
      });
  };
  submitHandler =(e)=> {
    e.preventDefault();
try {
 
    const { userInfo } = this.props  
 

    if (this.state.id) {
     
      axios
      .post("http://localhost:5000/api/update/"+this.state.id, {
        image: this.state.image,
        sizes: ["petite","moyenne","grande"],
        name: this.state.name,
        description: this.state.description,
        priceSupplements: this.state.price_supplement,
        priceIngredients: this.state.price_ingredient,
        supplements: this.state.supplements,
        ingredients: this.state.ingredients,
        price : [this.state.price_petit,this.state.price_moyen,this.state.price_grand]
      }, {
        headers: {
          Authorization: userInfo.isAdmin,
        },
      })
      .then(function (response) {
        console.log(response);
        window.location.reload(false);

      })
      .catch(function (error) {
        console.log(error);
      });
       } else {
      


    axios
      .post("http://localhost:5000/api/add", {
        image: this.state.image,
        sizes: ["petite","moyenne","grande"],
        name: this.state.name,
        description: this.state.description,
        priceSupplements: this.state.price_supplement,
        priceIngredients: this.state.price_ingredient,
        supplements: this.state.supplements,
        ingredients: this.state.ingredients,
        price : [this.state.price_petit,this.state.price_moyen,this.state.price_grand]
      })
      .then(function (response) {
        console.log(response);
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}catch (error) {
  console.log(error);
}
}

  render() {
    const { products } = this.props;
 

    return (
      <div className="content content-margined">
        <div className="product-header">
          <h3>Produits</h3>
          <button className="button primary" onClick={this.openModal}>
            Créer Produit
          </button>
        </div>

        <Modal show={this.state.modalVisible} animation={false}>
          <div className="form">
            <form onSubmit={this.submitHandler}>
              <ul className="form-container">
                <li>
                  <h2>Créer un Produit</h2>
                </li>

                <li>
                  <label htmlFor="name">Nom Plat</label>
                  <input
                    type="text"
                    onChange={this.handleInput}
                    name="name"
                    value={this.state.name}
                    id="name"
                    required
                  ></input>
                </li>
                <li>
                  <label htmlFor="price_petit">Prix Plat Petit</label>
                  <input
                    onChange={this.handleInput}
                    type="text"
                    name="price_petit"
                    value={this.state.price_petit}
                    id="price"
                    required
                  ></input>
                </li>
                <li>
                  <label htmlFor="price_moyen">Prix Plat Moyen</label>
                  <input
                    onChange={this.handleInput}
                    type="text"
                    name="price_moyen"
                    value={this.state.price_moyen}
                    id="price"
                    required
                  ></input>
                </li>
                <li>
                  <label htmlFor="price_grand">Prix Plat Grand</label>
                  <input
                    onChange={this.handleInput}
                    type="text"
                    name="price_grand"
                    value={this.state.price_grand}
                    id="price"
                    required
                  ></input>
                </li>
                <li>
                  <label htmlFor="image">Image</label>
                  <input
                    type="text"
                    name="image"
                    value={this.state.image}
                    id="image"
                  ></input>
                  <input type="file" onChange={this.uploadFileHandler}></input>
                  {/* {uploading && <div>Uploading...</div>} */}
                </li>
                <li>
                  <label htmlFor="supplement">Ajouter Supplement</label>

                  <div class="input-group ">
                    <input
                      type="text"
                      onChange={this.handleInput}
                      name="supplement"
                      value={this.state.supplement}
                      id="supplement"
                      placeholder="Recipient's username"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <div class="input-group-append">
                      <button
                        class="btn btn-outline-secondary"
                        onClick={this.handleSupplement}
                        type="button"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </li>
                <li>
                  <div>
                {this.state.supplements.length > 0 && (this.state.supplements.map((sup,index) => (
                  <label className="Item-strong" onClick={()=> (this.deletesupplement({index}))} ><strong >{sup}</strong> {" "} <span  className="glyphicon glyphicon-remove-circle">x</span></label>
                )))}</div>
                </li>
                <li>
                  <label htmlFor="price_supplement">Prix Supplement</label>
                  <input
                    onChange={this.handleInput}
                    type="text"
                    name="price_supplement"
                    value={this.state.price_supplement}
                    id="price_supplement"
                    required
                  ></input>
                </li>
                <li>
                  <label htmlFor="ingredient">Ajouter ingredient</label>

                  <div class="input-group ">
                    <input
                      type="text"
                      onChange={this.handleInput}
                      name="ingredient"
                      value={this.state.ingredient}
                      id="ingredient"
                      placeholder="Recipient's username"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <div class="input-group-append">
                      <button
                        class="btn btn-outline-secondary"
                        onClick={this.handleIngredient}
                        type="button"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </li>
                <li>
                  <div>
                {this.state.ingredients.length > 0 && (this.state.ingredients.map((sup,index) => (
                  <label className="Item-strong" onClick={()=> (this.deleteingredient({index}))} ><strong >{sup}</strong> {" "} <span  className="glyphicon glyphicon-remove-circle">x</span></label>
                )))}</div>
                </li>
                <li>
                  <label htmlFor="price_ingredient">Prix Ingredient</label>
                  <input
                    onChange={this.handleInput}
                    type="text"
                    name="price_ingredient"
                    value={this.state.price_ingredient}
                    id="price_ingredient"
                    required
                  ></input>
                </li>
                <li>
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    value={this.state.description}
                    id="description"
                    onChange={this.handleInput}
                  ></textarea>
                </li>
                <li>
                  <button type="submit" className="button primary">
                    {this.state.id ? "Mettre à jour" : "Créer"}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={this.setModalVisible}
                    className="button secondary"
                  >
                    retour
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </Modal>

        <div className="product-list">
          {!products ? (
            <div>loading</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Prix</th>
                  <th>taille</th>
                  <th>description</th>
                  <th>description</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price[1]}</td>
                    <td>{product.sizes[1]}</td>
                    <td>{product.description}</td>
                    <td>
                      <button
                        className="button"
                        onClick={() => this.openModal(product)}
                      >
                        Edit
                      </button>{" "}
                      <button
                        className="button"
                        onClick={() => this.deleteHandler(product)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}
export default connect((state) => ({ products: state.plats.state , userInfo : state.user.userInfo }), {
  fetchPlats,
})(AdminProducts);
