import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { ChangeEvent } from "react";

interface UploadCardProps {
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  translations: {
    title: string;
    subtitle: string;
    format: string;
  };
}

export function UploadCard({ onFileChange, translations }: UploadCardProps) {
  return (
    <Card className="border-dashed backdrop-blur-sm bg-white/50">
      <CardContent className="pt-6">
        <div className="flex items-center justify-center">
          <Label
            htmlFor="file-upload"
            className="relative cursor-pointer bg-white px-6 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors w-full"
          >
            <div className="space-y-3 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex flex-col items-center">
                <span className="font-semibold text-primary">
                  {translations.title}
                </span>
                <span className="text-sm text-muted-foreground">
                  {translations.subtitle}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {translations.format}
              </p>
            </div>
            <Input
              id="file-upload"
              type="file"
              accept=".json"
              onChange={onFileChange}
              className="hidden"
            />
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}
