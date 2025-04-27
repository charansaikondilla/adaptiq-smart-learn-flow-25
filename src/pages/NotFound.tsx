
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const NotFound = () => {
  const { user } = useAuth();

  // Determine where to send the user based on their login status
  const redirectPath = user ? '/dashboard' : '/';

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 text-center">
      <h1 className="text-9xl font-bold text-adaptiq-300">404</h1>
      <div className="h-2 w-20 bg-adaptiq-500 my-6"></div>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Button asChild size="lg">
        <Link to={redirectPath}>
          {user ? 'Back to Dashboard' : 'Back to Home'}
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
