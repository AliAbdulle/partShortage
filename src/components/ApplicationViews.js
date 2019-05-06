import { Route } from "react-router-dom";
import React, { Component } from "react";
import HomeList from "./home/./HomeList";
import ProductList from "./products/ProductList";
import ProductForm from "./products/ProductForm";
import ProductEditForm from "./products/ProductEditForm";
import InventoryList from "./inventory/InventoryList";
import InventoryEditForm from "./inventory/InventoryEditForm"
import ShippingList from "./shippings/ShippingList";
import ProductManager from "../modules/ProductManager";
import ProductTypesManager from "../modules/ProductTypesManager";
import InventoryManager from "../modules/InventoryManager";
import ShippingManager from "../modules/ShippingManager";
import PhaseTypeManager from "../modules/PhaseTypeManager"

// import "bootstrap/dist/css/bootstrap.min.css"

export default class ApplicationViews extends Component {
  state = {
    users: [],
    products: [],
    productTypes: [],
    phaseTypes:[],
    inventory: [],
    shipping: []
  };

  componentDidMount() {
    const newState = {}
    ProductManager.getAllProduct()
      .then(products => (newState.products = products))
      .then(() => ProductTypesManager.getAllProductTypes())
      .then(productTypes => (newState.productTypes = productTypes))
      .then(() => PhaseTypeManager.getAllPhaseTypes())
      .then(phaseTypes => (newState.phaseTypes = phaseTypes))
      .then(() => InventoryManager.getAllInventory())
      .then(inventory => (newState.inventory = inventory))
      .then(() => ShippingManager.getAllShipping())
      .then(shippings => (newState.shippings = shippings))
      .then(() => this.setState(newState));
  }
  deleteProduct = id => {
    console.log(id);
    return ProductManager.deleteProduct(id)
      .then(() => ProductManager.getAllProduct())
      .then(products => this.setState({ products: products }));
  };
  postProduct = newProducts => {
    return ProductManager.postProduct(newProducts)
      .then(() => ProductManager.getAllProduct())
      .then(products =>
        this.setState({
          products: products
        })
      );
  };
  editProduct = editedProducts => {
    return ProductManager.putProduct(editedProducts)
      .then(() => ProductManager.getAllProduct())
      .then(products => {
        this.setState({
          products: products
        });
      });
  };
  addToInventory = newInventory => {
    return InventoryManager.postInventory(newInventory)
      .then(() => InventoryManager.getAllInventory())
      .then(inventory => {
        this.setState({
          inventory: inventory
        });
      });
  };
  deleteInventory = id => {
    console.log(id);
    return InventoryManager.deleteInventory(id)
      .then(() => InventoryManager.getAllInventory())
      .then(inventory => this.setState({ inventory: inventory }));
  };
  editInventory = editedInventory => {
    return ProductManager.putInventory(editedInventory)
      .then(() => ProductManager.getAllInventory())
      .then(inventory => {
        this.setState({
          inventory: inventory
        });
      });
  };
  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return <HomeList home={this.state.home} />;
          }}
        />
        <Route
          exact
          path="/products"
          render={props => {
            return (
              <ProductList
                {...props}
                deleteProduct={this.deleteProduct}
                products={this.state.products}
                productTypes={this.state.productTypes}
                phaseTypes={this.state.phaseTypes}
                inventory={this.state.inventory}
                addToInventory={this.addToInventory}
              />
            );
          }}
        />
        <Route
          exact
          path="/products/new"
          render={props => {
            return (
              <ProductForm
                {...props}
                postProduct={this.postProduct}
                productTypes={this.state.productTypes}
                phaseTypes={this.state.phaseTypes}
                products={this.state.products}
              />
            );
          }}
        />
        <Route
          exact
          path="/products/:productId(\d+)/edit"
          render={props => {
            return (
              <ProductEditForm
                {...props}
                editProduct={this.editProduct}
                productTypes={this.state.productTypes}
                phaseTypes={this.state.phaseTypes}
                products={this.state.products}
              />
            );
          }}
        />
        <Route
          exact
          path="/inventory"
          render={props => {
            return (
              <InventoryList
                deleteInventory={this.deleteInventory}
                inventory={this.state.inventory}
              />
            );
          }}
        />
        <Route
          exact
          path="inventory/:invId(\d+)/edit"
          render={props => {
            return (
              <InventoryEditForm
                editInventory={this.editInventory}
                productTypes={this.state.productTypes}
                inventory={this.state.inventory}
              />
            );
          }}
        />
        <Route
          path="/shipping"
          render={props => {
            return <ShippingList shipping={this.state.shipping} />;
          }}
        />
      </React.Fragment>
    );
  }
}
