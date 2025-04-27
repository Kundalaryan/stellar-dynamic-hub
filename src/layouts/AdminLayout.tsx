
import React from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";

// Interface for API status tracking
interface ApiStatus {
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

const AdminLayout = () => {
  const { isAuthenticated, logout } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const queryClient = useQueryClient();
  
  // For API status tracking
  const [apiStatus, setApiStatus] = useState<ApiStatus>({
    loading: false,
    error: null,
    lastUpdated: null
  });

  // Check API connection
  const checkApiConnection = async () => {
    setApiStatus(prev => ({ ...prev, loading: true }));
    try {
      await api.get('/');
      setApiStatus({
        loading: false,
        error: null,
        lastUpdated: new Date()
      });
    } catch (error) {
      setApiStatus({
        loading: false,
        error: 'API connection failed',
        lastUpdated: new Date()
      });
    }
  };

  // Check connection on mount
  useEffect(() => {
    checkApiConnection();
    // Set up periodic check (every 5 minutes)
    const interval = setInterval(checkApiConnection, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin panel",
    });
    navigate("/admin");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleRefreshData = () => {
    setApiStatus(prev => ({ ...prev, loading: true }));
    // Invalidate all queries to refresh data
    queryClient.invalidateQueries();
    checkApiConnection();
    toast({
      title: "Data refresh initiated",
      description: "Refreshing all data from the server",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden mr-2" 
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-navy-800">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          {apiStatus.loading && (
            <div className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
              Syncing...
            </div>
          )}
          {apiStatus.error && (
            <div className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
              Connection error
            </div>
          )}
          {apiStatus.lastUpdated && !apiStatus.error && !apiStatus.loading && (
            <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Connected
            </div>
          )}
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center"
            onClick={handleRefreshData}
            disabled={apiStatus.loading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${apiStatus.loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1">
        <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>
          <AdminSidebar />
        </div>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
