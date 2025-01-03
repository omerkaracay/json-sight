/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")();

const config = {
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = withNextIntl(config);
