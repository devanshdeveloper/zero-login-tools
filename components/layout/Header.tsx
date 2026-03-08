import Link from "next/link";
import { Wrench } from "lucide-react";
import { categories } from "@/data/categories";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border shadow-sm bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <Wrench className="h-6 w-6" />
            <span className="font-bold sm:inline-block">ZeroLoginTools</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {categories
              .filter((c) => !c.parentId)
              .map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.id}`}
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {cat.name}
                </Link>
              ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search placeholder */}
          </div>
          <nav className="flex items-center gap-2">
            <a
              href="https://github.com/zerologintools"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium hover:underline underline-offset-4 text-muted-foreground"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
