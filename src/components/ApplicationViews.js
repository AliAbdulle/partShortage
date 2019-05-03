import { Route } from 'react-router-dom'
import React, { Component } from "react"
import HomeList from "./home/./HomeList"
import ProductList from "./products/ProductList"
import ProductForm from "./products/ProductForm"
import ProductEditForm from './products/ProductEditForm';
import InventoryList from "./inventory/InventoryList"
import ShippingList from "./shipping/ShippingList"
import ProductManager from "../modules/ProductManager"
import ProductTypesManager from '../modules/ProductTypesManager';
import InventoryManager from '../modules/InventoryManager'
import ShippingManager from '../modules/ShippingManager'


export default class ApplicationViews extends Component {
    state = {
        users: [],
        products: [],
        productTypes:[],
        inventory: [],
        shipping: []
    }

    componentDidMount() {
        const newState = {}
        ProductManager.getAllProduct()
        .then(products => newState.products = products)
        .then(() => ProductTypesManager.getAllProductTypes())
        .then(productTypes => newState.productTypes = productTypes)
        .then(() => InventoryManager.getAllInventory())
        .then(inventory => newState.inventory = inventory)
        .then(() => ShippingManager.getAllShipping())
        .then(shipping => newState.shipping = shipping)
        .then(() => this.setState(newState))

    }
    deleteProduct = (id) => {
        console.log(id)
        return ProductManager.deleteProduct(id)
            .then(() => ProductManager.getAllProduct())
            .then(products =>
                this.setState({ products: products })
            )
    }
    postProduct = (newProducts) => {
        return ProductManager.postProduct(newProducts)
            .then(() => ProductManager.getAllProduct())
            .then(products =>
                this.setState({
                    products: products
                })
            );
    }
    editProduct = (editedProducts) => {
        return ProductManager.putProduct(editedProducts)
            .then(() => ProductManager.getAllProduct())
            .then(products => {
                this.setState({
                    products: products
                })
            })
    }
    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <HomeList home={this.state.home} />
                }} />
                <Route
                exact
                path="/products" render={(props) => {
                    return <ProductList {...props} deleteProduct={this.deleteProduct} products={this.state.products}/>
                }} />
                <Route
                exact
                path="/products/new" render={(props) => {
                    return <ProductForm {...props}
                        postProduct={this.postProduct}
                        productTypes={this.state.productTypes} />
                }} />
                <Route
                exact
                    path="/products/:productId(\d+)/edit" render={props => {
                        return <ProductEditForm {...props} editProduct={this.editProduct} products={this.state.products} />
                    }}
                />
                <Route path="/inventory" render={(props) => {
                    return <InventoryList invetory={this.state.invetory} />
                }} />
                <Route path="/shipping" render={(props) => {
                    return <ShippingList shipping={this.state.shipping} />
                }} />
            </React.Fragment>
        )
    }
}