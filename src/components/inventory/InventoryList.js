import React, { Component } from 'react'
import "./inventory.css";


export default class InventoryList  extends Component {
    state = {
        name: "",
        image: "",
        description: "",
        address: "",
        productTypeId: "",
        phaseTypeId: "",
        quantity: "",
        id: "",
    }
    updateExistingComponent = (evt) => {
      evt.preventDefault();
      console.log(evt.target.id)
      let itemId = evt.target.id
      const existingComponent = {
        itemId: parseInt(itemId),
        phaseTypeId: 3
      }

      this.props.addToInventory(existingComponent)
        .then(() => this.props.history.push(`/shipping`));
    }

    render() {
        console.log(this.props)
        return (
            <article className="inventory">
            {this.props.inventory.map(item => (
            <div key={item.id} className="card">
              <div className="card-body">
                <section className="card-title">
                  <h5> {item.name}</h5>
                  <h5>{item.image}</h5>
                  <h6>{item.description}</h6>
                  <h6>{item.address}</h6>
                  <h6>{item.productType.name}</h6>
                  <p>{item.quantity}</p>
                  <button
                    onClick={() => this.props.deleteInventory(item.id)}
                    className="card-delete"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      this.props.history.push(`/inventory/${item.id}/edit`)
                    }}
                    className="card-edit"
                  >
                    Update
                  </button>
                  <button
                    id={item.id}
                    onClick={this.updateExistingComponent}
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