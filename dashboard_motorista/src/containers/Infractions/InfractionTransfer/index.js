
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import InfractionTransferingTable from '../../../components/Infractions/InfractionTransferingTable/index.js'
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


class InfractionTranfer extends Component {
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

  async getInfractionTransferListData(){
    const infractionsCount =  await this.props.contract.methods.transferTicketsCount().call()
    //console.log("Requisições de transferência: ", infractionsCount)

    // Load infraction -> WORKING
    for (var i = 0; i < infractionsCount; i++) {
      const infractionTransferList = await this.props.contract.methods.tranferTicketsRequests(i).call()
      this.setState({
        infractionsList: [...this.state.infractionsList, infractionTransferList]
      })
    }
    //console.log("Lista de Requisições")
    //console.log(this.state.infractionsList)
    this.setState({isFetchingInfo:false});
  }

  componentDidMount() {
    this._isMounted = true;
    this.getInfractionTransferListData()
    
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
            <InfractionTransferingTable rows={this.state.infractionsList} contract={this.props.contract} account={this.props.account}></InfractionTransferingTable>
          </Box>
        </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(InfractionTranfer);