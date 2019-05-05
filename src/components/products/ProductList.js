
import React, { Component } from "react";
import "./product.css";
// import ProductManager from "../../modules/ProductManager";

export default class ProductList extends Component {


  state = {
    name: "",
    description: "",
    productTypeId: "",
    quantity: "",
    id: "",
    // grabInfo:false
  }
  constructorNewInventory = (evt) => {
    evt.preventDefault();
    console.log(evt.target.id)
    let newInventoryItem = this.props.products.find(product => product.id === Number(evt.target.id))

    if (newInventoryItem !== undefined) {
      const newInvId = newInventoryItem.id + 1;
      const newInventory = {
        name: newInventoryItem.name,
        description: newInventoryItem.description,
        productTypeId: Number(newInvId),
        quantity: Number(newInventoryItem.quantity),
        id: Number(evt.target.id)
      }
      console.log(newInventory)
      this.props.addToInventory(newInventory)
        .then(() => this.props.deleteProduct(newInventory.id))
        .then(() => this.props.history.push(`/inventory`));
    }
  }
  // grabInfo = () => {
  //   this.setState({grabInfo:true})
  // }

  render() {
    return (
      <React.Fragment>
        <div className="productButton">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push("/products/new");
            }}
          >
            Please Add New Product!
          </button>
        </div>

        <article className="products">
          {this.props.products.map(product => (
            <div key={product.id} className="card">
              <div className="card-body">
                <section className="card-title">
                  <h5> {product.name}</h5>
                  <h6>{product.description}</h6>
                  <h6>{product.productType.name}</h6>
                  <p>{product.quantity}</p>
                  <button
                    onClick={() => this.props.deleteProduct(product.id)}
                    className="card-delete"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      this.props.history.push(`/products/${product.id}/edit`)
                    }}
                    className="card-edit"
                  >
                    Update
                  </button>
                  <button
                    id={product.id}
                    onClick={this.constructorNewInventory}
                    className="card-edit"
                  >
                    {/* {this.state.grabInfo && this.constructorNewInventor} */}
                    Forward
                  </button>
                </section>
              </div>
            </div>
          ))}
        </article>
      </React.Fragment>
    );
  }
}