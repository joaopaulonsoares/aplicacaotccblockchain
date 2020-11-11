
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

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


class InfractionCancelRequestForm extends Component {
  constructor(props){
        super(props);
        this.state = { 
            ticketId:"",
            explanation:"",
            waitingRegisterRequest:false,
            requestMadeSuccesfull:false,
            request:""
        };
        this.handleTicketId = this.handleTicketId.bind(this);
        this.handleExplanation = this.handleExplanation.bind(this);
        this.registerCancelInfractionRequest = this.registerCancelInfractionRequest.bind(this);
        this.submitCreateSessionForm = this.submitCreateSessionForm.bind(this);
    }


    handleTicketId = (e) => {
        this.setState({ticketId: e.target.value});
    };  
    
    handleExplanation = (e) => {
        this.setState({explanation: e.target.value});
    };

    async registerCancelInfractionRequest(){
        var ticketId = this.props.ticket.id;
        var explanation = this.state.explanation;

        this.setState({waitingRegisterRequest:true});
        
        const registerRequest = await this.props.contract.methods.registerCancelTicketRequest(ticketId,explanation).send({ from: this.props.account })
        .on('transactionHash', function(hash){
            //console.log("hash", hash)
        })

        if(registerRequest.status){
            this.setState({request:registerRequest, requestMadeSuccesfull:true});

        }else{
            window.alert("Erro ao registrar Autoridade. Tente novamente mais tarde" );
        }

        this.setState({requestMadeSuccesfull:true, waitingRegisterRequest:false,  ticketId:"", explanation:"",});

    }

    async submitCreateSessionForm(event){
        event.preventDefault();
        await this.registerCancelInfractionRequest();
    };

    render(){
        const { classes } = this.props;

        if(this.state.requestMadeSuccesfull){
            return (<Alert severity="success">Solicitação Registrada com sucesso no bloco {this.state.request.blockNumber} na transação {this.state.request.transactionHash}. </Alert>)
        }

        return(
        <Box width={"100%"} display="flex" justifyContent="center">
            <Box width={"80%"}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" paddingBottom={4}>
                            <Typography variant="h5" color="textSecondary">Registrar Recurso</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="block" justifyContent="flex-start" >
                            <TextField
                            label="Id da Infração" 
                            className={classes.inputBorderColor}
                            fullWidth={true}
                            id="infractionIdField"
                            variant="outlined"
                            color="primary"
                            onChange={(e)=>{this.handleTicketId(e)}}
                            value={this.props.ticket.id}
                            disabled
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="block" justifyContent="flex-start" >
                            <TextField
                            label="Explicação do Recurso" 
                            className={classes.inputBorderColor}
                            fullWidth={true}
                            id="explanationField"
                            variant="outlined"
                            color="primary"
                            multiline
                            rows={4}
                            onChange={(e)=>{this.handleExplanation(e)}}
                            value={this.state.explanation}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" paddingTop={2} paddingBottom={2}>
                            {this.state.waitingRegisterRequest ? 
                                (<div><CircularProgress></CircularProgress><br></br><Typography variant="body" color="textSecondary">Transação em andamento</Typography> </div>)
                                 : 
                                ( <Button variant="contained" onClick={(e) => { this.submitCreateSessionForm(e) }}>Solicitar Cancelamento</Button> ) }
                        </Box>
                    </Grid>
                </Grid>

            </Box>
        </Box>

        )
    }


}

export default withStyles(useStyles)(InfractionCancelRequestForm);