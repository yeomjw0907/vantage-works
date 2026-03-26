import { Helmet } from "react-helmet-async";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  imageUrl?: string;
};

function getSiteUrl() {
  // 빌드 타임에 고정된 도메인을 강제하지 않기 위해 기본은 현재 origin 사용
  if (typeof window !== "undefined" && window.location?.origin) return window.location.origin;
  return "https://vantage-works.vercel.app";
}

export function Seo({ title, description, path = "/", imageUrl }: SeoProps) {
  const siteUrl = getSiteUrl();
  const canonical = new URL(path, siteUrl).toString();
  const ogImage = imageUrl ? new URL(imageUrl, siteUrl).toString() : undefined;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
    </Helmet>
  );
}

