import { useContext } from 'react';
import {Route, Redirect} from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const PrivateRoute = ({component: Component, ...rest}) => {
    const [ state ] = useContext(AppContext);
   
    return (
        <Route
            {...rest}
            render = {(props) => (state.isLogin ? <Component {...props}/> :<Redirect to="/" /> 
            )}
                
        />
    );
};

export default PrivateRoute;