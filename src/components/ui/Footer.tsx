"use client";

import React from 'react';
import { FaGithub, FaEnvelope, FaHeart, FaGraduationCap, FaDatabase, FaRobot, FaBrain } from 'react-icons/fa';
import { SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiDotnet } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const frontendStack = [
    { icon: SiNextdotjs, name: "Next.js" },
    { icon: SiReact, name: "React" },
    { icon: SiTypescript, name: "TypeScript" },
    { icon: SiTailwindcss, name: "Tailwind CSS" },
  ];

  const backendStack = [
    { icon: SiDotnet, name: ".NET Core" },
    { icon: FaDatabase, name: "SQL Server" },
    { icon: FaBrain, name: "AI Features" },
    { icon: FaRobot, name: "ML Models" },
  ];
  return (
    <footer className="relative bg-gradient-to-t from-black via-secondaryBg to-secondaryBg border-t border-border">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Project Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-foreground">CineMate</h3>
            </div>            <p className="text-textMuted text-sm leading-relaxed">
              Your ultimate movie companion for discovering, rating, and sharing your favorite films with fellow enthusiasts.
            </p>
            <div className="flex items-center gap-2 text-xs text-textMuted">
              <span>Crafted with</span>
              <FaHeart className="text-primary animate-pulse text-xs" />
              <span>by passionate developers</span>
            </div>
          </div>          {/* Contact & Links */}
          <div className="space-y-3">
            <a 
              href="#contact" 
              className="text-md font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Get in Touch
            </a>
            <div className="space-y-2">
              <a 
                href="https://github.com/Cinemate-GP"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-textMuted hover:text-foreground transition-colors duration-300 group text-sm"
              >
                <FaGithub className="text-lg group-hover:text-primary transition-colors" />
                <span>GitHub Repository</span>
              </a>
              <a 
                href="mailto:CineMateGP@gmail.com"
                className="flex items-center gap-2 text-textMuted hover:text-foreground transition-colors duration-300 group text-sm"
              >
                <FaEnvelope className="text-lg group-hover:text-primary transition-colors" />
                <span>CineMateGP@gmail.com</span>              </a>
            </div>
          </div>          {/* Frontend Tech Stack */}
          <div className="space-y-3">
            <a 
              href="#frontend" 
              className="text-md font-semibold text-foreground hover:text-primary transition-colors cursor-pointer block"
            >
              Frontend Stack
            </a>
            <div className="grid grid-cols-2 gap-2">
              {frontendStack.map((tech, index) => (
                <a
                  key={index}
                  href={`#${tech.name.toLowerCase().replace('.', '').replace(' ', '-')}`}
                  className="flex items-center gap-2 text-textMuted hover:text-foreground transition-colors duration-300 group cursor-pointer"
                >
                  <tech.icon className="text-sm group-hover:text-primary transition-colors" />
                  <span className="text-xs">{tech.name}</span>
                </a>))}
            </div>
          </div>          {/* Backend & AI Stack */}
          <div className="space-y-3">
            <a 
              href="#backend" 
              className="text-md font-semibold text-foreground hover:text-primary transition-colors cursor-pointer block"
            >
              Backend & AI
            </a>
            <div className="grid grid-cols-2 gap-2">
              {backendStack.map((tech, index) => (
                <a
                  key={index}
                  href={`#${tech.name.toLowerCase().replace('.', '').replace(' ', '-')}`}
                  className="flex items-center gap-2 text-textMuted hover:text-foreground transition-colors duration-300 group cursor-pointer"
                >
                  <tech.icon className="text-sm group-hover:text-primary transition-colors" />
                  <span className="text-xs">{tech.name}</span>
                </a>))}
            </div>
          </div>
        </div>        {/* Divider */}
        <div className="my-6 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-textMuted">
            <FaGraduationCap className="text-primary" />
            <span>© {currentYear} CineMate - Graduation Project</span>
          </div>
          
          <div className="flex items-center gap-3 text-xs text-textMuted">
            <span>Developed with passion</span>
            <div className="w-1 h-1 bg-primary rounded-full"></div>
            <span>All rights reserved</span>
            <div className="w-1 h-1 bg-primary rounded-full"></div>
            <span>Academic Excellence</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-primary/3 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
};

export default Footer;
