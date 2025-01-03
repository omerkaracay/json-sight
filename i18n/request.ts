import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "./settings";

export default getRequestConfig(async ({ locale }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../langs/${locale}.json`)).default,
    locale: locale,
  };
});
