import React from 'react';
import {Redirect } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { DASHBOARD_BASE_URL} from './../../api_urls';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
});

class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      errorMessage: "",
      successMessage: "",
      username:"",
      password:"" ,
      succesfullLogin:false
    };
    this.isUserAccountSync = this.isUserAccountSync.bind(this);
  }

  async isUserAccountSync(){
    try{
      var currentAccount = this.props.account;
      const isRegisteredDriver =  await this.props.contract.methods.checkIfDriverIsRegisteredByAddress(currentAccount).call();

      if(isRegisteredDriver){
          this.setState({succesfullLogin:true})
      }else{
          this.setState({succesfullLogin:false});
      }
    }catch(error){
        //console.log("Erro")
        console.log(error)
    }

}

componentDidMount(){
  this.isUserAccountSync();
}


render(){
  const { classes } = this.props;

    return (
      <div>
        {this.state.succesfullLogin ?
          <Redirect to={DASHBOARD_BASE_URL} />
          :
          <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5"> 
                  Você está logado na conta , 
                </Typography >
                <Typography variant="h4">
                  {this.props.account}
                </Typography>
                <Typography variant="h5">
                  e essa conta não é de um motorista registrado.
                </Typography>
              </div>
            </Container>
      }
      </div>

    )
  }

  }

LoginScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(LoginScreen);