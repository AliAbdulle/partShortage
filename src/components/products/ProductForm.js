import React, { Component } from 'react'
import "./product.css"

export default class ProductForm extends Component {
    // Set initial State
    state = {
        name: "",
        image:"",
        description: "",
        address: "",
        productTypeId: "",
        phaseTypeId:1,
        quantity: ""
    }

    // Update state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
    console.log(stateToChange)
  };
  constructNewProduct = evt => {
    evt.preventDefault();
      const newProducts = {
        name: this.state.name,
        description: this.state.description,
        address: this.state.address,
        productTypeId: Number(this.state.productTypeId),
        phaseTypeId: Number(this.state.phaseTypeId),
        quantity: Number(this.state.quantity)
        // Make sure the product Id is saved to the database
      }

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
              id="name"
              placeholder=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">product Image</label>
            <input
              type="file"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="image"
              placeholder=""
            />
            <img src="IMG_5951.jpg"/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="description"
              placeholder=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="address"
              placeholder=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="productType">Product Type</label>
            <select
              defaultValue=""
              name="productType"
              required
              className="form-control"
              id="productTypeId"
              onChange={this.handleFieldChange}>
              <option value="">Select</option>
              {this.props.productTypes.map(product => {
              // console.log(product)
              return <option key={product.id} id={product.id} value={product.id}>
              {product.name}
              </option>

            })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Qty">Qty</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="quantity"
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