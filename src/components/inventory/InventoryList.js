import React, { Component } from 'react'
import {Button, Card} from 'reactstrap'
import "./inventory.css";


export default class InventoryList  extends Component {
    state = {
      //set a state
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
      //when this event trigger, will be update next page
     // debugger
      evt.preventDefault();
      console.log(evt.target.id)
      let itemId = evt.target.id
      const existingComponent = {
        id: parseInt(itemId),
        phaseTypeId: 3
      }
      // will add to next phaseId
      this.props.addToInventory(existingComponent)
    }

    render() {
        console.log(this.props)
        return (
          <div id="wrapper">
            <article className="inventory">
            {this.props.inventory.map(item => (
            <Card key={item.id} className="card">
              <div className="card-body">
                <section className="card-title">
                  <h5> {item.name}</h5>
                  <img src={item.img} alt="laptop"/>
                  <h6>{item.description}</h6>
                  <h6>{item.address}</h6>
                  <h6>{item.productTypeId.name}</h6>
                  <p>{item.quantity}</p>
                  <Button
                    // remove all the input and card that showing the inventory
                    onClick={() => this.props.deleteInventory(item.id)}
                    className="card-delete"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => {
                      //when the Button click  edit form will be open
                      this.props.history.push(`/inventory/${item.id}/edit`)
                    }}
                    className="card-edit"
                  >
                    Update
                  </Button>
                  <Button
                    id={item.id}
                    onClick={this.updateExistingComponent}
                    // will push the card to next page
                    className="card-forword"
                  >
                    Forward
                  </Button>
                  </section>
                  </div>
                  </Card>
                 ) )}
            </article>
            </div>
        );
    }
}