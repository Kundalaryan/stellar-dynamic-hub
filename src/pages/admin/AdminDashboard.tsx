
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Calendar, Settings } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Team Members",
      value: "8",
      description: "Total team members",
      icon: <Users className="h-8 w-8 text-navy-600" />,
      link: "/admin/team"
    },
    {
      title: "Publications",
      value: "4",
      description: "Published papers",
      icon: <FileText className="h-8 w-8 text-navy-600" />,
      link: "/admin/publications"
    },
    {
      title: "Projects",
      value: "6",
      description: "Active projects",
      icon: <Settings className="h-8 w-8 text-navy-600" />,
      link: "/admin/projects"
    },
    {
      title: "Events",
      value: "4",
      description: "Upcoming events",
      icon: <Calendar className="h-8 w-8 text-navy-600" />,
      link: "/admin/events"
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">{stat.title}</CardTitle>
              <div className="bg-navy-100 p-2 rounded-full">{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-muted-foreground text-sm">{stat.description}</p>
              <a 
                href={stat.link} 
                className="text-navy-600 text-sm font-medium mt-2 inline-block hover:underline"
              >
                Manage
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6">Recent Activities</h2>
      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>Recent changes made to the website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-b pb-3">
              <p className="font-medium">New Publication Added</p>
              <p className="text-sm text-muted-foreground">2025-04-24 14:32</p>
            </div>
            <div className="border-b pb-3">
              <p className="font-medium">Team Member Updated</p>
              <p className="text-sm text-muted-foreground">2025-04-23 09:15</p>
            </div>
            <div className="border-b pb-3">
              <p className="font-medium">New Event Created</p>
              <p className="text-sm text-muted-foreground">2025-04-22 16:45</p>
            </div>
            <div className="border-b pb-3">
              <p className="font-medium">Project Details Modified</p>
              <p className="text-sm text-muted-foreground">2025-04-21 11:20</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
