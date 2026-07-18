export const siteConfig = {
  name: "talkLog",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  operator: "ConectaMente Labs",
  links: {
    x: process.env.NEXT_PUBLIC_X_URL ?? "https://x.com/",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/",
  },
} as const;

