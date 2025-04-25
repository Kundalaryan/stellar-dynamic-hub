
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download } from "lucide-react";

const publications = [
  {
    id: 1,
    title: "Advancements in Neural Network Architecture for Climate Prediction",
    authors: "Zhang, J., Williams, R., Patel, S.",
    journal: "Journal of Computational Climate Science",
    year: 2023,
    doi: "10.1234/jccs.2023.001"
  },
  {
    id: 2,
    title: "Quantum Computing Applications in Cryptography: A Survey",
    authors: "Johnson, A., Martinez, C., Nguyen, T.",
    journal: "International Journal of Quantum Information",
    year: 2023,
    doi: "10.1234/ijqi.2023.015"
  },
  {
    id: 3,
    title: "Sustainable Energy Storage: Challenges and Innovations",
    authors: "Lee, M., Garcia, D., Robinson, K.",
    journal: "Renewable Energy Technology Review",
    year: 2022,
    doi: "10.1234/retr.2022.042"
  },
  {
    id: 4,
    title: "Blockchain Technology for Academic Research Data Integrity",
    authors: "Smith, P., Wilson, E., Kumar, R.",
    journal: "Journal of Data Security",
    year: 2022,
    doi: "10.1234/jds.2022.027"
  }
];

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
