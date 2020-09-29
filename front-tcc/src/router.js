import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import EstudioAcompanhePageContainer from './containers/EstudioAcompanhePageContainer';
import LoginScreen from "./containers/LoginScreenContainer";
import MenuDrawer from './containers/MenuDrawer'
import LoginPage from './containers/LoginPage'
import InitialDashboard from './containers/InitialDashboard'
import InfractionList from './containers/Infractions/InfractionList/index'
import InfractionRegisterPage from './containers/Infractions/InfractionRegister/index'
import DriverRegisterPage from './containers/Users/DriverRegister/index'
import axiosInstance from './auth/axiosApi';
import {TOKEN_VERIFY_URL, INITIAL_PAGE_URL, DASHBOARD_BASE_URL, INFRACTION_LIST_PAGE_URL,INFRACTION_REGISTER_PAGE_URL,
    DRIVER_REGISTER_PAGE_URL} from './api_urls'


class PrivateRouteAuth extends Component{
    constructor(props){
        super(props);
        this.state = {
          isAuthenticaded: false,
          isLoadingPage:"true"
        };
        this.checkIfUserIsAuthenticated = this.checkIfUserIsAuthenticated.bind(this);
    }

    async checkIfUserIsAuthenticated(callback){
        try{
            const response = await axiosInstance.post(TOKEN_VERIFY_URL, {
                token: localStorage.getItem('access_token')
            });

            if(response.status === 200){
                this.setState({isAuthenticaded:true})
            }else{
                this.setState({isAuthenticaded:false});
            }
            callback()
        }catch(error){
            callback();
        }
    };

    componentDidMount(){
        this._isMounted = true;
        if(this._isMounted){

            this.checkIfUserIsAuthenticated( () => {
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

const AppRouter = (props) => (
    <Router>
        <Switch>
            <Route exact path={INITIAL_PAGE_URL}>
                <LoginPage></LoginPage>
            </Route>
            {/*Authenticated routes */}
            <PrivateRouteAuth>
                <MenuDrawer>
                    <Route exact path={DASHBOARD_BASE_URL}>
                        <InitialDashboard></InitialDashboard>
                    </Route>
                    <Route exact path={INFRACTION_LIST_PAGE_URL}>
                        <InfractionList></InfractionList>
                    </Route>
                    <Route exact path={INFRACTION_REGISTER_PAGE_URL}>
                        <InfractionRegisterPage></InfractionRegisterPage>
                    </Route>
                    <Route exact path={DRIVER_REGISTER_PAGE_URL}>
                        <DriverRegisterPage></DriverRegisterPage>
                    </Route>
                </MenuDrawer>
            </PrivateRouteAuth>
        </Switch>
    </Router>
);

export default AppRouter
