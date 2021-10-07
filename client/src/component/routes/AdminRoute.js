import { useContext } from 'react';
import {Route, Redirect} from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const AdminRoute = ({component: Component , ...rest}) => {
    const [state ] = useContext(AppContext);
    console.log("TSS",state)
    return (
        <Route
            {...rest}
            render = {(props) => {
                    if (state.isLogin === true && state.user.role === "Administrator") {
                        return <Component {...props}/>
                    } else {
                        return <Redirect to="/" 
                        /> 
                    }
                }}
        />
    );
};

export default AdminRoute;