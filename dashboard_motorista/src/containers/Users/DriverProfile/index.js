
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';


const useStyles = (theme) => ({
  "@global": {
    body: {
      backgroundColor: "theme.palette.common.white",
    },
  },
});


class DriverProfile extends Component {
  constructor(props){
        super(props);
        this.state = { 
            driverId:"",
            driverName:"",
            driverAddress:"",
            driverNumberOfPoints:"",
            waitingRegisterRequest:false,
            requestMadeSuccesfull:false,
            request:""
        };
    }

    async getDriverInformation(){
        const driverInfo =  await this.props.contract.methods.getDriverInformationByAddress(this.props.account).call()
        console.log(driverInfo)

        if(driverInfo.exist){
            this.setState({
                driverId:driverInfo.id,
                driverName:driverInfo.name,
                driverAddress:driverInfo.driverAddress,
                driverNumberOfPoints:driverInfo.numberOfPoints,
            })
        }
    }

    componentDidMount(){
        console.log(this.props)
        this.getDriverInformation()
    }


    render(){
        const { classes } = this.props;


        return(
        <Box width={"100%"} display="flex" justifyContent="center">
            <Box width={"50%"}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" paddingBottom={4}>
                            <Typography variant="h3" color="textSecondary">Informações Do Motorista</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="block" justifyContent="flex-start" >
                            <TextField
                            label="Id do Motorista" 
                            className={classes.inputBorderColor}
                            fullWidth={true}
                            id="driverIdField"
                            variant="outlined"
                            color="primary"
                            value={this.state.driverId}
                            InputProps={{
                                readOnly: true,
                              }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="block" justifyContent="flex-start" >
                            <TextField
                            label="Nome" 
                            className={classes.inputBorderColor}
                            fullWidth={true}
                            id="driverNameField"
                            variant="outlined"
                            color="primary"
                            InputProps={{
                                readOnly: true,
                              }}
                            value={this.state.driverName}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="block" justifyContent="flex-start" >
                            <TextField
                            label="Número de Pontos" 
                            className={classes.inputBorderColor}
                            fullWidth={true}
                            id="driverNameField"
                            variant="outlined"
                            color="primary"
                            InputProps={{
                                readOnly: true,
                              }}
                            value={this.state.driverNumberOfPoints}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="block" justifyContent="flex-start" >
                            <TextField
                            label="Chave Pública" 
                            className={classes.inputBorderColor}
                            fullWidth={true}
                            id="driverAddressField"
                            variant="outlined"
                            color="primary"
                            InputProps={{
                                readOnly: true,
                              }}
                            value={this.state.driverAddress}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
        )
    }
}

export default withStyles(useStyles)(DriverProfile);