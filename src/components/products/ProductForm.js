import React, { Component } from 'react'
import "./product.css"

export default class ProductForm extends Component {
    // Set initial State
    state = {
        name: "",
        description: "",
        quantity: ""
    }

    // Update state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };
  constructNewProduct = evt => {
    evt.preventDefault();
      const newProducts = {
        name: this.state.Name,
        description: this.state.description,
        quantity: this.state.quantity
        // Make sure the product Id is saved to the database
      }

      // Create the products and redirect user to products list
      this.props.postProduct(newProducts)
        .then(() => this.props.history.push("/products"));

  }

  render() {
    return (
      <React.Fragment>
        <form className="productForm">
          <div className="form-group">
            <label htmlFor="name">product Name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="productName"
              placeholder=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="productDescription"
              placeholder=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="Qty">Qty</label>
            <select
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="select"
              placeholder="">
              <option value="select">Select</option>
              <option value="inventory">Inventory</option>
              <option value="shipping">Shipping</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Qty">Qty</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="productQty"
              placeholder=""
            />
          </div>
          <button
            type="submit"
            onClick={this.constructNewProduct}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
