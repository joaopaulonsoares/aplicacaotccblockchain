
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import InfractionCancelTable from '../../../components/Infractions/InfractionCancelTable/index.js'
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


class InfractionCancel extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      openSnackBar: false,
      snackBarMessageError: "",
      isFetchingInfo:true,
      infractionsList:[]
    };
  }

  async getInfractionCancelListData(){
    const infractionsCount =  await this.props.contract.methods.cancelTicketsRequestCount().call()
    //console.log("Requisições de cancelamento: ", infractionsCount)

    // Load infraction -> WORKING
    for (var i = 0; i < infractionsCount; i++) {
      const infractionCancelList = await this.props.contract.methods.cancelTicketsRequests(i).call();
      
      if(infractionCancelList.driverAddress === this.props.account){
        this.setState({
          infractionsList: [...this.state.infractionsList, infractionCancelList]
        })
      }

    }
    
    //console.log("Lista de Requisições")
    //console.log(this.state.infractionsList)
    
    this.setState({isFetchingInfo:false});
  }

  componentDidMount() {
    this._isMounted = true;
    this.getInfractionCancelListData()
    
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
            <InfractionCancelTable rows={this.state.infractionsList} contract={this.props.contract} account={this.props.account}></InfractionCancelTable>
          </Box>
        </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(InfractionCancel);