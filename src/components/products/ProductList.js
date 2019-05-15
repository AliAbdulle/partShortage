import React, { Component } from "react";
import "./product.css";


export default class ProductList extends Component {


  state = {
    //initials states
    name: "",
    img: "",
    description: "",
    address: "",
    productTypeId: "",
    quantity: "",
    id: ""
  }
  updateExistingComponent = (evt) => {
    //when th button clicked, the inventory page will be appear new card
    evt.preventDefault();
    console.log(evt.target.id)
    let productId = evt.target.id
    const existingComponent = {
      id: parseInt(productId),
      phaseTypeId: 2
    }
    //adding new card to inventory page
    this.props.addToInventory(existingComponent)
      console.log(this.props)
  }

  render() {

    return (
      <React.Fragment>
        {/* create form input the user can input new product and post to product list */}
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
            <div id="wrapper">
        <article className="products">
          {this.props.products.map(product => (
            <div key={product.id} className="card">
              <div className="card-body">
                <section className="card-title">
                  <h5> {product.name}</h5>
                  <img src={product.img} alt="laptop"/>
                  <h6>{product.description}</h6>
                  <h6>{product.address}</h6>
                  <h6>{product.productType.name}</h6>
                  <p>{product.quantity}</p>
                  <button
                  //deleting form product page
                    onClick={() => this.props.deleteProduct(product.id)}
                    className="card-delete"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      //edite exisiting form
                      this.props.history.push(`/products/${product.id}/edit`)
                    }}
                    className="card-edit"
                  >
                    Update
                  </button>
                  <button
                    id={product.id}
                    //forward to inventory page
                    onClick={this.updateExistingComponent}
                    className="card-forword"
                  >
                    Forward
                  </button>
                </section>
              </div>
            </div>


          ))}
        </article>
        </div>
      </React.Fragment>
    );
  }
}