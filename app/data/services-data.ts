export const SERVICE_IMAGES = {
  "website-development": "/images/blogs/web-design-nepal-2026-guide.png",
  "web-app-development": "/images/blogs/Griffity-Studios-React-vs-Next.png",
  "mobile-app-development": "/images/awards/award-01.png",
  "pwa-development":
    "/images/blogs/custom-software-vs-off-the-shelf-Griffity-Studios.png",
  "software-development":
    "/images/blogs/custom-software-vs-off-the-shelf-Griffity-Studios.png",
  "api-development":
    "/images/blogs/Agile-Development-Explained-Griffity-Studios.png",
  "support-maintenance": "/images/img-join-us.jpg",
  "logo-design": "/images/blogs/branding-agency-nepal-why-branding-matters.png",
  "brand-guidelines":
    "/images/blogs/Griffity-Studios-Built-Powerful-Brand-Identities.png",
  "branding-consultations": "/images/blogs/branding-thumb.jpg",
  "rebranding-strategy": "/images/blogs/AI-vs-Agency-Branding-Nepal-2026.png",
  "ui-ux-design": "/images/blogs/ui-ux-design-agency-nepal-guide.png",
  "illustration-artwork": "/images/blogs/ui-design-thumb.jpg",
  "marketing-campaigns":
    "/images/blogs/Outdoor-Advertising-in-Nepal-Griffity-Studios.png",
  "social-media-management":
    "/images/blogs/Griffity-Studios-AI-in-Marketing-Software-2025.png",
  "influencer-marketing":
    "/images/blogs/Griffity-Studios-Best-Company-Nepal-2025.png",
  "content-creation":
    "/images/blogs/branding-agency-nepal-why-branding-matters.png",
  "seo-optimization": "/images/blogs/seo-nepal-beginners-guide.png",
  "digital-advertising":
    "/images/blogs/Griffity-Studios-Top-Billboard-Designs-Nepal.webp",
  photography: "/images/careers/Life_at_griffity.jpg",
  "video-production": "/images/careers/gardens.png",
  "scriptwriting-storyboarding": "/images/nav/nav-hero.png",
  "post-production": "/images/img-join-us.jpg",
  "motion-graphics":
    "/images/blogs/Griffity-Studios-Top-Billboard-Designs-Nepal.webp",
  "product-prototyping":
    "/images/blogs/custom-software-vs-off-the-shelf-Griffity-Studios.png",
  "ar-vr-models":
    "/images/blogs/Griffity-studios-Best-IT-&-Software-Company-in-Nepal-(2026).png",
  "architectural-visualization": "/images/careers/gardens.png",
  "conceptual-design-models": "/images/nav/nav-hero.png",
  "3d-rendering": "/images/blogs/ui-design-thumb.jpg",
} as const;

export type ServiceImageKey = keyof typeof SERVICE_IMAGES;

export type ServiceItem = {
  name: string;
  img: ServiceImageKey;
};

export type ServiceTab = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  items: ServiceItem[];
};

export const SERVICE_TABS: ServiceTab[] = [
  {
    id: "web-app",
    label: "WEB & APP",
    title: "WEB & APP DEVELOPMENT",
    subtitle: "PLATFORM ARCHITECTURE",
    items: [
      { name: "WEBSITE DEVELOPMENT", img: "website-development" },
      { name: "WEB APP DEVELOPMENT", img: "web-app-development" },
      { name: "MOBILE APP DEVELOPMENT", img: "mobile-app-development" },
      {
        name: "PROGRESSIVE WEB APP DEVELOPMENT",
        img: "pwa-development",
      },
      { name: "SOFTWARE DEVELOPMENT", img: "software-development" },
      { name: "API DEVELOPMENT", img: "api-development" },
      { name: "SUPPORT & MAINTENANCE", img: "support-maintenance" },
    ],
  },
  {
    id: "art-design",
    label: "ART & DESIGN",
    title: "ART & DESIGN",
    subtitle: "VISUAL IDENTITY",
    items: [
      { name: "LOGO DESIGN", img: "logo-design" },
      { name: "BRAND GUIDELINES", img: "brand-guidelines" },
      { name: "BRANDING CONSULTATIONS", img: "branding-consultations" },
      { name: "REBRANDING STRATEGY", img: "rebranding-strategy" },
      { name: "UI/UX DESIGN", img: "ui-ux-design" },
      { name: "ILLUSTRATION & ARTWORK", img: "illustration-artwork" },
    ],
  },
  {
    id: "marketing",
    label: "MARKETING & COMMUNICATION",
    title: "MARKETING & COMMUNICATION",
    subtitle: "CONTENT STRATEGY",
    items: [
      { name: "MARKETING CAMPAIGNS", img: "marketing-campaigns" },
      { name: "SOCIAL MEDIA MANAGEMENT", img: "social-media-management" },
      { name: "INFLUENCER MARKETING", img: "influencer-marketing" },
      { name: "CONTENT CREATION", img: "content-creation" },
      {
        name: "SEO & PERFORMANCE OPTIMIZATION",
        img: "seo-optimization",
      },
      { name: "DIGITAL ADVERTISING", img: "digital-advertising" },
    ],
  },
  {
    id: "production",
    label: "PRODUCTION",
    title: "PRODUCTION",
    subtitle: "STORYTELLING & MEDIA",
    items: [
      { name: "PHOTOGRAPHY", img: "photography" },
      { name: "VIDEO PRODUCTION & EDITING", img: "video-production" },
      {
        name: "SCRIPTWRITING & STORYBOARDING",
        img: "scriptwriting-storyboarding",
      },
      { name: "POST PRODUCTION SERVICES", img: "post-production" },
      { name: "MOTION GRAPHICS", img: "motion-graphics" },
    ],
  },
  {
    id: "modeling",
    label: "3D MODELING",
    title: "3D MODELING",
    subtitle: "VISUALIZATION & ARCHITECTURE",
    items: [
      { name: "PRODUCT PROTOTYPING", img: "product-prototyping" },
      { name: "AR/VR READY MODELS", img: "ar-vr-models" },
      {
        name: "ARCHITECTURAL VISUALIZATION",
        img: "architectural-visualization",
      },
      { name: "CONCEPTUAL DESIGN MODELS", img: "conceptual-design-models" },
      { name: "3D RENDERING", img: "3d-rendering" },
    ],
  },
];
