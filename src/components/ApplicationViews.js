import { Route } from "react-router-dom";
import React, { Component } from "react";
import LoginList from "./login/Login";
import ProductList from "./products/ProductList";
import ProductForm from "./products/ProductForm";
import ProductEditForm from "./products/ProductEditForm";
import InventoryList from "./inventory/InventoryList";
import InventoryEditForm from "./inventory/InventoryEditForm"
import ShippingList from "./shippings/ShippingList";
import ProductManager from "../modules/ProductManager";
 import ProductTypeManager from "../modules/ProductTypeManager";
// import PhaseTypeManager from "../modules/PhaseTypeManager"

// import "bootstrap/dist/css/bootstrap.min.css"

export default class ApplicationViews extends Component {
  state = {
    "users": [],
    "products": [],
    "inventory": [],
    "shipping": [],
    "login": "",
    "productTypes":[]

  };

  componentDidMount() {
    // const newState = {}
    // ProductManager.getAllProduct()
    //   .then(products => (newState.products = products))
      // .then(() => ProductTypeManager.getAllProductTypes())
      // .then(productTypes => (newState.productTypes = productTypes))
    //   .then(() => this.setState(newState));
    this.loadAllData()
  }

loadAllData = () => {
  const updataState = {}

  return ProductManager.getAllProduct()
   .then(products => products.filter(products => products.phaseTypeId === 1 ))
   .then(products => updataState.products = products)
   .then(() => ProductManager.getAllProduct())
   .then(products => products.filter(products => products.phaseTypeId === 2 ))
   .then(inventory => updataState.inventory = inventory)
   .then(() => ProductManager.getAllProduct())
   .then(products => products.filter(products => products.phaseTypeId === 3 ))
   .then(shipping => updataState.shipping = shipping)
   .then(() => ProductTypeManager.getAllProductTypes())
   .then(productTypes => (updataState.productTypes = productTypes))
   .then(() => this.setState(updataState))
}

  deleteProduct = id => {
    console.log(id);
    return ProductManager.deleteProduct(id)
      .then(() => this.loadAllData())
  };
  postProduct = newProducts => {
    return ProductManager.postProduct(newProducts)
      .then(() => this.loadAllData())
  };
  editProduct = editedProducts => {
    return ProductManager.putProduct(editedProducts)
      .then(() => this.loadAllData())
  };
  addToInventory = (changePatch) => {
    return ProductManager.changeComponent(changePatch)
    .then(() => this.loadAllData())

  }

  render() {
    return (
      <React.Fragment>
        {/* <Route
          exact
          path="/"
          render={props => {
            return <LoginList login={this.state.login} />;
          }}
        /> */}
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
                deleteInventory={this.deleteProduct}
                inventory={this.state.inventory}
                addToInventory= {this.addToInventory}
                {...props}
              />
            );
          }}
        />
        <Route
          exact
          path="/inventory/:productId(\d+)/edit"
          render={props => {
            return (
              <InventoryEditForm
                deleteInventory={this.deleteInventory}
                editProduct={this.editProduct}
                productTypes={this.state.productTypes}
                inventory={this.state.inventory}
                {...props}
              />
            );
          }}
        />
        <Route
          path="/shipping"
          render={props => {
            return <ShippingList 
            deleteShipping={this.deleteShipping}
            shipping={this.state.shipping} />;
          }}
        />
          <Route
          exact
          path="/"
          render={props => {
            return <LoginList login={this.state.login} />;
          }}
        />
      </React.Fragment>
    );
  }
}