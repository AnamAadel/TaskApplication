import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { AuthContexts } from '../components/context/AuthContext';

function PrivateRoute({children}) {
    const {user} = AuthContexts();
  return (
    <>
        {user && <div>{children}</div> }
        {!user && <Navigate to="/login"></Navigate>}
        
    </>
  )
}

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.node,
  ]).isRequired,
};

export default PrivateRoute