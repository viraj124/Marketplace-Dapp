import React, { Component } from 'react';
class Market extends Component {

    state = {
        productName: '',
        productPrice: ''
    }
    render() { 
        return (   <div id="content">
        <h1>Add Product</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.props.addProduct(name, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Product Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Product Price"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
                    <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Owner</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody id="productList">
                    {this.props.products.map((item, key) =>{
                      return(
                        <tr key = {key}>
                        <th scope="row">{item.id.toString()}</th>
                        <td>{item.name}</td>
                        <td>{window.web3.utils.toWei(item.price.toString(), 'Ether')}</td>
                        <td>{item.owner}</td>
                        {item.purchased ?
                          <td><button onClick = {(event) => {
                            this.props.buyProduct(item.id, item.price)
                          }} className="buyButton">Buy</button></td>
                          : null}
                      
                      </tr>
                      )
                    })}
                    </tbody>
                  </table> 
                  </div>);
    }
}
 
export default Market;