// middleware.ts
import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n/request";

export default createMiddleware({
  locales,
  defaultLocale: "tr",
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
