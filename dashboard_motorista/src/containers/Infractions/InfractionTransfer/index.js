
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


class InfractionTransfer extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      openSnackBar: false,
      snackBarMessageError: "",
      isFetchingInfo:true,
      infractionsList:[],
      infractionsTransferRequestsReceived:[],
      infractionsTransferRequestsRequested:[],
    };
  }

  async getInfractionTransferListData(){
    const infractionsCount =  await this.props.contract.methods.transferTicketsCount().call()
    //console.log("Requisições de transferência: ", infractionsCount)

    // Load infraction -> WORKING
    for (var i = 0; i < infractionsCount; i++) {
      const infractionTransferList = await this.props.contract.methods.tranferTicketsRequests(i).call()
      if(infractionTransferList.currentOwnerAddress === this.props.account){
        this.setState({infractionsTransferRequestsRequested: [...this.state.infractionsTransferRequestsRequested, infractionTransferList]})
      }else if(infractionTransferList.requestedInfractorAddress === this.props.account){
        this.setState({infractionsTransferRequestsReceived: [...this.state.infractionsTransferRequestsReceived, infractionTransferList]})
      }
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
            <InfractionTransferingTable rows={this.state.infractionsTransferRequestsReceived} contract={this.props.contract} account={this.props.account} title="Requisições de transferência de infrações recebidas"></InfractionTransferingTable>
          </Box>
          <Box paddingTop={3}>
            <InfractionTransferingTable rows={this.state.infractionsTransferRequestsRequested} contract={this.props.contract} account={this.props.account} title="Requisições de transferência de infrações solicitadas"></InfractionTransferingTable>
          </Box>
        </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(InfractionTransfer);