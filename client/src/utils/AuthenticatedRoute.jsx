import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const AuthenticatedRoute = (props) => {

    const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

    if (isAuthenticated) return props.children
    return <Navigate to='/login' />

}
