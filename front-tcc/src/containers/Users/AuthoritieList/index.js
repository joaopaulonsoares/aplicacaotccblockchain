
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import AuthoritieListTable from '../../../components/Users/AuthoritieListTable/index'
import LinearProgress from '@material-ui/core/LinearProgress';

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


class AuthoritieList extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      openSnackBar: false,
      snackBarMessageError: "",
      isFetchingInfo:true,
      authoritiesList:[]
    };
  }

  async getAuthoritiesListData(){
    const authoritiesCount =  await this.props.contract.methods.authoritiesCount().call()
    console.log("Autoridades Registradas: ", authoritiesCount)

    // Load infraction -> WORKING
    for (var i = 0; i < authoritiesCount; i++) {
      const driver = await this.props.contract.methods.authorities(i).call()
      this.setState({
        authoritiesList: [...this.state.authoritiesList, driver]
      })
    }
    console.log("Lista de Motoristas")
    console.log(this.state.authoritiesList)
    this.setState({isFetchingInfo:false});
  }

  componentDidMount() {
    this._isMounted = true;
    this.getAuthoritiesListData()
    
    //this.setState({ isLoadingPage: false });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleCloseSnackBar() {
    this.openSnackBar = false;
  }

  render() {

    if(this.state.isFetchingInfo){
      return <LinearProgress></LinearProgress>
    }
    return (
      <React.Fragment>
        <Box>
          <AuthoritieListTable rows={this.state.authoritiesList}></AuthoritieListTable>
        </Box>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(AuthoritieList);