import { Route } from "react-router-dom";
import React, { Component } from "react";
import ProductList from "./products/ProductList";
import ProductForm from "./products/ProductForm";
import ProductEditForm from "./products/ProductEditForm";
import InventoryList from "./inventory/InventoryList";
import InventoryEditForm from "./inventory/InventoryEditForm";
import ShippingList from "./shippings/ShippingList";
import ProductManager from "../modules/ProductManager";
import ProductTypeManager from "../modules/ProductTypeManager";
import Login from "./login/Login";
import Register from "./login/Register";
import LoginManager from "../modules/LoginManager";

// import "bootstrap/dist/css/bootstrap.min.css"

export default class ApplicationViews extends Component {
  //check for authentication is in the local storage
  isAuthenticated = () => sessionStorage.getItem("userId") !== null;
  // set the state
  state = {
    users: [],
    products: [],
    inventory: [],
    shipping: [],
    productTypes: [],
    userTypes: []
  };

  componentDidMount() {
    this.loadAllData();
  }

  loadAllData = () => {
    // creating an object to store all products and users fetch calls
    const updataState = {};
    // get all data
    return ProductManager.getAllProduct()
      .then(products => products.filter(products => products.phaseTypeId === 1))
      .then(products => (updataState.products = products))
      .then(() => ProductManager.getAllProduct())
      .then(products => products.filter(products => products.phaseTypeId === 2))
      .then(inventory => (updataState.inventory = inventory))
      .then(() => ProductManager.getAllProduct())
      .then(products => products.filter(products => products.phaseTypeId === 3))
      .then(shipping => (updataState.shipping = shipping))
      .then(() => ProductTypeManager.getAllProductTypes())
      .then(productTypes => (updataState.productTypes = productTypes))
      .then(() => LoginManager.getAllUser())
      .then(users => (updataState.users = users))
      .then(() => LoginManager.getAllUserTypes())
      .then(userTypes => (updataState.userTypes = userTypes))
      .then(() => this.setState(updataState));
  };

  deleteProduct = id => {
    //this function will delete all product that you created
    console.log(id);
    return ProductManager.deleteProduct(id).then(() => this.loadAllData());
  };
  postProduct = newProducts => {
    // this function will create products
    return ProductManager.postProduct(newProducts).then(() =>
      this.loadAllData()
    );
  };
  editProduct = editedProducts => {
    //this function will update all products that created
    return ProductManager.putProduct(editedProducts).then(() =>
      this.loadAllData()
    );
  };
  addToInventory = changePatch => {
    //this function will add  products to inventory
    return ProductManager.changeComponent(changePatch).then(() =>
      this.loadAllData()
    );
  };
  postUser = newUser => {
    //this function  will add users
    return LoginManager.postUser(newUser);
  };

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return (
              <Login
                login={this.state.login}
                {...props}
                postUser={this.postUser}
              />
            );
          }}
        />
        <Route
          exact
          path="/register/new"
          render={props => {
            return (
              <Register
                userTypes={this.state.userTypes}
                users={this.state.users}
                {...props}
                postUser={this.postUser}
              />
            );
          }}
        />
        <Route
          exact
          path="/products"
          render={props => {
            if (
              this.isAuthenticated() &&
              parseInt(sessionStorage.getItem("userTypeId")) === 1
            ) {
              return (
                <ProductList
                  {...props}
                  deleteProduct={this.deleteProduct}
                  products={this.state.products}
                  productTypes={this.state.productTypes}
                  addToInventory={this.addToInventory}
                />
              );
            }
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
            if (
              this.isAuthenticated() &&
              parseInt(sessionStorage.getItem("userTypeId")) === 2
            ) {
              return (
                <InventoryList
                  deleteInventory={this.deleteProduct}
                  inventory={this.state.inventory}
                  addToInventory={this.addToInventory}
                  {...props}
                />
              );
            }
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
            if (
              this.isAuthenticated() &&
              parseInt(sessionStorage.getItem("userTypeId")) === 3
            ) {
            return <ShippingList shipping={this.state.shipping} />;
          }}
        }
        />
      </React.Fragment>
    );
  }
}
