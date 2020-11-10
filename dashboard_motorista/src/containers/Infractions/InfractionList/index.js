
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import InfractionListTable from '../../../components/Infractions/InfractionListTable/index.js'
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


class InfractionList extends Component {
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

  async getInfractionListData(){
    const infractionsCount =  await this.props.contract.methods.ticketsCount().call()
    //console.log("Infrações Registradas page: ", infractionsCount)

    // Load infraction -> WORKING
    for (var i = 0; i < infractionsCount; i++) {
      const authoritie = await this.props.contract.methods.tickets(i).call()
      this.setState({
        infractionsList: [...this.state.infractionsList, authoritie]
      })
    }
    //console.log("Lista de infrações")
    //console.log(this.state.infractionsList)
    this.setState({isFetchingInfo:false});
  }

  componentDidMount() {
    this._isMounted = true;
    this.getInfractionListData()
    
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
            <InfractionListTable rows={this.state.infractionsList} contract={this.props.contract} account ={this.props.account}></InfractionListTable>
          </Box>
        </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(InfractionList);