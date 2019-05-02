
import React, { Component } from "react";
import "./product.css";

export default class ProductList extends Component {
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
                  <h6>{product.productTypeId}</h6>
                  <p>{product.quantity}</p>
                  <button
                    onClick={() => this.props.deleteProduct(product.id)}
                    className="card-delete"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      this.props.history.push(`/products/${product.id}/edit`)}
                    className="card-edit"
                  >
                    Update
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