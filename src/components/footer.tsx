import Link from "next/link";
import { Newsletter } from "@/components/newsletter";
import { Icons } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t py-12 bg-background relative z-10 snap-start">
      <div className="container px-4 md:px-8 mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-bold mb-4 text-lg">siddhartha.<span className="italic font-medium">work</span></h3>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed max-w-sm">
              SDE at Jsmon &middot; Competitive Programmer &middot; Writing about systems, databases, and AI engineering
            </p>
            <div className="flex space-x-6">
              <a 
                href="https://github.com/siddharthakatiyar" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Icons.gitHub className="h-5 w-5" />
              </a>
              <a 
                href="https://x.com/siddharthakat25" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Icons.twitter className="h-[18px] w-[18px]" />
              </a>
              <a 
                href="https://www.linkedin.com/in/siddharthakatiyar/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Icons.linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground">Home</Link></li>
              <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
              <li><Link href="/about" className="hover:text-foreground">About</Link></li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-bold mb-4">Subscribe to my newsletter</h3>
            <p className="text-muted-foreground text-sm mb-4 max-w-xs">
              Get an email whenever I write a new post. No spam, ever.
            </p>
            <Newsletter />
          </div>
        </div>
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Siddhartha Katiyar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
