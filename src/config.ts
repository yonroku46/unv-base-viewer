const buildConfig = () => {
  const name = process.env.NEXT_PUBLIC_APP_NAME || "App";
  const copyright = process.env.NEXT_PUBLIC_COPYRIGHT || "Company Inc.";
  const defaultTitle = process.env.NEXT_DEFAULT_METADATA_TITLE || name;
  const defaultDescription = process.env.NEXT_DEFAULT_METADATA_DESCRIPTION || `${name} Service`;
  const defaultKeywords = process.env.NEXT_DEFAULT_METADATA_KEYWORDS || `${name},Web`;
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost"}${process.env.NEXT_PUBLIC_VIEW_PORT ? ':' + process.env.NEXT_PUBLIC_VIEW_PORT : ''}`;
  const apiRoot = process.env.NEXT_PUBLIC_API_ROOT || "/api";

  return {
    defaultLanguage: "ko",
    baseUrl,
    apiRoot,
    service: {
      name,
      copyright,
      metadata: {
        title: {
          absolute: defaultTitle,
          default: defaultTitle,
          template: `%s - ${name}`,
        },
        description: defaultDescription,
        keywords: defaultKeywords,
      },
    },
  };
};

export const config = buildConfig();
