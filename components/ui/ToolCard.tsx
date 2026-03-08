import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  isNew?: boolean;
  isPopular?: boolean;
  actionText?: string;
}

export function ToolCard({
  title,
  description,
  href,
  isNew,
  isPopular,
  actionText = "Use Tool",
}: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between p-6 h-full bg-card border-2 border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all active:translate-y-0 active:shadow-sm"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="group-hover:text-blue-600 dark:group-hover:text-blue-400 text-xl font-bold">
            {title}
          </h3>
          {isNew && <Badge variant="outline">New</Badge>}
          {isPopular && !isNew && <Badge variant="outline">Popular</Badge>}
        </div>
        <p className="line-clamp-2 mb-4 text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
        {actionText} <span className="ml-1">→</span>
      </div>
    </Link>
  );
}
