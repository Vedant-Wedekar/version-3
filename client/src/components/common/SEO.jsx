import { Helmet } from "react-helmet-async";
import { SITE } from "../../utils/constants";

// Sets per-page title, meta description, and Open Graph tags.
export default function SEO({ title, description, image, path = "" }) {
  const fullTitle = title ? `${title} | ${SITE.name}` : SITE.name;
  const desc = description || SITE.tagline;
  const url = `https://your-domain.com${path}`; // TODO: replace with real domain

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />

      {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      {image && <meta name="twitter:image" content={image} />}

      <link rel="canonical" href={url} />
    </Helmet>
  );
}