
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


class AuthoritieRegisterPage extends Component {
  constructor(props){
        super(props);
        this.state = { 
            authoritieName:"",
            authoritieInitials:"",
            authoritieAddress:"",
            contract:this.props.contract,
            waitingRegisterAuthoritie:false,
            hashOfPendingRegisterTransaction:""
        };
        this.handleName = this.handleName.bind(this);
        this.handleInitials = this.handleInitials.bind(this);
        this.handleAuthoritieAddress = this.handleAuthoritieAddress.bind(this);
        this.registerAuthoritie = this.registerAuthoritie.bind(this);
        this.submitCreateSessionForm = this.submitCreateSessionForm.bind(this);
    }


    handleName = (e) => {
        this.setState({authoritieName: e.target.value});
    };  
    
    handleInitials = (e) => {
        this.setState({authoritieInitials: e.target.value});
    };

    handleAuthoritieAddress = (e) => {
        this.setState({authoritieAddress: e.target.value});
    };


    async registerAuthoritie(){
        var authoritieName = this.state.authoritieName;
        var authoritieInitials = this.state.authoritieInitials;
        var authoritieAddress = this.state.authoritieAddress;
        
        this.setState({waitingRegisterAuthoritie:true})
        
        const registerAuthoritie = await this.props.contract.methods.registerAuthoritie(authoritieName,authoritieInitials,authoritieAddress).send({ from: this.props.account })
        .on('transactionHash', function(hash){
            console.log("hash", hash)
        })
        .on('confirmation', function(confirmationNumber, receipt){
            window.alert("Autoridade Registrada com sucesso no bloco " + receipt.blockNumber + " na transação " + receipt.transactionHash )
            //console.log(receipt)
            this.setState({waitingRegisterAuthoritie:false })
        })
        
        this.setState({waitingRegisterAuthoritie:false })
        console.log(registerAuthoritie)
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
        //console.log("Chamou")
        await this.registerAuthoritie()
    };

    render(){
        const { classes } = this.props;

        return(
        <Box width={"100%"} display="flex" justifyContent="center">
            <Box width={"50%"}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" paddingBottom={8}>
                            <Typography variant="h2" color="textSecondary">Registrar Autoridade</Typography>
                        </Box>
                    </Grid>


                    <Grid item xs={12}>
                        <Box display="block" justifyContent="flex-start" >
                            <TextField
                            label="Nome da Autoridade" 
                            className={classes.inputBorderColor}
                            fullWidth={true}
                            id="authoritieName"
                            variant="outlined"
                            color="primary"
                            onChange={(e)=>{this.handleName(e)}}
                            value={this.state.observations}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="block" justifyContent="flex-start" >
                            <TextField
                            label="Sigla da Autoridade" 
                            className={classes.inputBorderColor}
                            fullWidth={true}
                            id="authoritieInitials"
                            variant="outlined"
                            color="primary"
                            onChange={(e)=>{this.handleInitials(e)}}
                            value={this.state.observations}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="block" justifyContent="flex-start" >
                            <TextField
                            label="Chave da Autoridade" 
                            className={classes.inputBorderColor}
                            id="authoritieAddress"
                            variant="outlined"
                            color="primary"
                            fullWidth={true}
                            onChange={(e)=>{this.handleAuthoritieAddress(e)}}
                            value={this.state.authoritieAddress}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" paddingTop={3}>
                        
                            {this.state.waitingRegisterAuthoritie ? 
                                (<div><CircularProgress></CircularProgress><br></br><Typography variant="body" color="textSecondary">Transação em andamento</Typography> </div>)
                                 : 
                                ( <Button variant="contained" onClick={(e) => { this.submitCreateSessionForm(e) }}>Registrar Autoridade</Button> ) }
                        </Box>
                    </Grid>
                </Grid>

            </Box>
        </Box>

        )
    }


}

export default withStyles(useStyles)(AuthoritieRegisterPage);