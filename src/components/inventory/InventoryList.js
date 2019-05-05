import React, { Component } from 'react'
//import Inventory from './inventory';


export default class InventoryList  extends Component {
    render() {
        return (
            <article>
                {this.props.inventory.map(inv => (
            <div key={inv.id} className="card">
              <div className="card-body">
                <section className="card-title">
                  <h5> {inv.name}</h5>
                  <h6>{inv.description}</h6>
                  <h6>{inv.productType.name}</h6>
                  <p>{inv.quantity}</p>
                  </section>
                  </div>
                  </div>
                 ) )}
            </article>
        );
    }
}