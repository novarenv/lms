import { Navigate, Outlet, useLocation, Location } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { User } from './roles';

// Define the Auth context interface
interface AuthContextType {
  user: User | null;
  // Add other auth context properties as needed
}

// Define props for RequireAuth component
interface RequireAuthProps {
  allowedRoles: string[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
  const { user } = useAuth() as AuthContextType;
  const location = useLocation() as Location;

  console.log("User", JSON.stringify(user))
  console.log("allowedRoles", JSON.stringify(allowedRoles))

  // Check if user exists and has required role
  const userHasRequiredRole = user
    ? allowedRoles.some(role => user.role.includes(role))
    : false;

  if (!user) {
    // Redirect to login if not authenticated, saving the current location
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!userHasRequiredRole) {
    // User is authenticated but doesn't have the required role
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has required role
  return <Outlet />;
};

export default RequireAuth;