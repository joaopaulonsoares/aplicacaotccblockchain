import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import {
  withStyles
} from '@material-ui/core/styles';
//import Web3 from 'web3'

//https://www.youtube.com/watch?v=LzdMosLzj80
const useStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: "theme.palette.common.white",
      fontFamily: "Lato, sans-serif",
    },
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },

  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  },
  tableRoot: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
  },

});

class InitialDashboard extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      openSnackBar:false,
      snackBarMessageError:"",
      web3:null,
      accounts:null,
      contract:null
    };
  }


  async componentDidMount() {

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleCloseSnackBar() {
    this.openSnackBar = false;
  }


  render() {
    
    
    return  (
      
        <React.Fragment>
          <Paper>
            <Box style={{padding: '1rem'}}>
              <center><h1>Dashboard de Autoridades</h1>
              </center>
            </Box>
          </Paper>
        </React.Fragment>
      
    );
  }

}

export default withStyles(useStyles)(InitialDashboard);

/*
  componentDidMount() {
    this._isMounted = true;
    
    if(this._isMounted){
      // If we need to wait for something to full render before render the page
      this.checkIfUserIsAuthenticaded(() => {


      });
    }
    
   this.setState({isLoadingPage:false});

  }
  */