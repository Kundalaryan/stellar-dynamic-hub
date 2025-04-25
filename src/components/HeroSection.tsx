
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 pb-16 relative bg-gradient-to-br from-navy-50 to-blue-50"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-navy-900 leading-tight mb-6">
            Advancing Research Through
            <span className="text-primary block mt-2">Innovation & Collaboration</span>
          </h1>
          <p className="text-lg md:text-xl text-navy-700 mb-8 max-w-2xl mx-auto">
            Our interdisciplinary research team tackles complex challenges through cutting-edge technology and academic excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-6" asChild>
              <a href="#projects">
                Explore Projects <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="px-6" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-navy-800">25+</h3>
              <p className="text-navy-600">Research Projects</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-navy-800">48</h3>
              <p className="text-navy-600">Publications</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-navy-800">12</h3>
              <p className="text-navy-600">Team Members</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-navy-800">8</h3>
              <p className="text-navy-600">Academic Partners</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
