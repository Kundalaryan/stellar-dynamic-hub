
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-navy-50 px-4 text-center">
      <h1 className="text-7xl font-bold text-navy-800 mb-4">404</h1>
      <p className="text-2xl text-navy-700 mb-8">Page not found</p>
      <p className="text-navy-600 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Button asChild>
        <a href="/">
          <HomeIcon className="h-5 w-5 mr-2" />
          Back to Home
        </a>
      </Button>
    </div>
  );
};

export default NotFound;
