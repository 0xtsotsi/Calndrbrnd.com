/** @type {import('next').NextConfig} */
require("dotenv").config({ path: "../../.env" });

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@calndrbrnd/lib"],
};

module.exports = nextConfig;
