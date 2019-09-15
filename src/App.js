// use are Hook Stuff
import React, { useState, useEffect } from 'react'
// Router
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
// Button
import Button from '@material-ui/core/Button';

// Route
import { Main } from './Main/index'
import { App as AppPerson } from './Person/index'
import { App as AppTest } from './Test/index'

export default function App() {

    return (
        <div>
            <Router>
                {/** Link to Sites */}
                <Link to="/ReactPlayGround/Person" style={{ textDecoration: 'none' }}>
                    <Button
                        style={{ margin: 20 }}
                        variant="contained"
                        margin="normal"
                        color="primary">
                        Person Example
                    </Button>
                </Link>

                <Link to="/ReactPlayGround/Test" style={{ textDecoration: 'none' }}>
                    <Button
                        style={{ margin: 20 }}
                        variant="contained"
                        margin="normal"
                        color="primary">
                        Test Example
                    </Button>
                </Link>

                {/** Conditional Rendering based on choice of link
                    Switch: give the possiblity of render 404 fallback in case of direct 
                        manipulation of url and no match found (use as main page here ;D )
                    path: is how the url match the link above
                    exact: only render top folder
                */}
                <Switch>  
                    <Route path="/ReactPlayGround/Person" component={AppPerson} />
                    <Route path="/ReactPlayGround/Test" component={AppTest} />
                    <Route component={Main} />
                </Switch>

            </Router>
        </div>
    )
}
