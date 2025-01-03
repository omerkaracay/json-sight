"use client";

import { useState, ChangeEvent } from "react";
import { useTranslations } from "next-intl";

import { Header } from "@/components/layout/header";
import { UploadCard } from "@/components/json-editor/upload-card";
import { FieldSelection } from "@/components/json-editor/field-selection";
import { JsonOutput } from "@/components/json-editor/json-output";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  const t = useTranslations();
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
          alert(t("errors.arrayRequired"));
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
      } catch (error) {
        alert(t("errors.invalidFormat"));
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
    <div className="relative min-h-screen flex flex-col">
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <Header title={t("title")} subtitle={t("subtitle")} />

            <UploadCard
              onFileChange={handleFileChange}
              translations={{
                title: t("upload.title"),
                subtitle: t("upload.subtitle"),
                format: t("upload.format"),
              }}
            />

            {data.length > 0 && (
              <div className="grid gap-6 md:grid-cols-[350px,1fr]">
                <FieldSelection
                  fields={allFields}
                  selectedFields={selectedFields}
                  onToggleField={toggleField}
                  onSelectAll={selectAllFields}
                  onDeselectAll={deselectAllFields}
                  translations={{
                    title: t("fields.title"),
                    count: t("fields.count", { count: allFields.length }),
                    selectAll: t("fields.selectAll"),
                    deselectAll: t("fields.deselectAll"),
                  }}
                />

                <JsonOutput
                  data={filteredData}
                  onDownload={downloadJSON}
                  translations={{
                    title: t("output.title"),
                    records: t("output.records", { count: data.length }),
                    download: t("output.download"),
                  }}
                />
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
