
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import { teamMembers } from "@/data/team";

const TeamSection = () => {
  return (
    <section id="team" className="bg-white">
      <div className="container-custom">
        <h2 className="section-title">Our Research Team</h2>
        <p className="section-subtitle">
          Meet our diverse group of researchers, scientists, and students working on groundbreaking projects.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className="text-center card-hover">
              <CardHeader className="pb-2">
                <Avatar className="h-28 w-28 mx-auto mb-3">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <CardDescription className="font-medium text-navy-600">{member.role}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-navy-700">{member.bio}</p>
              </CardContent>
              <CardFooter className="flex justify-center gap-3 pt-2">
                <Button variant="ghost" size="icon" asChild>
                  <a href={member.social.linkedin} aria-label="LinkedIn">
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={member.social.twitter} aria-label="Twitter">
                    <TwitterIcon className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={member.social.github} aria-label="GitHub">
                    <GithubIcon className="h-5 w-5" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
