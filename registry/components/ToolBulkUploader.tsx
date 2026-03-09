import React from "react";
import { RegistryTool } from "@/registry/types";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileArchive } from "lucide-react";

interface ToolBulkUploaderProps {
  tool: RegistryTool;
  onBulkUpload?: (files: FileList) => void;
}

export function ToolBulkUploader({
  tool,
  onBulkUpload,
}: ToolBulkUploaderProps) {
  if (!tool.flags.supports_batch) return null;

  return (
    <div className="flex items-center gap-3 p-4 border border-dashed rounded-lg bg-muted/10 mb-4">
      <FileArchive className="w-6 h-6 text-primary" />
      <div className="flex-1">
        <h4 className="text-sm font-semibold">Bulk Processing Available</h4>
        <p className="text-xs text-muted-foreground">
          Upload multiple files to process them sequentially or in parallel.
        </p>
      </div>
      <div>
        <Button
          variant="secondary"
          size="sm"
          className="cursor-pointer"
          onClick={() =>
            document.getElementById(`bulk-upload-${tool.slug}`)?.click()
          }
        >
          <UploadCloud className="w-4 h-4 mr-2" /> Upload ZIP/Files
        </Button>
        <input
          id={`bulk-upload-${tool.slug}`}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files && onBulkUpload) {
              onBulkUpload(e.target.files);
            }
          }}
        />
      </div>
    </div>
  );
}
