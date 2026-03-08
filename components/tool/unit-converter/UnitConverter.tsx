"use client";

import { useState, useEffect } from "react";
import { convertUnit, units, UnitCategory } from "@/lib/engines/unitEngine";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightLeft } from "lucide-react";

export function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>("length");

  const categoryUnits = units.filter((u) => u.category === category);

  const [fromUnit, setFromUnit] = useState(categoryUnits[0].id);
  const [toUnit, setToUnit] = useState(categoryUnits[1].id);
  const [fromValue, setFromValue] = useState<string>("1");
  const [toValue, setToValue] = useState<string>("");

  useEffect(() => {
    // When category changes, reset units
    const cats = units.filter((u) => u.category === category);
    setFromUnit(cats[0].id);
    setToUnit(cats[1].id);
  }, [category]);

  useEffect(() => {
    const val = parseFloat(fromValue);
    if (!isNaN(val)) {
      const result = convertUnit(val, fromUnit, toUnit);
      // Format cleanly to avoid 1.0000000001 issues
      setToValue(parseFloat(result.toPrecision(12)).toString());
    } else {
      setToValue("");
    }
  }, [fromValue, fromUnit, toUnit]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <Tabs
        value={category}
        onValueChange={(val) => setCategory(val as UnitCategory)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4 h-12">
          <TabsTrigger value="length">Length</TabsTrigger>
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="temperature">Temp</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col md:flex-row items-center gap-6 pt-4">
        {/* From Field */}
        <div className="w-full space-y-3 p-6">
          <div className="flex justify-between items-center">
            <Label>From</Label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="bg-transparent border-0 font-medium focus:ring-0 cursor-pointer outline-none text-right"
            >
              {categoryUnits.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
          <Input
            type="number"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            className="h-16 w-full"
          />
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          className="shrink-0 w-12 h-12 flex items-center justify-center"
        >
          <ArrowRightLeft className="w-5 h-5" />
        </button>

        {/* To Field */}
        <div className="w-full space-y-3 p-6">
          <div className="flex justify-between items-center">
            <Label>To</Label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="bg-transparent border-0 font-medium focus:ring-0 cursor-pointer outline-none text-right"
            >
              {categoryUnits.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
          <Input
            type="number"
            value={toValue}
            readOnly
            className="h-16 w-full"
          />
        </div>
      </div>
    </div>
  );
}
