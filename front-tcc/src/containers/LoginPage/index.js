import React from 'react';
import {Redirect } from "react-router-dom";

import { Grid, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { DASHBOARD_BASE_URL} from './../../api_urls';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
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
    this.loginMethod = this.loginMethod.bind(this);
  }

  loginMethod(event){
    /*event.preventDefault();

    axiosInstance.post(TOKEN_OBTAIN_URL, {
            username: this.state.username,
            password: this.state.password
        }).then(
            result => {
              //console.log(result)
                axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
                localStorage.setItem('access_token', result.data.access);
                localStorage.setItem('refresh_token', result.data.refresh);
                this.setState({succesfullLogin:true})
            }
    ).catch (error => {
        throw error;
    })*/

  }

  handleEmailFormChange = (e) =>
  {
    this.setState({username: e.target.value});
  };

  handlePasswordFormChange = (e) =>
  {
    this.setState({password: e.target.value});
  };


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
                  <Typography component="h1" variant="h5">
                    Login
                  </Typography>
                  <form className={classes.form} noValidate>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      value={this.state.username}
                      onChange={(e)=>{this.handleEmailFormChange(e)}} 
                      autoFocus
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Senha"
                      type="password"
                      id="password"
                      value={this.state.password}
                      autoComplete="current-password"
                      onChange={(e)=>{this.handlePasswordFormChange(e)}}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={this.loginMethod} 
                    >
                      Login
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="#" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
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