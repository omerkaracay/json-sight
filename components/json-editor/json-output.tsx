import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Download } from "lucide-react";
import { JsonData } from "./types";

interface JsonOutputProps {
  data: JsonData[];
  onDownload: () => void;
  translations: {
    title: string;
    records: string;
    download: string;
  };
}

export function JsonOutput({
  data,
  onDownload,
  translations,
}: JsonOutputProps) {
  return (
    <Card className="backdrop-blur-sm bg-white/50">
      <CardHeader className="space-y-1.5">
        <div className="flex items-center justify-between">
          <CardTitle>{translations.title}</CardTitle>
          <Badge>{translations.records}</Badge>
        </div>
        <Button onClick={onDownload} variant="outline" className="w-full">
          <Download className="h-4 w-4 mr-2" />
          {translations.download}
        </Button>
      </CardHeader>
      <Separator />
      <CardContent>
        <ScrollArea className="h-[calc(100vh-500px)] min-h-[400px] w-full rounded-md border bg-muted p-4">
          <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
