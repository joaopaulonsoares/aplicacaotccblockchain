
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiAlert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import DriverListTable from '../../../components/Users/DriversListTable/index'
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


class DriverList extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      openSnackBar: false,
      snackBarMessageError: "",
      isFetchingInfo:true,
      driversList:[]
    };
  }

  async getDriversListData(){
    const driversCount =  await this.props.contract.methods.driversCount().call()
    console.log("Motoristas Registrados: ", driversCount)

    // Load infraction -> WORKING
    for (var i = 0; i < driversCount; i++) {
      const driver = await this.props.contract.methods.drivers(i).call()
      this.setState({
        driversList: [...this.state.driversList, driver]
      })
    }
    console.log("Lista de Motoristas")
    console.log(this.state.driversList)
    this.setState({isFetchingInfo:false});
  }

  componentDidMount() {
    this._isMounted = true;
    this.getDriversListData()
    
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
            <DriverListTable rows={this.state.driversList}></DriverListTable>
          </Box>
        </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(DriverList);