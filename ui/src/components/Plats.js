import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import { fetchPlats } from "../actions/platActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardImg } from "react-bootstrap";

class Plats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchPlats();
  }
  render() {
    return (
      <div>
        <Fade bottom cascade>
          {!this.props.plats.state ? (
            <div>Loading...</div>
          ) : (
            <ul className="products">
              {this.props.plats.state.map((plat) => (
                <li key={plat._id}>
                  <Card className="cardmenu" style={{ width: "35rem" }}>
                    <Link to={"/plat/" + plat._id}>
                      <CardImg 
                      className="imagemenu"
                        variant="top"
                        
                        src={plat.image}
                        alt="makla"
                      />
                    </Link>
                    <Card.Body>
                      <Card.Title className="title_card">
                        
                        <Link to={"/plat/" + plat._id}>{plat.name}</Link>
                      </Card.Title>
                      <Card.Subtitle className="prix_card">Prix : ${plat.price[1]} </Card.Subtitle>
                      <Card.Text className="description_card">{plat.description}</Card.Text>

                      <button type="button" class="btn btn-success">
                        <Link to={"/plat/" + plat._id}>Ajouter</Link>
                      </button>
                    </Card.Body>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </Fade>
      </div>
    );
  }
}

export default connect((state) => ({ plats: state.plats }), { fetchPlats })(
  Plats
);
