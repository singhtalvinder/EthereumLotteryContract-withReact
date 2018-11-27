import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

// 4- stages
// 1 Component renders
// 2 componentDidMount called -> is lifecycle method defined on
//   component which is called automatically when the component is 
//   rendered on the screen. And is the right place to load any data
//   or perform any setup kind of thing one time when the component first
//   renders on the screen.
// 3 'Call' methods on the contract.
// 4 set data on 'state'

class App extends Component {
  // es2016 way:
  state= {
    manager:'',
    players: [],
    balance: '',
    value: '',
    message: ''
  };
  // Above code: automatically moved to constructor.

  // old way..
  /*constructor(props) {
    super(props);
    this.state= {manager: ''};
  }*/

  async componentDidMount() {
    // with metamask account setup, we don't need to pass from info 
    // to the call method below as it will be the first account signed into 
    // metamask. 
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    // The balance defined above is not a number, instead it is an 
    // object- a number wrapped in a library called bignumber.js.

    this.setState({manager, players, balance});
  }

  onSubmit= async (event) => {
    // this is automaticall set.
    event.preventDefault();

    // To send transcations we need to get the contract info.
    const accounts = await web3.eth.getAccounts();
    
    this.setState({message: 'Waiting on transaction success...'});
    // Assume first one is sending transaction.
    // Enter-generally take 15-20 secs.
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({message: 'Congrats!! You have been entered!!'});
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Waiting on transaction success...'});

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });
    this.setState({message: 'WOHO, A Winner has been picked!!'});       
  };

  
  render() {
    // all accounts associated to the web3.
    web3.eth.getAccounts().then(console.log);
    
    return (
      <div>
        <h2>Lottery contract</h2>
        <p>This contract is managed by {this.state.manager}.
          There are currently {this.state.players.length} people entered,
          competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
        <hr/>
        <form onSubmit= {this.onSubmit}>
          <h4> Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input 
              value = {this.state.value}
              onChange = {event => this.setState({value: event.target.value})}
            /> 
          </div>
            <button>Enter</button>
        </form>
        <hr/>
        <h4>Ready to pick a winner></h4>
        <button onClick={this.onClick}>Pick a Winner!</button>
        <hr/>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
