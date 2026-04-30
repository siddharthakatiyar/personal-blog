"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { Icons } from "@/components/icons";

const routes = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 md:px-8 mx-auto">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
              siddhartha.<span className="italic font-medium">work</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`transition-colors hover:text-foreground/80 ${
                  pathname === route.href || (route.href !== "/" && pathname.startsWith(route.href))
                    ? "text-foreground"
                    : "text-foreground/60"
                }`}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile branding */}
        <div className="md:hidden flex-1 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
              siddhartha.<span className="italic font-medium">work</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                  <Icons.menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              }
            />
            <SheetContent side="left" className="w-[300px] sm:w-[400px] flex flex-col p-0 bg-background border-r">
              <div className="p-6 border-b">
                  <span className="font-bold text-lg tracking-tight">siddhartha.<span className="italic font-medium">work</span></span>
              </div>
              
              <div className="flex-1 overflow-y-auto py-6 px-4">
                <nav className="flex flex-col space-y-4">
                  {routes.map((route) => {
                    const Icon = route.href === "/" ? Icons.home : route.href === "/blog" ? Icons.blog : Icons.user;
                    return (
                      <Link
                        key={route.href}
                        href={route.href}
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg text-lg font-medium transition-all ${
                          pathname === route.href 
                            ? "bg-primary/10 text-primary" 
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {route.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="p-6 border-t bg-muted/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50">Connect</span>
                </div>
                <div className="flex gap-6">
                  <Link href="https://github.com/siddharthakatiyar" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Icons.gitHub className="h-5 w-5" />
                  </Link>
                  <Link href="https://x.com/siddharthakat25" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Icons.twitter className="h-5 w-5" />
                  </Link>
                  <Link href="https://www.linkedin.com/in/siddharthakatiyar/" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Icons.linkedin className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
