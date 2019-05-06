import React, { Component } from 'react'
import "./inventory.css";


export default class InventoryList  extends Component {
    render() {
        return (
            <article className="inventory">
                {this.props.inventory.map(inv => (
            <div key={inv.id} className="card">
              <div className="card-body">
                <section className="card-title">
                  <h5> {inv.name}</h5>
                  <h5>{inv.image}</h5>
                  <h6>{inv.description}</h6>
                  <h6>{inv.address}</h6>
                  <h6>{inv.productType.name}</h6>
                  <p>{inv.quantity}</p>
                  <button
                    onClick={() => this.props.deleteInventory(inv.id)}
                    className="card-delete"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      this.props.history.push(`/inventory/${inv.id}/edit`)
                    }}
                    className="card-edit"
                  >
                    Update
                  </button>
                  <button
                    id={inv.id}
                    onClick={this.constructorNewInventory}
                    className="card-edit"
                  >
                    {/* {this.state.grabInfo && this.constructorNewInventor} */}
                    Forward
                  </button>
                  </section>
                  </div>
                  </div>
                 ) )}
            </article>
        );
    }
}