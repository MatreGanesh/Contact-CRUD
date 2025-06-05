import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function RefrshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            if (location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/SignUp'
            ) {
                navigate('/ContactList', { replace: false });
            }
        } else {
            setIsAuthenticated(false);
            // Redirect to login if there's no token
            if (location.pathname !== '/login' && location.pathname !== '/SignUp') {
                navigate('/login', { replace: true });
            }
        }
    }, [location, navigate, setIsAuthenticated])

    return null;
}
