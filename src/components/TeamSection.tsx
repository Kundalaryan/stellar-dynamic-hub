
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Director & Principal Investigator",
    bio: "Leading researcher in AI and computational neuroscience with over 15 years of experience.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    id: 2,
    name: "Prof. Michael Rodriguez",
    role: "Senior Researcher",
    bio: "Quantum computing expert with research focus on algorithm development and error correction.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    id: 3,
    name: "Dr. Aisha Patel",
    role: "Research Scientist",
    bio: "Specializes in renewable energy systems and sustainable technology development.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    role: "Research Scientist",
    bio: "Expert in blockchain technology and cryptography for secure systems.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    id: 5,
    name: "Emma Thompson",
    role: "PhD Student",
    bio: "Researching neural network architectures for computer vision applications.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    id: 6,
    name: "David Kim",
    role: "PhD Student",
    bio: "Focusing on biomimetic materials and their applications in engineering.",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    id: 7,
    name: "Sophia Martinez",
    role: "Research Assistant",
    bio: "Working on machine learning models for climate data analysis.",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    id: 8,
    name: "Robert Lee",
    role: "Research Assistant",
    bio: "Specializing in data visualization and computational analysis techniques.",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  }
];

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
