import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Siddhartha Katiyar",
  description: "About Siddhartha Katiyar, software engineer and security researcher.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 md:px-8 py-16 md:py-24">
      <header className="mb-12 border-b pb-8">
        <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
      </header>
      
      <div className="prose dark:prose-invert prose-lg max-w-none">
        <Image 
          src="/profile.jpeg" 
          alt="Siddhartha Katiyar" 
          width={150} 
          height={150} 
          className="rounded-full border-2 border-border object-cover mb-8"
          priority
        />
        
        <p>Hi, I'm Siddhartha Katiyar.</p>
        <p>
          I'm a software engineer and security researcher. I spend my time building scalable web applications, automating bug bounty reconnaissance, and figuring out why things break in production. This blog is my digital garden where I document my technical learnings and share my projects.
        </p>
        
        <h2>What I do</h2>
        <ul>
          <li>Software Engineering & Architecture</li>
          <li>Bug Bounty Hunting & Security Research</li>
          <li>Writing about tech</li>
        </ul>
        
        <h2>Get in touch</h2>
        <p>You can find me on the internet here:</p>
        <ul>
          <li><a href="https://github.com/siddharthakatiyar" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://x.com/siddharthakat25" target="_blank" rel="noopener noreferrer">Twitter / X</a></li>
          <li><a href="https://www.linkedin.com/in/siddharthakatiyar/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
      </div>
    </div>
  );
}
