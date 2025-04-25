
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 shadow-md backdrop-blur-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="#" className="flex items-center">
          <span className="text-navy-800 text-2xl font-display font-bold">
            ResearchLab
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#home"
            className="text-navy-700 hover:text-navy-900 font-medium"
          >
            Home
          </a>
          <a
            href="#projects"
            className="text-navy-700 hover:text-navy-900 font-medium"
          >
            Projects
          </a>
          <a
            href="#publications"
            className="text-navy-700 hover:text-navy-900 font-medium"
          >
            Publications
          </a>
          <a
            href="#team"
            className="text-navy-700 hover:text-navy-900 font-medium"
          >
            Team
          </a>
          <a
            href="#events"
            className="text-navy-700 hover:text-navy-900 font-medium"
          >
            Events
          </a>
          <Button size="sm" asChild>
            <a href="#contact">Contact Us</a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-5 px-4 flex flex-col gap-4 animate-fade-in">
          <a
            href="#home"
            className="text-navy-700 hover:text-navy-900 font-medium py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="#projects"
            className="text-navy-700 hover:text-navy-900 font-medium py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Projects
          </a>
          <a
            href="#publications"
            className="text-navy-700 hover:text-navy-900 font-medium py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Publications
          </a>
          <a
            href="#team"
            className="text-navy-700 hover:text-navy-900 font-medium py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Team
          </a>
          <a
            href="#events"
            className="text-navy-700 hover:text-navy-900 font-medium py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Events
          </a>
          <Button
            size="sm"
            className="mt-2"
            onClick={() => setIsMobileMenuOpen(false)}
            asChild
          >
            <a href="#contact">Contact Us</a>
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Header;
