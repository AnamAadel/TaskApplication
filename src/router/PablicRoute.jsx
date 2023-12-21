import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { AuthContexts } from '../components/context/AuthContext';

function PablicRoute({ children }) {
  const { user } = AuthContexts();

  return (
    <div>
      {!user && children}
      {user && <Navigate to="/" />}
    </div>
  );
}

PablicRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.node,
    
  ]).isRequired,
};

export default PablicRoute;
