"use client";

import { useMemo, useState } from "react";
import { normalizeTable, parseCsv, stringifyCsv, type CsvTable } from "../engine";
import { downloadTextFile } from "@/registry/engines/textStatsEngine";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy, Download, Plus, RefreshCw } from "lucide-react";

function makeEmptyTable(rows: number, cols: number): CsvTable {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => ""));
}

export function SpreadsheetEditor() {
  const [rawCsv, setRawCsv] = useState("name,age\nAlice,30\nBob,25");
  const [table, setTable] = useState<CsvTable>(() => normalizeTable(parseCsv("name,age\nAlice,30\nBob,25")));
  const [copied, setCopied] = useState(false);

  const csvOut = useMemo(() => stringifyCsv(normalizeTable(table)), [table]);

  const load = () => {
    setTable(normalizeTable(parseCsv(rawCsv)));
  };

  const addRow = () => {
    setTable((prev) => {
      const n = normalizeTable(prev);
      const cols = n[0]?.length ?? 1;
      return [...n, Array.from({ length: cols }, () => "")];
    });
  };

  const addCol = () => {
    setTable((prev) => normalizeTable(prev).map((row) => [...row, ""]));
  };

  const updateCell = (r: number, c: number, v: string) => {
    setTable((prev) => {
      const n = normalizeTable(prev).map((row) => row.slice());
      if (!n[r]) return n;
      n[r][c] = v;
      return n;
    });
  };

  const copyCsv = async () => {
    await navigator.clipboard.writeText(csvOut);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between h-8">
            <h3 className="text-sm font-medium text-muted-foreground">CSV input</h3>
            <Button variant="ghost" size="sm" onClick={() => setRawCsv("")}>
              Clear
            </Button>
          </div>
          <Textarea
            value={rawCsv}
            onChange={(e) => setRawCsv(e.target.value)}
            className="font-mono h-[220px] resize-none shadow-inner"
            spellCheck={false}
          />
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button onClick={load} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Load into table
            </Button>
            <Button variant="outline" onClick={() => setTable(makeEmptyTable(10, 5))} className="gap-2">
              Reset table
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            This is a lightweight CSV-based spreadsheet. For complex Excel features, use a dedicated spreadsheet app.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between h-8 bg-muted/50 px-2 rounded-md">
            <h3 className="text-sm font-medium text-muted-foreground pl-2">CSV output</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={copyCsv} className="h-7 text-xs">
                {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => downloadTextFile("sheet.csv", csvOut, "text/csv;charset=utf-8")}
                className="h-7 text-xs"
              >
                <Download className="w-3 h-3 mr-1" />
                Download
              </Button>
            </div>
          </div>
          <Textarea value={csvOut} readOnly className="font-mono h-[220px] resize-none bg-muted/30" spellCheck={false} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" onClick={addRow} className="gap-2">
          <Plus className="w-4 h-4" /> Add row
        </Button>
        <Button variant="outline" onClick={addCol} className="gap-2">
          <Plus className="w-4 h-4" /> Add column
        </Button>
      </div>

      <div className="border-2 border-border rounded-lg overflow-auto">
        <table className="min-w-full text-sm">
          <tbody>
            {normalizeTable(table).map((row, r) => (
              <tr key={r} className="border-b border-border last:border-b-0">
                {row.map((cell, c) => (
                  <td key={c} className="border-r border-border last:border-r-0 p-0">
                    <input
                      value={cell}
                      onChange={(e) => updateCell(r, c, e.target.value)}
                      className="w-full min-w-[120px] px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

