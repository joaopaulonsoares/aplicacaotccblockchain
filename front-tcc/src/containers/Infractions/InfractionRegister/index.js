
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import InfractionRegisterForm from '../../../components/Infractions/InfractionRegisterForm/index.js'

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


class InfractionRegisterPage extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      openSnackBar: false,
      snackBarMessageError: "",
    };
  }

  componentDidMount() {
    this._isMounted = true;
    /*
    if(this._isMounted){
      // If we need to wait for something to full render before render the page
      this.checkIfUserIsAuthenticaded(() => {
          this.setState({isLoadingPage:false});
      });
    }
    */
    this.setState({ isLoadingPage: false });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleCloseSnackBar() {
    this.openSnackBar = false;
  }

  render() {

    return (
      <React.Fragment>
          <Box>
            <InfractionRegisterForm contract={this.props.contract} account={this.props.account}></InfractionRegisterForm>
          </Box>
        </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(InfractionRegisterPage);