import React from "react";
import Box from "@material-ui/core/Box";
import Grid  from "@material-ui/core/Grid";
import Typography  from "@material-ui/core/Typography";
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem';
import SendIcon from '@material-ui/icons/Send';
import * as moment from 'moment'
    
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
            infractorDriverAddress:""
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

    createSession(callback){
        /*axiosInstance.post(API_SESSIONS_URL, {
            location: "plenary",
            date:new Date(this.state.sessionDate).toISOString().slice(0,10),
            type_session: this.state.sessionType,
            situation_session:"pre_session",
            resume: "Resumo",
            enable:true
            }).then(
                result => {
                    if(result.status===201){
                        //alert("Sessão criada com sucesso")
                        console.log("Dashboard criado com sucesso")
                    }else{
                        console.log("Falha ao criar dashboard")
                    }
                    //callback();
                }   
        )
        /*.catch (error => {
            throw error;
        })*/
    }

    submitCreateSessionForm = (event) => {
        event.preventDefault();

        this.createSession( () => {
            window.location.reload(false);
        });
    };

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
                                <MenuItem value="leve">Leve</MenuItem>
                                <MenuItem value="media">Média</MenuItem>
                                <MenuItem value="grave">Grave</MenuItem>
                                <MenuItem value="gravissima">Gravíssima</MenuItem>
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
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" paddingTop={3}>
                            <Button variant="contained" onClick={(e) => { this.submitCreateSessionForm(e) }}>Registrar Infração</Button>
                        </Box>
                    </Grid>
                </Grid>

            </Box>
        </Box>

        )
    }
}

export default withStyles(useStyles)(InfractionRegisterForm);