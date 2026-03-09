"use client";

import { useState, useEffect } from "react";
import {
  generatePassword,
  PasswordOptions,
} from "@/registry/tools/crypto-gen/password-generator/engine";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Check, Copy, RefreshCw } from "lucide-react";

export function PasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPassword(generatePassword(options));
  }, [options]);

  const toggleOption = (key: keyof Omit<PasswordOptions, "length">) => {
    setOptions((prev) => {
      // Prevent unchecking the last option
      const newOpts = { ...prev, [key]: !prev[key] };
      if (
        !newOpts.uppercase &&
        !newOpts.lowercase &&
        !newOpts.numbers &&
        !newOpts.symbols
      ) {
        return prev;
      }
      return newOpts;
    });
  };

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 max-w-xl mx-auto space-y-8">
      <div className="relative">
        <Input
          value={password}
          readOnly
          className="text-2xl font-mono text-center h-16 pr-14"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </Button>
      </div>

      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={() => setPassword(generatePassword(options))}
          className="w-full gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Regenerate
        </Button>
      </div>

      <div className="space-y-6 pt-4">
        <div className="space-y-4">
          <div className="flex justify-between">
            <Label>Password Length</Label>
            <span className="font-semibold">{options.length}</span>
          </div>
          <Slider
            value={[options.length]}
            onValueChange={(val: number | readonly number[]) => {
              const num = Array.isArray(val)
                ? val[0]
                : typeof val === "number"
                  ? val
                  : options.length;
              setOptions((p) => ({ ...p, length: num }));
            }}
            min={4}
            max={64}
            step={1}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <OptionToggle
            label="Uppercase"
            value="ABC"
            active={options.uppercase}
            onClick={() => toggleOption("uppercase")}
          />
          <OptionToggle
            label="Lowercase"
            value="abc"
            active={options.lowercase}
            onClick={() => toggleOption("lowercase")}
          />
          <OptionToggle
            label="Numbers"
            value="123"
            active={options.numbers}
            onClick={() => toggleOption("numbers")}
          />
          <OptionToggle
            label="Symbols"
            value="#$&"
            active={options.symbols}
            onClick={() => toggleOption("symbols")}
          />
        </div>
      </div>
    </div>
  );
}

function OptionToggle({
  active,
  onClick,
  label,
  value,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  value: string;
}) {
  return (
    <div
      onClick={onClick}
      className={`border-2 p-4 cursor-pointer transition-all flex flex-col gap-2 ${active ? "border-border bg-primary/5 shadow-sm transform translate-y-[2px]" : "border-border bg-background opacity-60 hover:opacity-100 hover:-translate-y-1 hover:shadow-sm"}`}
    >
      <div className="font-medium">{label}</div>
      <div className="text-sm font-mono text-muted-foreground">{value}</div>
    </div>
  );
}
