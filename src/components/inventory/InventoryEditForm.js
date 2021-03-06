import React, { Component } from "react";
import ProductManager from "../../modules/ProductManager"

export default class InventoryEditForm extends Component {
  //Set initial State
  state = {
    name: "",
    img: "",
    description: "",
    address: "",
    productTypeId: "",
    phaseTypeId: "",
    quantity: ""
  };

  handleFieldChange = evt => {
    // this function will be change the state
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingInventory = evt => {
    //change the edit the field input that previous text
    evt.preventDefault();

    if (this.state.invId === "") {
      window.alert("Please enter select Product");
    } else {
      const editInventory = {
        id: Number(this.props.match.params.productId),
        name: this.state.name,
        img: this.state.img,
        description: this.state.description,
        address: this.state.address,
        productTypeId: Number(this.state.productTypeId),
        phaseTypeId: Number(this.state.phaseTypeId),
        quantity: Number(this.state.quantity)
      };
      this.props.editProduct(editInventory)
        .then(() => this.props.history.push("/inventory"));
    }
  };
  componentDidMount() {
    ProductManager.getProduct(this.props.match.params.productId).then(product => {
        this.setState({
          name: product.name,
          img: product.img,
          description: product.description,
          address: product.address,
          productTypeId: product.productTypeId,
          phaseTypeId: product.phaseTypeId,
          quantity: product.quantity
        });
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <form className="inventoryForm">
          <div className="form-group">
            <label htmlFor="name">Edit Name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="name"
              value={this.state.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="img">Image</label>
            <input
              type="text"
              className="form-control"
              onChange={this.handleFieldChange}
              id="img"
              value={this.state.img}
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
              value={this.state.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="address"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="address"
              value={this.state.address}
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
              value={this.state.productTypeId}
            >
              <option value="">Select</option>
              {this.props.productTypes.map(product => {
                console.log(product);
                return (
                  <option key={product.id} id={product.id} value={product.id}>
                    {product.name}
                  </option>
                );
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
            type="button"
            onClick={this.updateExistingInventory}
            className="btn btn-primary"
          >
            Update
          </button>
        </form>
      </React.Fragment>
    );
  }
}
