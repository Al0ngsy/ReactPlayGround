import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
// Box
import Box from '@material-ui/core/Box';
// Redux
import { connect } from 'react-redux';

function Main(props) {

    // with [] -> same behaviour as compoentDidMount
    // with [val1, val2] -> do smth when those values changes
    useEffect(() => {
        // dispatch request to change value from store
        props.increase()
    // eslint-disable-next-line
    }, []) // put props inside will trigger endless loop

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Welcome To My React Playground</h1>
            <Box
                bgcolor="grey.700"
                color="white"
                p={2}
                position="absolute"
                bottom="2%"
                right="2%"
                borderRadius={16}
                zIndex="modal"
            >
                {props.count}
            </Box>
        </div>
    )
}

Main.propTypes = {
    count: PropTypes.number
}

const mapStateToProps = store => ({
    count: store.count
})

const mapDispatchToProps = dispatch => ({
    increase: (e) => dispatch({ type: 'INCREMENT' })
})

export default connect(mapStateToProps, mapDispatchToProps)(Main) 