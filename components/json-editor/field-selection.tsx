import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CheckSquare, Square } from "lucide-react";
import { SelectedFields } from "./types";

interface FieldSelectionProps {
  fields: string[];
  selectedFields: SelectedFields;
  onToggleField: (field: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  translations: {
    title: string;
    count: string;
    selectAll: string;
    deselectAll: string;
  };
}

export function FieldSelection({
  fields,
  selectedFields,
  onToggleField,
  onSelectAll,
  onDeselectAll,
  translations,
}: FieldSelectionProps) {
  return (
    <Card className="backdrop-blur-sm bg-white/50">
      <CardHeader className="space-y-1.5">
        <div className="flex items-center justify-between">
          <CardTitle>{translations.title}</CardTitle>
          <Badge variant="secondary">{translations.count}</Badge>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSelectAll}
            className="flex-1"
          >
            <CheckSquare className="h-4 w-4 mr-2" />
            {translations.selectAll}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDeselectAll}
            className="flex-1"
          >
            <Square className="h-4 w-4 mr-2" />
            {translations.deselectAll}
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <ScrollArea className="h-[calc(100vh-500px)] min-h-[400px] p-4">
        <div className="space-y-2">
          {fields.map((field) => (
            <div
              key={field}
              className="flex items-center space-x-2 rounded-lg p-2 hover:bg-gray-100 transition-colors"
            >
              <Checkbox
                id={field}
                checked={selectedFields[field]}
                onCheckedChange={() => onToggleField(field)}
              />
              <Label htmlFor={field} className="flex-1 cursor-pointer text-sm">
                {field}
              </Label>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
