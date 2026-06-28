import { NavProps } from "@/components/nav/Nav";

export const navConfig: NavProps = {
    brandName: "Griffity Studios",
    illustrationSrc: "/images/nav/nav-hero.png",
    griffityLogo: "/images/ui/logosattyab.png",
    sattyaLogoTopSrc: "/images/sattyaarts.png",
    tagline: "{tagline placeholder}",
    awards: [
        { src: "/images/awards/award-01.png", alt: "best mobile development" },
        // { src: "/images/awards/award-06b.png", alt: "best graphic design" },
        // { src: "/images/awards/award-07b.png", alt: "best branding" },
    ],
    links: [
        { label: "Home", href: "/" },
        //{ label: "About Us", href: "/about" },
        // { label: "Services", href: "/services" },
        // { label: "Our Works", href: "/our-works" },
        // { label: "Clients", href: "/clients" },
        { label: "Careers", href: "/careers" },
        { label: "Insights", href: "/blogs" },
        // { label: "Contact Us", href: "/contact" },
    ],
    contact: {
        email: "info@griffitystudios.com",
        phones: ["+977 9861292675", "+977 9810967545"],
        address: "Mahalaxmisthan, Lalitpur",
        hours: {
            office: "Mon–Fri, 10 am – 5 pm",
        },
    },
    socials: {
        instagram: "https://instagram.com/griffitystudios",
        tiktok: "https://www.tiktok.com/@griffitystudios",
        linkedin: "https://www.linkedin.com/company/griffitystudios",
        whatsapp: "https://wa.me/9861292675",
    },
};
