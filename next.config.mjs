import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // swcMinify: true,
  // experimental: {
  //   legacyBrowsers: false,
  // },
};
export default withNextIntl(nextConfig);
