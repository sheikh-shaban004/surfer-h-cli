export default function favicon() {
  return [
    {
      media: "(prefers-color-scheme: light)",
      url: "/favicon-light.ico",
      sizes: "32x32",
      type: "image/x-icon",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/favicon-dark.ico",
      sizes: "32x32",
      type: "image/x-icon",
    },
    {
      url: "/favicon.ico",
      sizes: "32x32",
      type: "image/x-icon",
    }
  ];
}
