import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const metadata = {
  title: "Request a Tool | ZeroLoginTools",
  description: "Suggest a local utility for the ZeroLoginTools ecosystem.",
};

export default function RequestToolPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Request a Tool</h1>
          <p className="text-muted-foreground mt-2">
            Can&apos;t find what you need? We are constantly building fully
            local, offline-capable developer utilities. Let us know what to
            build next.
          </p>
        </div>

        <form className="space-y-6 bg-card border rounded-xl p-6 shadow-sm">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com (optional)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tool-name">Suggested Tool Name</Label>
            <Input
              id="tool-name"
              placeholder="e.g. YAML to JSON Converter"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">How would it work?</Label>
            <Textarea
              id="description"
              placeholder="Describe what the tool should do, the inputs, and the outputs..."
              className="min-h-[120px]"
              required
            />
          </div>

          <Button type="button" className="w-full">
            Submit Request
          </Button>
        </form>
      </div>
    </div>
  );
}
