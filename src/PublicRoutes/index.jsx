import { Navigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext/UserContext';


function PublicRoute({ children }) {
    const state = useUser()
    if (state.isLoggedIn){
        return <Navigate to='/dashboard' />
    }
        return children;
}

export default PublicRoute;