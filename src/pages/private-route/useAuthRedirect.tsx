import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomJwtPayload } from '../user-profile/UserProfile';
import { jwtDecode } from 'jwt-decode';

const useAuthRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkTokenExpiration = () => {
            const token = localStorage.getItem("token");
            if (token) {
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp) {
                    if (decodedToken.exp < currentTime) {
                        localStorage.removeItem("token");
                        navigate('/login');
                    }
                }
            } else {
                navigate('/login');
            }
        };

        checkTokenExpiration();
        
        const interval = setInterval(checkTokenExpiration, 60000);

        return () => clearInterval(interval);
    }, [navigate]);
};

export default useAuthRedirect;
