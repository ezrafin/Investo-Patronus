/**
 * Vercel serverless function to serve manifest.json
 * This bypasses Vercel Authentication protection for the manifest file
 * which is required for PWA functionality
 * 
 * Note: If Vercel Authentication is enabled, you may need to add
 * /api/manifest to the Deployment Protection Exceptions in Vercel Dashboard
 * OR disable Vercel Authentication for production deployments
 */
export default function handler(req: any, res: any) {
  // Manifest data embedded directly to avoid file system dependencies
  const manifestData = {
    name: "INVESTOPATRONUS",
    short_name: "INVESTOPATRONUS",
    description: "Professional financial market analytics, real-time data, and expert insights",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        src: "/favicon-32.ico",
        sizes: "32x32",
        type: "image/x-icon"
      },
      {
        src: "/favicon-48.ico",
        sizes: "48x48",
        type: "image/x-icon"
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      },
      {
        src: "/investo.png",
        sizes: "463x539",
        type: "image/png"
      }
    ]
  };

  // Set proper headers for manifest
  res.setHeader('Content-Type', 'application/manifest+json');
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
  
  // Return manifest data
  res.status(200).json(manifestData);
}

