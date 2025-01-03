// src/i18n/request.ts (veya proje kök dizininde)
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Desteklenen dilleri tanımlayın
export const locales = ["tr", "en", "de", "fr"];

export default getRequestConfig(async ({ locale }) => {
  // Desteklenmeyen bir dil seçilirse
  if (!locales.includes(locale as string)) notFound();

  // İlgili dil için mesajları dinamik olarak yükle
  return {
    messages: await import(`../langs/${locale}.json`).then(
      (module) => module.default
    ),
  };
});
