import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import {Dashboard} from '../_components/Dashoboard/dashboard';
// import homepage from '../_components/Homepage/homepage';

class App extends React.Component {
    constructor(props) {
        super(props);

    //     history.listen((location, action) => {
    //         // clear alert on location change
    //         this.props.clearAlerts();
    //     });
    }

    render() {
        const { alert } = this.props;
        return (
            <div>
               
                       
                        <Router history={history}>
                            <Switch>
                                {/* <Route path="/dashboard" component={Dashboard} /> */}
                                <Route path="/" component={Dashboard} />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
               
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };