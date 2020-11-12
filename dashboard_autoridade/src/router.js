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
import InfractionTranfer from './containers/Infractions/InfractionTransfer/index'
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
        this.checkIfUserIsAuthoritie = this.checkIfUserIsAuthoritie.bind(this);
    }

    async checkIfUserIsAuthoritie(callback){
        try{
            var authorities = this.props.authorities;
            var currentAccount = this.props.account;
            var status = await authorities.filter(authoritie => authoritie.authoritieAddress === currentAccount).length > 0;
        
            if(status){
                // It is an authoritie
                this.setState({isAuthenticaded:true})
                callback();
            }else{
                this.setState({isAuthenticaded:false});
                callback();
            }

        }catch(error){
            callback();
        }
    };

    componentDidMount(){
        this._isMounted = true;
        if(this._isMounted){

            this.checkIfUserIsAuthoritie( () => {
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
                <LoginPage account={props.account} authorities={props.authorities}></LoginPage>
            </Route>
            {/*Authenticated routes */}
            <PrivateRouteAuth account={props.account} authorities={props.authorities}>
                <MenuDrawer account={props.account}>
                    <Route exact path={DASHBOARD_BASE_URL}>
                        <InitialDashboard></InitialDashboard>
                    </Route>
                    <Route exact path={INFRACTION_LIST_PAGE_URL}>
                        <InfractionList contract={props.contract} account={props.account} ></InfractionList>
                    </Route>
                    <Route exact path={INFRACTION_REGISTER_PAGE_URL}>
                        <InfractionRegisterPage contract={props.contract} account={props.account}></InfractionRegisterPage>
                    </Route>
                    <Route exact path={DRIVER_REGISTER_PAGE_URL}>
                        <DriverRegisterPage contract={props.contract} account={props.account}></DriverRegisterPage>
                    </Route>
                    <Route exact path={DRIVER_LIST_PAGE_URL}>
                        <DriverList contract={props.contract} account={props.account}></DriverList>
                    </Route>
                    <Route exact path={AUTHORITIE_REGISTER_PAGE_URL}>
                        <AuthoritieRegisterPage contract={props.contract} account={props.account}></AuthoritieRegisterPage>
                    </Route>
                    <Route exact path={AUTHORITIE_LIST_PAGE_URL}>
                        <AuthoritieList contract={props.contract} account={props.account}></AuthoritieList>
                    </Route>
                    <Route exact path={INFRACTION_TRANSFERING_PAGE_URL}>
                        <InfractionTranfer contract={props.contract} account={props.account}></InfractionTranfer>
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
