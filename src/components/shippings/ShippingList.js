import React, { Component } from 'react'
import "./shipping.css";


export default class ShippingList  extends Component {
    state = {
        name: "",
        img: "",
        description: "",
        address: "",
        productTypeId: "",
        quantity: "",
        id: "",
    }
    updateExistingComponent = (evt) => {
      evt.preventDefault();
      console.log(evt.target.id)

      const existingComponent = {
        id: evt.target.id,
        phaseTypeId: 0
      }

      this.props.addToInventory(existingComponent)
        .then(() => this.props.history.push(`/`));
    }

    render() {
        console.log(this.props)
        return (
            <article className="shipping">
            {this.props.shipping.map(shipp => (
            <div key={shipp.id} className="card">
              <div className="card-body">
                <section className="card-title">
                  <h5> {shipp.name}</h5>
                  <img src={shipp.img} alt="laptop"/>
                  <h6>{shipp.description}</h6>
                  <h6>{shipp.address}</h6>
                  <h6>{shipp.productType.name}</h6>
                  <p>{shipp.quantity}</p>
                  </section>
                  </div>
                  </div>
                 ) )}
            </article>
        );
    }
}