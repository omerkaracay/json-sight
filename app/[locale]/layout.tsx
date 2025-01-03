// app/[locale]/layout.tsx
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { locales, Locale } from "@/i18n/settings";

type Props = {
  children: React.ReactNode;
  params: {
    locale: Locale; // string yerine Locale tipini kullanıyoruz
  };
};

export async function generateMetadata() {
  return {
    title: "JsonSight",
    description: "Modern JSON Editor with field filtering capabilities",
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Layout(props: Props) {
  const locale = props.params.locale;

  // Validate locale
  if (!locales.includes(locale)) {
    notFound();
  }

  // Enable static rendering
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="Europe/Helsinki"
        >
          {props.children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
