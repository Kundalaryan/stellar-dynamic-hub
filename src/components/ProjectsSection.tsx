
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

// Project data
const projects = [
  {
    id: 1,
    title: "AI-Powered Data Analysis",
    description: "Using machine learning to extract insights from large-scale research datasets.",
    category: "AI",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600",
    link: "#"
  },
  {
    id: 2,
    title: "Quantum Computing Research",
    description: "Exploring quantum algorithms for solving complex computational problems.",
    category: "Quantum",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=600", 
    link: "#"
  },
  {
    id: 3,
    title: "Sustainable Energy Solutions",
    description: "Developing innovative approaches to renewable energy generation and storage.",
    category: "Energy",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
    link: "#"
  },
  {
    id: 4,
    title: "Blockchain for Research Integrity",
    description: "Implementing blockchain technology to ensure research data integrity and verification.",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
    link: "#"
  },
  {
    id: 5,
    title: "Neural Network Optimization",
    description: "Improving neural network efficiency and performance for computer vision tasks.",
    category: "AI",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600",
    link: "#"
  },
  {
    id: 6,
    title: "Biomimetic Materials",
    description: "Creating new materials inspired by natural biological structures and processes.",
    category: "Materials",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=600",
    link: "#"
  }
];

const categories = ["All", "AI", "Quantum", "Energy", "Blockchain", "Materials"];

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="projects" className="bg-white">
      <div className="container-custom">
        <h2 className="section-title">Our Research Projects</h2>
        <p className="section-subtitle">
          Explore our innovative research initiatives spanning multiple disciplines
          and technologies.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden card-hover">
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <Badge>{project.category}</Badge>
                </div>
                <CardDescription className="text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" asChild>
                  <a href={project.link}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <a href="#">View All Projects</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
