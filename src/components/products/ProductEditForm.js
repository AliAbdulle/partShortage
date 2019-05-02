import React, { Component } from "react";
import ProductManager from "../../modules/ProductManager";
import "./product.css";


export default class ProductEditForm extends Component {
  //Set initial State
  state = {
    name: "",
    description: "",
    productTypeId: "",
    quantity: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  };

  updateExistingProduct = evt => {
    evt.preventDefault()

    if (this.state.product === "") {
      window.alert("Please enter edit Product");
    } else {
      const editProduct = {
        id: this.props.match.params.productId,
        name: this.state.name,
        description: this.state.description,
        productTypeId: this.state.productTypeId,
        quantity: this.state.quantity
      };
      this.props.editProduct(editProduct)
        .then(() => this.props.history.push("/product"));
    }
  };
  componentDidMount() {
    ProductManager.getProduct(this.props.match.params.productId)
      .then(product => {
        this.setState({
          name: product.name,
          description: product.description,
          productTypeId: product.productTypeId,
          quantity: product.quantity
        });
      });
  }
  render() {
    return (
      <React.Fragment>
        <form className="productForm">
          <div className="form-group">
            <label htmlFor="name">Edit Name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="name"
              value ={this.state.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="description"
              value ={this.state.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Product Type</label>
            <select
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="productTypeId"
              placeholder="">
              <option value="select">Select</option>
              <option value="inventory">Inventory</option>
              <option value="shipping">Shipping</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="qty">Quanitity</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="quantity"
              value={this.state.quantity}
            />
          </div>

          <button
            type="submit"
            onClick={this.updateExistingProd}
            className="btn btn-primary"
          >
            Update
          </button>
        </form>
      </React.Fragment>
    );
  }
}
