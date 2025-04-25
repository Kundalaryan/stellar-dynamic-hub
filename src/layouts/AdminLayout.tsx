
import React from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const AdminLayout = () => {
  const { isAuthenticated, logout } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
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
