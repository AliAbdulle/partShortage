import React, { Component } from "react";
import ProductManager from "../../modules/ProductManager";

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
      window.alert("Please enter select Product");
    } else {
      const editProduct = {
        id: Number (this.props.match.params.productId),
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
            <label htmlFor="productType">Product Type</label>
            <select
              defaultValue=""
              name="productType"
              className="form-control"
              id="productTypeId"
              onChange={this.handleFieldChange}
              value={this.state.productTypeId}>
              <option value="">Select</option>
              {this.props.productTypes.map(product => {
              console.log(product)
              return <option key={product.id} id={product.id} value={product.name}>
              {product.name}
              </option>

            })}
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
            onClick={this.updateExistingProduct}
            className="btn btn-primary"
          >
            Update
          </button>
        </form>
      </React.Fragment>
    );
  }
}
