import React from 'react';
import Component from 'react'
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'
import {APP_ABI, APP_ADDRESS} from './config'


class App extends React.Component{

  constructor(props){
    super(props)
    this.state={
      account:''
    }
  }

  componentWillMount(){
    this.loadBlockChainData()
  }

  async loadBlockChainData(){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const network = await web3.eth.net.getNetworkType();
  
    //Fetch account
    const accounts = await web3.eth.getAccounts();
    this.setState({account:accounts[0]})

    //Instancia o contrato
    const trafficApp = new web3.eth.Contract(APP_ABI,APP_ADDRESS)
    this.setState({trafficApp})
    const ticketsCount = await trafficApp.methods.ticketsCount().call()
    console.log(ticketsCount)
    const driverInfo = await trafficApp.methods.getDriverInformation(1).call()
    console.log(driverInfo)
    const ticketInfo = await trafficApp.methods.getTicketInformation(1).call()
    console.log(ticketInfo)
  }

  render(){
    return(
      <div>
        <h1>Hello</h1>
        <h1>Sua conta é: {this.state.account}</h1>
      </div>
    )
  }
}


export default App;
