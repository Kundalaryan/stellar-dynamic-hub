
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MailIcon, PhoneIcon, MapPinIcon, ClockIcon } from "lucide-react";

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would handle form submission here
    console.log("Form submitted");
    // Display success toast or message
  };

  return (
    <section id="contact" className="bg-white">
      <div className="container-custom">
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-subtitle">
          Have questions about our research or interested in collaboration? We'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="How can we help you?" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Send Message
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Ways to reach our research team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <MapPinIcon className="h-5 w-5 text-navy-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-navy-600">
                      123 University Avenue<br />
                      Research Park, Building 4<br />
                      Anytown, ST 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MailIcon className="h-5 w-5 text-navy-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-navy-600">research@example.edu</p>
                    <p className="text-navy-600">collaborations@example.edu</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <PhoneIcon className="h-5 w-5 text-navy-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-navy-600">Main Office: (555) 123-4567</p>
                    <p className="text-navy-600">Lab: (555) 987-6543</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <ClockIcon className="h-5 w-5 text-navy-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Office Hours</h3>
                    <p className="text-navy-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="text-navy-600">Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="h-64 bg-gray-200 rounded-lg">
              {/* In a real implementation, embed a map here */}
              <div className="w-full h-full flex items-center justify-center text-navy-600">
                Interactive Map Would Be Displayed Here
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
