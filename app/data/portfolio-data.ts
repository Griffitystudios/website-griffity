export type PortfolioItem = {
    id: string;
    category: string;
    title: string;
    image: string;
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
    {
        id: "griffity-magazine",
        category: "BRANDING",
        title: "Griffity Magazine",
        image: "/images/blogs/Griffity-Studios-Built-Powerful-Brand-Identities.png",
    },
    {
        id: "outdoor-campaign",
        category: "MARKETING",
        title: "Outdoor Campaign",
        image: "/images/blogs/Outdoor-Advertising-in-Nepal-Griffity-Studios.png",
    },
    {
        id: "brand-identity",
        category: "BRANDING",
        title: "Brand Identity System",
        image: "/images/blogs/branding-agency-nepal-why-branding-matters.png",
    },
    {
        id: "web-platform",
        category: "WEB & APP",
        title: "Digital Platform",
        image: "/images/blogs/web-design-nepal-2026-guide.png",
    },
    {
        id: "ui-experience",
        category: "ART & DESIGN",
        title: "UI Experience Design",
        image: "/images/blogs/ui-ux-design-agency-nepal-guide.png",
    },
    {
        id: "billboard-series",
        category: "PRODUCTION",
        title: "Billboard Series",
        image: "/images/blogs/Griffity-Studios-Top-Billboard-Designs-Nepal.webp",
    },
];
