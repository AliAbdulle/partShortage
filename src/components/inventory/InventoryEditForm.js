import React, { Component } from "react";
import InventoryManager from "../../modules/InventoryManager"

export default class InventoryEditForm extends Component {
  //Set initial State
  state = {
    name: "",
    description: "",
    productTypeId: "",
    address: "",
    quantity: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingProduct = evt => {
    evt.preventDefault();

    if (this.state.invId === "") {
      window.alert("Please enter select Product");
    } else {
      const editInventory = {
        id: Number(this.props.match.params.invId),
        name: this.state.name,
        description: this.state.description,
        productTypeId: Number(this.state.productTypeId),
        address: this.state.address,
        quantity: Number(this.state.quantity)
      };
      this.props.editProduct(editInventory)
        .then(() => this.props.history.push("/products"));
    }
  };
  componentDidMount() {
    InventoryManager.getInventory(this.props.match.params.invId).then(inv => {
        this.setState({
          name: inv.name,
          description: inv.description,
          productTypeId: inv.productTypeId,
          address: inv.address,
          quantity: inv.quantity
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
            <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="address"
              value={this.state.address}
            />
          </div>
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
