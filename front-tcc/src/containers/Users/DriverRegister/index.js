
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiAlert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import DriverRegisterForm from '../../../components/Users/DriverRegisterForm/index'

const useStyles = (theme) => ({
  "@global": {
    body: {
      backgroundColor: "theme.palette.common.white",
    },
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },

  flexContainer: {
    display: "flex",
    flexDirection: "row",
  },
  tableRoot: {
    width: "100%",
  },
  tableWrapper: {
    overflow: "auto",
  },
});


class DriverRegisterPage extends Component {
  constructor(props){
    super(props);
    this.state = { 
        vehiclePlate: "", 
        infractionCategory: "",
        dateInfraction: new Date(),
        infractionPoints:"" ,
        observations:"",
        valueToPay:"",
        statusOfInfraction:"",
        infractorDriverAddress:"",
        contract:this.props.contract
    };
    this.handleVehiclePlate = this.handleVehiclePlate.bind(this);
    this.handleInfractionCategory = this.handleInfractionCategory.bind(this);
    this.handleDateInfraction = this.handleDateInfraction.bind(this);
    this.handleInfractionPoints = this.handleInfractionPoints.bind(this);
    this.handleObservations = this.handleObservations.bind(this);
    this.handleValueToPay = this.handleValueToPay.bind(this);
    this.handleStatusOfInfraction = this.handleStatusOfInfraction.bind(this);
    this.handleInfractorDriverAddress = this.handleInfractorDriverAddress.bind(this);
    this.submitCreateSessionForm = this.submitCreateSessionForm.bind(this);
}

handleVehiclePlate= (e) => {
    this.setState({vehiclePlate: e.target.value});
};

handleInfractionCategory= (e) => {
    console.log(e)
    this.setState({infractionCategory: e.target.value});
};

handleDateInfraction = (e) => {
    console.log(e)
    this.setState({dateInfraction: e});
};

handleInfractionPoints = (e) => {
    this.setState({infractionPoints: e.target.value});
};

handleObservations = (e) => {
    this.setState({observations: e.target.value});
};  

handleValueToPay = (e) => {
    this.setState({valueToPay: e.target.value});
};

handleStatusOfInfraction = (e) => {
    this.setState({statusOfInfraction: e.target.value});
};

handleInfractorDriverAddress = (e) => {
    this.setState({infractorDriverAddress: e.target.value});
};


async registerDriver(){
  var contract = this.props.contract;
  const ticketsCount =  await contract.methods.ticketsCount().call()
  console.log(ticketsCount)
    /*const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const network =  web3.eth.net.getNetworkType();
    //Fetch account
    const accounts = await web3.eth.getAccounts();
    //setAccount(accounts[0])
    this.setState({loggedAccount:accounts[0]})
    console.log(accounts[0])
    
    //Instancia o contrato
    const trafficApp = new web3.eth.Contract(APP_ABI,APP_ADDRESS)
    this.setState({trafficApp})
    const ticketsCount =  await trafficApp.methods.ticketsCount().call()
    console.log(ticketsCount)

    for(var i = 0; i <= ticketsCount; i++) {
        var driversInfo =  await trafficApp.methods.drivers(i).call()
        console.log(driversInfo)
    }

    //const registerDriver = await trafficApp.methods.registerDriver("Joao",0,'0xF879DEA577453A50b7bE8a4deA0928c118C0A574').call()
    //console.log(registerDriver)*/
}
async getInfo(){
    const authoritiesCount =  await this.props.contract.methods.authoritiesCount().call()
    console.log("Autoridades Registradas driver page: ", authoritiesCount)
}

componentDidMount(){

  //this.registerDriver();
console.log("Contrato info", this.props.contract)
this.getInfo()

}


submitCreateSessionForm = (event) => {
    event.preventDefault();

};

render(){
const { classes } = this.props;

    return(
    <Box width={"100%"} display="flex" justifyContent="center">
        <Box width={"50%"}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" paddingBottom={8}>
                        <Typography variant="h2" color="textSecondary">Registrar Motorista</Typography>
                    </Box>
                </Grid>


                <Grid item xs={12}>
                    <Box display="block" justifyContent="flex-start" >
                        <TextField
                        label="Nome do Motorista" 
                        className={classes.inputBorderColor}
                        fullWidth={true}
                        id="driverName"
                        variant="outlined"
                        color="primary"
                        onChange={(e)=>{this.handleObservations(e)}}
                        value={this.state.observations}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box display="block" justifyContent="flex-start" >
                        <TextField
                        label="Chave do motorista" 
                        className={classes.inputBorderColor}
                        id="driverAddress"
                        variant="outlined"
                        color="primary"
                        fullWidth={true}
                        onChange={(e)=>{this.handleInfractorDriverAddress(e)}}
                        value={this.state.infractorDriverAddress}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" paddingTop={3}>
                        <Button variant="contained" onClick={(e) => { this.submitCreateSessionForm(e) }}>Registrar Motorista</Button>
                    </Box>
                </Grid>
            </Grid>

        </Box>
    </Box>

    )
}


}

export default withStyles(useStyles)(DriverRegisterPage);