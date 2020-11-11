import React, { Component, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import MenuDrawer from './containers/MenuDrawer'
import LoginPage from './containers/LoginPage'
import InitialDashboard from './containers/InitialDashboard'
import InfractionList from './containers/Infractions/InfractionList/index'
import InfractionRegisterPage from './containers/Infractions/InfractionRegister/index'
import DriverRegisterPage from './containers/Users/DriverRegister/index'
import DriverList from './containers/Users/DriverList/index'
import AuthoritieRegisterPage from './containers/Users/AuthoritieRegister/index'
import InfractionTransfer from './containers/Infractions/InfractionTransfer/index'
import AuthoritieList from './containers/Users/AuthoritieList/index'
import InfractionCancel from './containers/Infractions/InfractionCancel/index'
import { INITIAL_PAGE_URL, DASHBOARD_BASE_URL, INFRACTION_LIST_PAGE_URL,INFRACTION_REGISTER_PAGE_URL,
    DRIVER_REGISTER_PAGE_URL, DRIVER_LIST_PAGE_URL, AUTHORITIE_REGISTER_PAGE_URL, AUTHORITIE_LIST_PAGE_URL,INFRACTION_TRANSFERING_PAGE_URL,
    INFRACTION_CANCEL_PAGE_URL} from './api_urls'


class PrivateRouteAuth extends Component{
    constructor(props){
        super(props);
        this.state = {
          isAuthenticaded: false,
          isLoadingPage:"true"
        };
        this.checkIfUserIsRegisteredDriver = this.checkIfUserIsRegisteredDriver.bind(this);
    }

    async checkIfUserIsRegisteredDriver(callback){
        try{
            var currentAccount = this.props.account;
            const status =  await this.props.contract.methods.checkIfDriverIsRegisteredByAddress(currentAccount).call()
            if(status){
                // It is an authoritie
                this.setState({isAuthenticaded:true})
                callback();
            }
        }catch(error){
            console.log(error)
            callback();
        }
    };

    componentDidMount(){
        this._isMounted = true;
        if(this._isMounted){
            this.checkIfUserIsRegisteredDriver( () => {
                this.setState({isLoadingPage:false})
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render(){
        const children = this.props.children;

        //Wait until all informations be fetch until continue
        if(this.state.isLoadingPage) {
            return null;
        }

        return(
            <div>
                {this.state.isAuthenticaded ? children : <Redirect to={"/"} /> }
            </div>
        );
    }

}

function AppRouter(props){


    useEffect(() => {

      }, [props])

    //console.log(props)
    return(
        <Router>
        <Switch>
            <Route exact path={INITIAL_PAGE_URL}>
                <LoginPage contract={props.contract} account={props.account}></LoginPage>
            </Route>
            {/*Authenticated routes */}
            <PrivateRouteAuth contract={props.contract} account={props.account} authorities={props.authorities}>
                <MenuDrawer account={props.account}>
                    <Route exact path={DASHBOARD_BASE_URL}>
                        <InitialDashboard></InitialDashboard>
                    </Route>
                    <Route exact path={INFRACTION_LIST_PAGE_URL}>
                        <InfractionList contract={props.contract} account={props.account} ></InfractionList>
                    </Route>
                    <Route exact path={AUTHORITIE_LIST_PAGE_URL}>
                        <AuthoritieList contract={props.contract} account={props.account}></AuthoritieList>
                    </Route>
                    <Route exact path={INFRACTION_TRANSFERING_PAGE_URL}>
                        <InfractionTransfer contract={props.contract} account={props.account}></InfractionTransfer>
                    </Route>
                    <Route exact path={INFRACTION_CANCEL_PAGE_URL}>
                        <InfractionCancel contract={props.contract} account={props.account}></InfractionCancel>
                    </Route>
                </MenuDrawer>
            </PrivateRouteAuth>
        </Switch>
    </Router>

    );
}


export default AppRouter
