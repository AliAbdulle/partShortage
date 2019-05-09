import React, { Component } from "react";
import "./product.css";


export default class ProductList extends Component {


  state = {
    name: "",
    img: "",
    description: "",
    address: "",
    productTypeId: "",
    quantity: "",
    id: ""
  }
  updateExistingComponent = (evt) => {
    evt.preventDefault();
    console.log(evt.target.id)
    let productId = evt.target.id
    const existingComponent = {
      id: parseInt(productId),
      phaseTypeId: 2
    }

    this.props.addToInventory(existingComponent)
      .then(() => this.props.history.push(`/inventory`));
      console.log(this.props)
  }

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
                  <h6>{product.img}</h6>
                  <h6>{product.description}</h6>
                  <h6>{product.address}</h6>
                  <h6>{product.productType.name}</h6>
                  {/* <h6>{product.phaseType.name}</h6> */}
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
                    onClick={this.updateExistingComponent}
                    className="card-forword"
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