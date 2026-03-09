import React from "react";
import { RegistryTool } from "@/registry/types";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers } from "lucide-react";

interface ToolChainToolbarProps {
  tool: RegistryTool;
  onChainInitiated?: () => void;
}

export function ToolChainToolbar({
  tool,
  onChainInitiated,
}: ToolChainToolbarProps) {
  if (!tool.flags.supports_chain) return null;

  return (
    <div className="flex items-center gap-2 p-3 border-t bg-muted/30">
      <Layers className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground font-medium flex-1">
        Supports Tool Chaining
      </span>
      <Button variant="outline" size="sm" onClick={onChainInitiated}>
        Chain Output <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
}
