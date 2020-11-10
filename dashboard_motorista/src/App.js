import React,{Component} from 'react';
import './App.css';
import {ThemeProvider } from '@material-ui/core/styles';
import AppRouter from './router'
import {customTheme} from './theme'
import Web3 from 'web3'
import CircularProgress from '@material-ui/core/CircularProgress';
import Infraction from './abis/Infraction.json'

/*import { StylesProvider } from '@material-ui/core/styles';*/
/*const generateClassName = (rule, styleSheet) => `${styleSheet.options.classNamePrefix}-${rule.key}`;*/


class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      web3Instance:null,
      account:null,
      contract:null,
      loadingBlockchainData:true,
      authorities:[]
    };
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    
    // Load account information(from metamask)
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId(); // Get if its localhost, main, roopsten...
    const networkData = Infraction.networks[networkId] // Load information from transaction hash and contract address from smart contract
    
    if(networkData) {
      const infractionContract = new web3.eth.Contract(Infraction.abi, networkData.address)
      this.setState({ infractionContract })
      const authoritiesCount = await infractionContract.methods.authoritiesCount().call()
      //console.log("Autoridades Registradas: ", authoritiesCount)
      this.setState({ authoritiesCount })
      
      // Load authorities -> WORKING
       for (var i = 0; i <= authoritiesCount; i++) {
        const authoritie = await infractionContract.methods.authorities(i).call()
        this.setState({
          authorities: [...this.state.authorities, authoritie]
        })
      }
      //console.log("Lista de autoridades")
      //console.log(this.state.authorities)

      this.setState({ loadingBlockchainData: false})
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleCloseSnackBar() {
    this.openSnackBar = false;
  }


  render() {
    if(this.state.loadingBlockchainData){
      return (
        <div className="App">
          {/*<StylesProvider generateClassName={generateClassName}>*/}
            <CircularProgress></CircularProgress>
          {/*</StylesProvider>*/}
        </div>
      );
    }
    return (
      <div className="App">
        {/*<StylesProvider generateClassName={generateClassName}>*/}
         <ThemeProvider theme={customTheme}>
              <AppRouter account={this.state.account} contract={this.state.infractionContract} authorities={this.state.authorities} theme={customTheme}></AppRouter>
        </ThemeProvider>
        {/*</StylesProvider>*/}
      </div>
    );
  }

}

export default App;
