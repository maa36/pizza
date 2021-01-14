import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../actions/orderActions";
import formatCurrency from "../util";

class Admin extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }
  render() {
    const { orders } = this.props;
    console.log(orders);
    return !orders ? (
      <div>Orders</div>
    ) : (
       
      <div className="orders">
        <h2>Commandes</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTALE</th>
              <th>NOM</th>
              <th>EMAIL</th>
              <th>ADRESSE</th>
              <th>PLATS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr>
                <td>{order._id}</td>
                <td>{order.createdAt}</td>
                <td> {formatCurrency(order.total)}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.adresse}</td>
                <td>
                  {order.cartItems.map((item) => (
                    <div>
                      {item.count} {" x "} {item.name}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    orders: state.order.orders,
  }),
  {
    fetchOrders,
  }
)(Admin);
