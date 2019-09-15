// use are Hook Stuff
import React, { useState, useEffect } from 'react'
// Router
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
// Button
import Button from '@material-ui/core/Button';

// Route
import { App as AppPerson } from './Person/index'
import { App as AppTest } from './Test/index'
import { NotFound } from './404/index'

export default function App() {
    return (
        <div>
            <Router>
                {/** Link to Sites */}
                <Link to="/Person" style={{ textDecoration: 'none' }}>
                    <Button
                        style={{ margin: 20 }}
                        variant="contained"
                        margin="normal"
                        color="primary">
                        Person Example
                    </Button>
                </Link>

                <Link to="/Test" style={{ textDecoration: 'none' }}>
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
                        manipulation of url and no match found
                    path: is how the url update based on the choice
                    exact: only render top folder
                */}
                <Switch>
                    <Route exact path="/Person" component={AppPerson} />
                    <Route path="/Test" component={AppTest} />
                    <Route component={NotFound} />
                </Switch>

            </Router>
        </div>
    )
}
