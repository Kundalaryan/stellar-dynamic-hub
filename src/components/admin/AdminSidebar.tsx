
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Calendar, 
  Settings, 
  LogOut
} from "lucide-react";

const AdminSidebar = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard className="mr-2 h-5 w-5" /> },
    { name: "Team Members", path: "/admin/team", icon: <Users className="mr-2 h-5 w-5" /> },
    { name: "Publications", path: "/admin/publications", icon: <FileText className="mr-2 h-5 w-5" /> },
    { name: "Projects", path: "/admin/projects", icon: <Settings className="mr-2 h-5 w-5" /> },
    { name: "Events", path: "/admin/events", icon: <Calendar className="mr-2 h-5 w-5" /> },
  ];

  return (
    <div className="w-64 bg-navy-800 text-white min-h-screen p-4 flex flex-col">
      <div className="p-4 mb-8">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="flex items-center px-4 py-3 rounded-lg hover:bg-navy-700 transition"
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto p-4">
        <Button 
          variant="outline" 
          className="w-full justify-start text-white hover:bg-navy-700 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
