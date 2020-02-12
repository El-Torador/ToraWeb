import React from 'react'
import { Route, Redirect } from 'react-router-dom'

/**
 * SECURE ROUTER COMPONENT
 */
const ProtectedRouter = ({component: Component, ...rest}) =>{
    return (
        <Route {...rest} render={
            props =>{
                if(window.sessionStorage.getItem('ssid_learn')){
                    return <Component {...props} />
                }else{
                    return <Redirect to={
                       {
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                       }
                    } 

                    />
                }
            }
        } 

        />
            
    )
}

export default ProtectedRouter