
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download } from "lucide-react";
import { publications } from "@/data/publications";

const PublicationsSection = () => {
  return (
    <section id="publications" className="bg-navy-50">
      <div className="container-custom">
        <h2 className="section-title">Recent Publications</h2>
        <p className="section-subtitle">
          Our team regularly publishes research findings in leading academic journals.
        </p>

        <div className="space-y-6">
          {publications.map((pub) => (
            <Card key={pub.id} className="card-hover">
              <CardHeader>
                <CardTitle className="text-xl">{pub.title}</CardTitle>
                <CardDescription className="text-base font-medium">
                  {pub.authors}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-navy-700">
                  {pub.journal} • {pub.year}
                </p>
                <p className="text-navy-600 mt-1">DOI: {pub.doi}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-3">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Online
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <a href="#">View All Publications</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
