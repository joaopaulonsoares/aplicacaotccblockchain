
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
});


class InfractionPayment extends Component {
  constructor(props){
        super(props);
        this.state = { 
            waitingTransferRequest:false,
            requestMadeSuccesfull:false,
            request:""
        };
        this.confirmTransferRequest = this.confirmTransferRequest.bind(this);
        this.rejectTransferRequest = this.rejectTransferRequest.bind(this);
        this.handleAcceptOrRejectTransfer = this.handleAcceptOrRejectTransfer.bind(this);
    }

    async confirmTransferRequest(){
        var transferInfractionRequestId = this.props.ticket.id;
        this.setState({waitingTransferRequest:true});
        const transferAcceptedTicketRequest = await this.props.contract.methods.acceptTransferTicketRequest(transferInfractionRequestId).send({ from: this.props.account })
        .on('transactionHash', function(hash){
            //console.log("hash", hash)
        })
    
        if(transferAcceptedTicketRequest.status){
            this.setState({request:transferAcceptedTicketRequest, requestMadeSuccesfull:true});
        }else{
            window.alert("Erro ao confirmar transferência de infração. Tente novamente mais tarde" );
        }
        this.setState({requestMadeSuccesfull:true, waitingTransferRequest:false});
    }

    async rejectTransferRequest(){
        var transferInfractionRequestId = this.props.ticket.id;
        this.setState({waitingTransferRequest:true});
        const transferAcceptedTicketRequest = await this.props.contract.methods.rejectTransferTicketRequest(transferInfractionRequestId).send({ from: this.props.account })
    
        if(transferAcceptedTicketRequest.status){
            this.setState({request:transferAcceptedTicketRequest, requestMadeSuccesfull:true});
        }else{
            window.alert("Erro ao rejeitar transferência de infração. Tente novamente mais tarde" );
        }
        this.setState({requestMadeSuccesfull:true, waitingTransferRequest:false});
    }

    async handleAcceptOrRejectTransfer(e){
        e.preventDefault();
        if(this.props.acceptTransfer){
            this.confirmTransferRequest();
        }else{
            this.rejectTransferRequest();
        }
    }

    //TODO -> Fazer função de pagamento

    componentDidMount(){
        console.log(this.props)
    }

    render(){

        if(this.state.requestMadeSuccesfull){
            return (<Alert severity="success">Pagamento realizado com sucesso. Informações no bloco {this.state.request.blockNumber} na transação {this.state.request.transactionHash}. </Alert>)
        }

        if(this.state.waitingTransferRequest){
            return(
                <Box display="flex" justifyContent="center" paddingTop={1} paddingBottom={2}>
                    <CircularProgress></CircularProgress>
                    <Box>
                        <Typography>Transação em andamento</Typography>
                    </Box>
                </Box>
            )
        }

        return(
        <Box width={"100%"} display="flex" justifyContent="center">
            <Box width={"80%"}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" paddingBottom={2}>
                            <Typography variant="h3" color="textSecondary">Pagamento de Infração</Typography>
                        </Box>
                    </Grid>

                    <Typography variant="h5" color="textSecondary">Confirma que deseja realizar o pagamento da infração TICKET_ID no valor de VALOR para AUTORIDADE?</Typography>

                    <Grid item xs={12}>
                        {this.state.waitingTransferRequest ? 
                            (
                                <Box display="flex" justifyContent="center" paddingTop={1} paddingBottom={2}>
                                    <CircularProgress></CircularProgress>
                                    <Box><Typography>Transação em andamento</Typography></Box>
                                </Box>
                            )
                            : 
                            (
                                <Box display="flex" justifyContent="center" >
                                    <Box m={1}><Button onClick={this.props.handleClose} variant="contained" color="secondary"> Cancelar </Button></Box>
                                    <Box m={1}><Button variant="contained" color="primary" onClick={(e) => { this.handleAcceptOrRejectTransfer(e) }}> Confirmar </Button></Box>
                                </Box>
                            ) 
                        }
                    </Grid>
                </Grid>

            </Box>
        </Box>

        )
    }


}

export default withStyles(useStyles)(InfractionPayment);