import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Suwave",
    short_name: "Suwave",
    description: "Marketplace Suwave para comprar, vender e encontrar serviços.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/suwave-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/suwave-icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
