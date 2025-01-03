import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { Metadata } from "next";
import { locales, Locale } from "../../i18n/settings";

interface LocaleLayoutProps {
  children: ReactNode;
  params: {
    locale: Locale;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "JsonSight",
    description: "Modern JSON Editor with field filtering capabilities",
    viewport: "width=device-width, initial-scale=1",
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({
    locale,
  });

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="Europe/Helsinki"
        >
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
