import { Route } from 'react-router-dom'
import React, { Component } from "react"
import HomeList from "./home/./HomeList"
import ProductList from "./products/ProductList"
import ProductForm from "./products/ProductForm"
import InventoryList from "./inventory/InventoryList"
import ShippingList from "./shipping/ShippingList"
import ProductManager from "../modules/ProductManager"
import ProductEditForm from './products/ProductEditForm';


export default class ApplicationViews extends Component {
    state = {
        "users": [],
        "products": [],
        "inventory": [],
        "Shipping": []
    }

    componentDidMount() {
        ProductManager.getAllProduct().then(product => {
            this.setState({
                products: product
            })
        })
    }
    deleteProduct = (id) => {
        return ProductManager.deleteProduct(id)
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
                <Route path="/products" render={(props) => {
                    return <ProductList {...props} deleteProduct={this.deleteProduct} products={this.state.products} />
                }} />
                <Route path="/products/new" render={(props) => {
                    return <ProductForm {...props}
                        postProduct={this.postProduct}
                        products={this.state.product} />
                }} />
                <Route
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