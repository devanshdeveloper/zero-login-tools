import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { RegistrySidebar } from "@/components/layout/RegistrySidebar";
import { ReactNode } from "react";

export default function ToolViewLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <RegistrySidebar />
      <main className="w-full flex-1 relative min-h-screen max-w-full overflow-hidden">
        <div className="p-4 border-b flex items-center bg-background/50 backdrop-blur sticky top-0 z-40 lg:hidden">
          <SidebarTrigger />
          <span className="font-semibold ml-4">Tools Navigation</span>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
