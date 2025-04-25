
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Annual Research Symposium",
    date: "June 15-16, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Main Campus Conference Center",
    description: "Join us for our annual research symposium featuring presentations from all our research teams and guest speakers from partner institutions.",
    type: "Conference",
    registration: true
  },
  {
    id: 2,
    title: "AI in Healthcare Workshop",
    date: "July 8, 2025",
    time: "1:00 PM - 4:00 PM",
    location: "Science Building, Room 305",
    description: "Learn about the latest applications of artificial intelligence in healthcare and medical research.",
    type: "Workshop",
    registration: true
  },
  {
    id: 3,
    title: "Guest Lecture: Quantum Computing Frontiers",
    date: "July 22, 2025",
    time: "3:00 PM - 5:00 PM",
    location: "Physics Auditorium",
    description: "Distinguished lecture by Dr. Emily Chang from Quantum Technologies Institute on recent breakthroughs in quantum computing.",
    type: "Lecture",
    registration: false
  },
  {
    id: 4,
    title: "Graduate Student Research Presentation Day",
    date: "August 5, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "Research Center, Multiple Rooms",
    description: "Our PhD and Master's students present their ongoing research projects and preliminary findings.",
    type: "Presentation",
    registration: false
  }
];

const EventsSection = () => {
  return (
    <section id="events" className="bg-navy-50">
      <div className="container-custom">
        <h2 className="section-title">Upcoming Events</h2>
        <p className="section-subtitle">
          Stay updated on our research presentations, workshops, and conferences.
        </p>

        <div className="space-y-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden card-hover">
              <div className="lg:flex">
                <div className="lg:w-72 bg-navy-100 flex flex-col justify-center items-center p-6 text-center">
                  <Calendar className="h-8 w-8 text-navy-600 mb-2" />
                  <h3 className="text-xl font-bold text-navy-800">{event.date}</h3>
                  <div className="flex items-center mt-2 text-navy-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center mt-2 text-navy-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <CardHeader>
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <Badge variant={event.type === "Conference" ? "default" : event.type === "Workshop" ? "secondary" : "outline"}>
                        {event.type}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    {event.registration ? (
                      <Button className="mr-4">Register Now</Button>
                    ) : (
                      <Button variant="outline">Add to Calendar</Button>
                    )}
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <a href="#">View All Events</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
