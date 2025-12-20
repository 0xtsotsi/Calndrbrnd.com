vi.mock("@calndrbrnd/lib/next-seo.config", () => ({
  default: {
    headSeo: {
      siteName: "Calndrbrnd.com",
    },
    defaultNextSeo: {
      title: "Calndrbrnd.com",
      description: "Scheduling infrastructure for everyone.",
    },
  },
  seoConfig: {
    headSeo: {
      siteName: "Calndrbrnd.com",
    },
  },
  buildSeoMeta: vi.fn().mockReturnValue({}),
}));
