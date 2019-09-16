// use are Hook Stuff
import React from 'react'
// Router
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
// Button
import Button from '@material-ui/core/Button';

// Route
import { Main } from './Main/'
import { App as AppPerson } from './Person/'
import { App as AppTest } from './Test/'
import { ShowTheLocation as Location} from './utils/'

export default function App() {

    return (
        <div>
            <Router>

                <Route children={() => (<Location></Location>)} />

                {/** Link to Sites */}
                <Link to="/ReactPlayGround/" style={{ textDecoration: 'none' }}>
                    <Button
                        style={{ margin: 20 }}
                        variant="contained"
                        margin="normal"
                        color="primary">
                        Home
                    </Button>
                </Link>

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

                <Link to="/ReactPlayGround/Dead" style={{ textDecoration: 'none' }}>
                    <Button
                        style={{ margin: 20 }}
                        variant="contained"
                        margin="normal"
                        color="primary">
                        Dead Link
                    </Button>
                </Link>

                {/** Conditional Rendering based on choice of link
                    Switch: give the possiblity of render 404 fallback in case of direct 
                        manipulation of url and no match found (use as main page here ;D )
                    path: is how the url match the link above
                    exact: only render top folder
                */}
                <Switch>
                    {/** Route -> component, render, children
                        component={Comp} 
                            This create a new component every render, e.g. exist component
                            unmounting, new component mounting
                            All route props (match, location and history) are available to Comp
                        render: func
                            This allows for convenient inline rendering and wrapping without the undesired remounting
                        children: func
                            Render whether the path matches the location or not
                            Still dont know how to use this
                    */}
                    <Route exact path="/ReactPlayGround/Person" component={AppPerson} />
                    <Route exact path="/ReactPlayGround/Test" component={AppTest} />
                    <Route exact path="/ReactPlayGround/" component={Main} />
                    <Redirect to="/ReactPlayGround/" />
                     
                </Switch>

            </Router>
        </div>
    )
}
