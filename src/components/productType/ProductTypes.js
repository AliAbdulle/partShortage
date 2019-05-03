import React, { Component } from 'react'

export default class ProductTypes extends Component {
  render() {
      return (
          <article className="content">
              <h1>Product List</h1>
              {
                this.props.ProductTypes.map(product =>
                    <div key={product.id}>
                        {product.name}
                    </div>
                )
              }
          </article>
      );
  }
}
