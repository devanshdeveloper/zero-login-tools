"use client";

import { useState } from "react";
import { specialCharGroups, getCharUnicode } from "@/lib/engines/specialCharEngine";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SpecialCharacterPicker() {
  const [copiedChar, setCopiedChar] = useState<string | null>(null);

  const copyChar = (char: string) => {
    navigator.clipboard.writeText(char);
    setCopiedChar(char);
    setTimeout(() => setCopiedChar(null), 1500);
  };

  return (
    <div className="p-6 space-y-6">
      <p className="text-sm text-muted-foreground">
        Click any character to copy it to your clipboard. Unicode codes are shown on hover.
      </p>
      <Tabs defaultValue={specialCharGroups[0]?.name ?? "Currency"} className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-1 p-2 bg-muted/50">
          {specialCharGroups.map((g) => (
            <TabsTrigger key={g.name} value={g.name} className="text-xs">
              {g.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {specialCharGroups.map((group) => (
          <TabsContent key={group.name} value={group.name} className="mt-4">
            <div className="flex flex-wrap gap-2">
              {group.chars.map((char) => (
                <Button
                  key={char + getCharUnicode(char)}
                  variant="outline"
                  size="sm"
                  className="min-w-[48px] h-12 text-xl font-normal"
                  onClick={() => copyChar(char)}
                  title={getCharUnicode(char)}
                >
                  {copiedChar === char ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    char
                  )}
                </Button>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
