
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
import CircularProgress from '@material-ui/core/CircularProgress';

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
            driverName:"",
            driverAddress:"",
            contract:this.props.contract,
            waitingRegisterDriver:false,
            hashOfPendingRegisterTransaction:""
        };
        this.handleName = this.handleName.bind(this);
        this.handleDriverAddress = this.handleDriverAddress.bind(this);
        this.registerDriver = this.registerDriver.bind(this);
        this.submitCreateSessionForm = this.submitCreateSessionForm.bind(this);
    }


    handleName = (e) => {
        this.setState({driverName: e.target.value});
    };  


    handleDriverAddress = (e) => {
        this.setState({driverAddress: e.target.value});
    };


    async registerDriver(){
        //var contract = this.props.contract;
        //const authoritiesCount =  await this.props.contract.methods.authoritiesCount().call()
        var driverName = this.state.driverName;
        var driverAddress = this.state.driverAddress;
        
        this.setState({waitingRegisterDriver:true})
        
        const registerDriver = await this.props.contract.methods.registerDriver(driverName,0,driverAddress).send({ from: this.props.account })
        .on('transactionHash', function(hash){
            console.log("hash", hash)
        })
        /*.on('confirmation', function(confirmationNumber, receipt){
            window.alert("Motorista Registrado com sucesso no bloco " + receipt.blockNumber + " na transação " + receipt.transactionHash )
        })*/
        
        if(registerDriver.status){
            window.alert("Motorista Registrado com sucesso no bloco " + registerDriver.blockNumber + " na transação " + registerDriver.transactionHash )
        }else{
            window.alert("Erro ao registrar Motorista. Tente novamente mais tarde" )
        }

        this.setState({waitingRegisterDriver:false,  driverName:"", driverAddress:"" })
        console.log(registerDriver)
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


    async submitCreateSessionForm(event){
        event.preventDefault();
        console.log("Chamou")
        await this.registerDriver()
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
                            onChange={(e)=>{this.handleName(e)}}
                            value={this.state.driverName}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <Box display="block" justifyContent="flex-start" >
                            <TextField
                            label="Chave do motorista" 
                            className={classes.inputBorderColor}
                            id="driverAddress"
                            variant="outlined"
                            color="primary"
                            fullWidth={true}
                            onChange={(e)=>{this.handleDriverAddress(e)}}
                            value={this.state.driverAddress}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" paddingTop={3}>
                        
                            {this.state.waitingRegisterDriver ? 
                                (<div><CircularProgress></CircularProgress><br></br><Typography variant="body" color="textSecondary">Transação em andamento</Typography> </div>)
                                 : 
                                ( <Button variant="contained" onClick={(e) => { this.submitCreateSessionForm(e) }}>Registrar Motorista</Button> ) }
                        </Box>
                    </Grid>
                </Grid>

            </Box>
        </Box>

        )
    }


}

export default withStyles(useStyles)(DriverRegisterPage);