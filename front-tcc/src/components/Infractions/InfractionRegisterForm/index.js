import React from "react";
import Box from "@material-ui/core/Box";
import Grid  from "@material-ui/core/Grid";
import Typography  from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker,
} from '@material-ui/pickers';
import ptBrLocale from "date-fns/locale/pt-BR";

//import axiosInstance from '../../../auth/axiosApi.js'
//import {API_SESSIONS_URL} from '../../../api_urls'


const useStyles = makeStyles({
  root: {
    background:'#007E5A',
    border: 0,
    height: '100%',
    width: '100%',
    position: "fixed",
    display: "flex"
  },
  inputBorderColor:{
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "green"
      },
  },
  inputTextColor:{
    color:'green',
  },
  textField: {
    minWidth: '30vh',
  },
});

class InfractionRegisterForm extends React.Component {
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
            infractorDriverId:"",
            loggedAccount:"",
            waitingInfractionRegister:false
        };
        this.handleVehiclePlate = this.handleVehiclePlate.bind(this);
        this.handleInfractionCategory = this.handleInfractionCategory.bind(this);
        this.handleDateInfraction = this.handleDateInfraction.bind(this);
        this.handleInfractionPoints = this.handleInfractionPoints.bind(this);
        this.handleObservations = this.handleObservations.bind(this);
        this.handleValueToPay = this.handleValueToPay.bind(this);
        this.handleStatusOfInfraction = this.handleStatusOfInfraction.bind(this);
        this.handleInfractorDriverAddress = this.handleInfractorDriverAddress.bind(this);
        this.handleInfractorDriverId = this.handleInfractorDriverId.bind(this);
        this.submitCreateSessionForm = this.submitCreateSessionForm.bind(this); 
        this.registerInfraction = this.registerInfraction.bind(this);
    }

    handleVehiclePlate= (e) => {
        this.setState({vehiclePlate: e.target.value.toUpperCase()});
    };

    handleInfractionCategory= (e) => {
        console.log(e.target.value)
        this.setState({infractionCategory: e.target.value});
    };

    handleDateInfraction = (e) => {

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

    handleInfractorDriverId = (e) => {
        this.setState({infractorDriverId: e.target.value});
    };

    submitCreateSessionForm = (event) => {
        event.preventDefault();

        //console.log("Botão click");
        this.registerInfraction();
    };

    async registerInfraction(){
        //console.log("Driver id ", this.state.infractorDriverId)
        var vehiclePlate = this.state.vehiclePlate;
        var infractionCategory = parseInt(this.state.infractionCategory);
        var dateInfraction = this.state.dateInfraction;
        var dateInfractionFormated = dateInfraction.getMonth() + "/" + dateInfraction.getDay() + "/" + dateInfraction.getFullYear()
        var infractionPoints = parseInt(this.state.infractionPoints);
        var observations = this.state.observations;
        var valueToPay = 1;
        var statusOfInfraction = "Active";
        var infractorDriverAddress = this.state.infractorDriverAddress;
        var infractorDriverId =  this.state.infractorDriverId;


        this.setState({waitingInfractionRegister:true})
        console.log(vehiclePlate,infractionCategory,dateInfractionFormated,infractionPoints,observations,valueToPay,statusOfInfraction, infractorDriverAddress, infractorDriverId)
        
        const registerInfraction = await this.props.contract.methods.registerInfraction(vehiclePlate,infractionCategory,dateInfractionFormated,infractionPoints,observations,valueToPay,statusOfInfraction, infractorDriverAddress, infractorDriverId).send({ from: this.props.account })
        .on('transactionHash', function(hash){
            console.log("hash", hash)
        })

        if(registerInfraction.status){
            window.alert("Infracao Registrada com sucesso no bloco " + registerInfraction.blockNumber + " na transação " + registerInfraction.transactionHash )
        }else{
            window.alert("Erro ao registrar Infracao. Tente novamente mais tarde" )
        }

        
        this.setState({waitingInfractionRegister:false })
        console.log(registerInfraction)
    }

    async getInfo(){
        const ticketsCount =  await this.props.contract.methods.ticketsCount().call()
        
        console.log("Autoridades Registradas driver page: ", ticketsCount)
    }

    componentDidMount(){

        //this.registerDriver();
        console.log("Contrato info", this.props.contract)
        //this.getInfo()

    }
    

    render(){
    const { classes } = this.props;

        return(
        <Box width={"100%"} display="flex" justifyContent="center">
            <Box width={"50%"}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" paddingBottom={8}>
                            <Typography variant="h2" color="textSecondary">Registrar Infração</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box display="block" justifyContent="flex-start" >
                            <TextField
                            label="Placa do Veículo" 
                            className={classes.inputBorderColor}
                            id="vehiclePlate"
                            variant="outlined"
                            color="primary"
                            fullWidth={true}
                            onChange={(e)=>{this.handleVehiclePlate(e)}}
                            value={this.state.vehiclePlate}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box display="block" justifyContent="flex-start" width="100%">
                            <TextField id="selectInfractionCategory" 
                            label="Categoria da Infração"
                            variant="outlined" fullWidth={true} select
                            className={classes.textField}
                            onChange={(e)=>{this.handleInfractionCategory(e)}}
                            value={this.state.infractionCategory}
                            >
                                <MenuItem value="">Selecione</MenuItem>
                                <MenuItem value="1">Leve</MenuItem>
                                <MenuItem value="2">Média</MenuItem>
                                <MenuItem value="3">Grave</MenuItem>
                                <MenuItem value="4">Gravíssima</MenuItem>
                            </TextField>
                        </Box>

                    </Grid>
                    <Grid item xs={6}>
                        <Box display="block" justifyContent="flex-start" >
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBrLocale}>
                                <KeyboardDatePicker
                                    label="Data da Infração"
                                    disableToolbar
                                    fullWidth={true}
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    value={this.state.dateInfraction}
                                    id="infractionDate"
                                    inputVariant="outlined"
                            
                                    onChange={(e)=>{this.handleDateInfraction(e)}}
                                    />
                                </MuiPickersUtilsProvider>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box display="block" justifyContent="flex-start" >
                            <TextField
                            label="Pontuação da Infração" 
                            className={classes.inputBorderColor}
                            fullWidth={true}
                            id="infractionPoints"
                            variant="outlined"
                            color="primary"
                            type="number"
                            onChange={(e)=>{this.handleInfractionPoints(e)}}
                            value={this.state.infractionPoints}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="block" justifyContent="flex-start" >
                            <TextField
                            label="Observações" 
                            className={classes.inputBorderColor}
                            fullWidth={true}
                            id="observationsField"
                            variant="outlined"
                            color="primary"
                            onChange={(e)=>{this.handleObservations(e)}}
                            value={this.state.observations}
                            multiline
                            rows={5}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <Box display="block" justifyContent="flex-start" >
                            <TextField
                            label="Chave(address) do infrator" 
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
                    <Grid item xs={2}>
                        <Box display="block" justifyContent="flex-start" >
                            <TextField
                            label="Id do infrator" 
                            className={classes.inputBorderColor}
                            id="driverId"
                            variant="outlined"
                            color="primary"
                            type="number"
                            fullWidth={true}
                            onChange={(e)=>{this.handleInfractorDriverId(e)}}
                            value={this.state.infractorDriverId}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" paddingTop={3}>
                            
                            {this.state.waitingInfractionRegister ? 
                                (<div><CircularProgress></CircularProgress><br></br><Typography variant="body" color="textSecondary">Transação em andamento</Typography> </div>)
                                    : 
                                ( <Button variant="contained" onClick={(e) => { this.submitCreateSessionForm(e) }}>Registrar Infração</Button> ) 
                            }
                        </Box>
                    </Grid>
                </Grid>

            </Box>
        </Box>

        )
    }
}

export default withStyles(useStyles)(InfractionRegisterForm);