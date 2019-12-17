import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import Navbar from './navbar.js'
import Market from './Market.js'
import Marketplace from '../abis/Marketplace.json';

class App extends Component {

  constructor(props) {
    super(props)
  this.state = {
     account: '',
     loading: true,
     products: [],
     productCount: 0
  }
  this.buyProduct = this.buyProduct.bind(this);
  this.addProduct = this.addProduct.bind(this);
}

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if(window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
      alert("Create your Metmask Wallet");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    const id = await web3.eth.net.getId();
    this.setState({account: account[0]})
    const abi = Marketplace.abi;
    const networkData = Marketplace.networks[id];
    if (networkData) {
     const marketplace = web3.eth.Contract(abi, networkData.address);
     this.setState({marketplace})
     const productCount = await marketplace.methods.productCount.call()
     this.setState({productCount})
     for(var i = 1; i<=productCount; i++) {
       const product = await marketplace.methods.product(i).call()
       this.setState({
         products: [...this.state.products, product]
       })
     }
     console.log(this.state.products)
     this.setState({loading: false})
    } else {
        alert("No Contract Deployed!!")
    }
 }


 addProduct(name, price){
  this.setState({ loading: true })
  this.state.marketplace.methods.createProduct(name, price).send({ from: this.state.account })
   .once('reciept', reciept => {
    this.setState({ loading: false })
   })
 }

 buyProduct(id, price) {
   this.setState({loading: true})
   this.state.marketplace.methods.buyProduct(id).send({from: this.state.account, value: price})
   .once('reciept', reciept => {
     this.setState({loading: false})
   })
 }
  render() {
    return (
      <div>
<Navbar account = {this.state.account} />
<div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
           {this.state.loading ? <h5>Loading..</h5> : <Market buyProduct = {this.buyProduct} addProduct = {this.addProduct} products = {this.state.products}/>}
                </main>
</div>
      </div>
      </div>
    );
  }
}

export default App;
