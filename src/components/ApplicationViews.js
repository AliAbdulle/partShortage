import { Route } from "react-router-dom";
import React, { Component } from "react";
import ProductList from "./products/ProductList";
import ProductForm from "./products/ProductForm";
import ProductEditForm from "./products/ProductEditForm";
import InventoryList from "./inventory/InventoryList";
import InventoryEditForm from "./inventory/InventoryEditForm"
import ShippingList from "./shippings/ShippingList";
import ProductManager from "../modules/ProductManager";
 import ProductTypeManager from "../modules/ProductTypeManager";
import Login from "./login/Login"
import Register from "./login/Register";
import LoginManager from "../modules/LoginManager"


// import "bootstrap/dist/css/bootstrap.min.css"

export default class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("userId") !== null
  state = {
    "users": [],
    "products": [],
    "inventory": [],
    "shipping": [],
    "login": "",
    "productTypes":[]

  };

  componentDidMount() {

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
   .then(() => LoginManager.getAllUser())
   .then(users => (updataState.users = users))
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
  postUser = (newUser) => {
    return LoginManager.postUser(newUser)
  }

  render() {
    return (
      <React.Fragment>
        <Route
        exact
        path="/"
        render={props => {
          return <Login login={this.state.login}
          {...props} postUser={this.postUser}/>;
        }}
      />
      <Route
        exact
        path="/register"
        render={props => {
          return <Register users={this.state.users}
          {...props} postUser={this.postUser}/>;
        }}
      />
        <Route
          exact
          path="/products"
          render={props => {
          if(this.isAuthenticated() && parseInt(sessionStorage.getItem("userId")) === 1){
            return <ProductList
                {...props}
                deleteProduct={this.deleteProduct}
                products={this.state.products}
                productTypes={this.state.productTypes}
                phaseTypes={this.state.phaseTypes}
                inventory={this.state.inventory}
                addToInventory={this.addToInventory}
              />
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
            if(this.isAuthenticated() && parseInt(sessionStorage.getItem("userId")) === 2){
            return <InventoryList
                deleteInventory={this.deleteProduct}
                inventory={this.state.inventory}
                addToInventory= {this.addToInventory}
                {...props}
              />
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
            return <ShippingList 
            shipping={this.state.shipping} />;
          }}
        />
      </React.Fragment>
    );
  }
}