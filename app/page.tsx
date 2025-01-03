"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Download, Upload, CheckSquare, Square } from "lucide-react";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [selectedFields, setSelectedFields] = useState<{
    [key: string]: boolean;
  }>({});
  const [allFields, setAllFields] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);

        if (!Array.isArray(json)) {
          alert(
            "Yüklenen JSON verisinin bir dizi (array) olması gerekmektedir."
          );
          return;
        }

        setData(json);

        const fieldSet = new Set<string>();
        json.forEach((item: any) => {
          Object.keys(item).forEach((key) => {
            fieldSet.add(key);
          });
        });

        const fieldsArray = Array.from(fieldSet);

        const initialSelectedFields: { [key: string]: boolean } = {};
        fieldsArray.forEach((key) => {
          initialSelectedFields[key] = true;
        });

        setAllFields(fieldsArray);
        setSelectedFields(initialSelectedFields);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        alert(
          "Geçersiz JSON dosyası. Lütfen doğru formatta bir JSON dosyası yükleyin."
        );
      }
    };
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0]);
    }
  };

  const toggleField = (field: string) => {
    setSelectedFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const selectAllFields = () => {
    const newSelectedFields: { [key: string]: boolean } = {};
    allFields.forEach((field) => {
      newSelectedFields[field] = true;
    });
    setSelectedFields(newSelectedFields);
  };

  const deselectAllFields = () => {
    const newSelectedFields: { [key: string]: boolean } = {};
    allFields.forEach((field) => {
      newSelectedFields[field] = false;
    });
    setSelectedFields(newSelectedFields);
  };

  const filteredData = data.map((item) => {
    const filteredItem: { [key: string]: any } = {};
    allFields.forEach((key) => {
      if (selectedFields[key] && key in item) {
        filteredItem[key] = item[key];
      }
    });
    return filteredItem;
  });

  const downloadJSON = () => {
    const jsonString = JSON.stringify(filteredData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "filtered_data.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">JSON Editor</h1>
          <p className="text-muted-foreground">
            JSON dosyanızı yükleyin, alanları seçin ve düzenlenmiş veriyi
            indirin
          </p>
        </div>

        {/* Upload Card */}
        <Card className="border-dashed">
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
                      JSON Dosyası Seçin
                    </span>
                    <span className="text-sm text-muted-foreground">
                      veya sürükleyip bırakın
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    JSON formatında dosya (.json)
                  </p>
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </Label>
            </div>
          </CardContent>
        </Card>

        {data.length > 0 && (
          <div className="grid gap-6 md:grid-cols-[350px,1fr]">
            {/* Left Panel - Field Selection */}
            <Card>
              <CardHeader className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <CardTitle>Görünür Alanlar</CardTitle>
                  <Badge variant="secondary">{allFields.length} alan</Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={selectAllFields}
                    className="flex-1"
                  >
                    <CheckSquare className="h-4 w-4 mr-2" />
                    Hepsini Seç
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={deselectAllFields}
                    className="flex-1"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Hiçbirini Seçme
                  </Button>
                </div>
              </CardHeader>
              <Separator />
              <ScrollArea className="h-[400px] p-4">
                <div className="space-y-2">
                  {allFields.map((field) => (
                    <div
                      key={field}
                      className="flex items-center space-x-2 rounded-lg p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Checkbox
                        id={field}
                        checked={selectedFields[field]}
                        onCheckedChange={() => toggleField(field)}
                      />
                      <Label
                        htmlFor={field}
                        className="flex-1 cursor-pointer text-sm"
                      >
                        {field}
                      </Label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            {/* Right Panel - JSON Output */}
            <Card>
              <CardHeader className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <CardTitle>JSON Çıktısı</CardTitle>
                  <Badge>{data.length} kayıt</Badge>
                </div>
                <Button
                  onClick={downloadJSON}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  JSON Dosyası İndir
                </Button>
              </CardHeader>
              <Separator />
              <CardContent>
                <ScrollArea className="h-[400px] w-full rounded-md border bg-muted p-4">
                  <pre className="text-sm">
                    {JSON.stringify(filteredData, null, 2)}
                  </pre>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
