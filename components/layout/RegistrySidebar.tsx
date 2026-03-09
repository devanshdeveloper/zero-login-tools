import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getAllCategories, getToolsForCategory } from "@/registry/index";
import Link from "next/link";
import { ComponentProps } from "react";
import { Home, LogIn, User } from "lucide-react";

export function RegistrySidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const categories = getAllCategories();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Home className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">ZeroLoginTools</span>
                  <span className="text-xs text-muted-foreground">
                    Local Utilities
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {categories.map((category) => {
          const tools = getToolsForCategory(category.slug);
          if (tools.length === 0) return null;

          return (
            <SidebarGroup key={category.slug}>
              <SidebarGroupLabel>{category.name}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {tools.map((tool) => (
                    <SidebarMenuItem key={tool.slug}>
                      <SidebarMenuButton>
                        <Link href={`/tools/${tool.slug}`}>{tool.name}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link href="/login">
                <LogIn className="w-4 h-4 mr-2" />
                <span>Login</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link href="/request-tool">
                <User className="w-4 h-4 mr-2" />
                <span>Request Tool</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
