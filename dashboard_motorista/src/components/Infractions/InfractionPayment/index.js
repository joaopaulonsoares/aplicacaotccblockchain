
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
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
            waitingPaymentRequest:false,
            requestMadeSuccesfull:false,
            request:""
        };
        this.payInfraction = this.payInfraction.bind(this);
    }

    async payInfraction(){
        var ticketId = this.props.ticket.id;

        this.setState({waitingPaymentRequest:true});
        const paymentAcceptedTicketRequest = await this.props.contract.methods.payInfraction(ticketId).send({ from: this.props.account, value:this.props.ticket.valueToPay })
        
        if(paymentAcceptedTicketRequest.status){
            this.setState({request:paymentAcceptedTicketRequest, requestMadeSuccesfull:true});
        }else{
            window.alert("Erro ao pagar infração. Tente novamente mais tarde" );
        }

        this.setState({requestMadeSuccesfull:true, waitingPaymentRequest:false});
    }


    componentDidMount(){
        console.log(this.props)
    }

    render(){

        if(this.state.requestMadeSuccesfull){
            return (<Alert severity="success">Pagamento realizado com sucesso. Informações no bloco {this.state.request.blockNumber} na transação {this.state.request.transactionHash}. </Alert>)
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

                    <Typography variant="h5" color="textSecondary">Confirma que deseja realizar o pagamento da infração {this.props.ticket.id} no valor de {this.props.ticket.valueToPay} para {this.props.ticket.authorityResponsableAdress}?</Typography>

                    <Grid item xs={12}>
                        {this.state.waitingPaymentRequest ? 
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
                                    <Box m={1}><Button variant="contained" color="primary" onClick={(e) => { this.payInfraction(e) }}> Confirmar </Button></Box>
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