import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-12 bg-muted/20">
      <div className="container px-4 md:px-8 mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">Siddhartha<span className="text-muted-foreground">.dev</span></h3>
            <p className="text-muted-foreground text-sm mb-4">
              Software engineer writing about dev things, especially when they break in production.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/siddharthakatiyar" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                GitHub
              </a>
              <a href="https://x.com/siddharthakat25" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                Twitter
              </a>
              <a href="https://www.linkedin.com/in/siddharthakatiyar/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                LinkedIn
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground">Home</Link></li>
              <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
              <li><Link href="/about" className="hover:text-foreground">About</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Subscribe to my newsletter</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get an email whenever I write a new post. No spam, ever.
            </p>
            <form action={`https://buttondown.com/api/emails/embed-subscribe/siddharthakatiyar`} method="post" target="popupwindow" onSubmit={(e) => window.open('https://buttondown.com/siddharthakatiyar', 'popupwindow')} className="flex gap-2">
              <input 
                type="email" 
                name="email" 
                placeholder="you@example.com" 
                required 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <input type="hidden" value="1" name="embed" />
              <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Siddhartha Katiyar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
