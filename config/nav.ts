import { NavProps } from "@/components/nav/Nav";

export const navConfig: NavProps = {
    brandName: "SATTYA MEDIA ARTS COLLECTIVE",
    illustrationSrc: "/images/ui/sattys-illu3.png",
    sattyaLogoSrc: "/images/ui/logosattyab.png",
    sattyaLogoTopSrc: "/images/sattyaarts.png",
    tagline: "{tagline placeholder}",
    spaceLogos: [
        { src: "/images/makerspace/logob.png", alt: "Maker Art Space" },
        { src: "/images/cologob.png", alt: "CoWork" },
        { src: "/images/stay/logoblack.png", alt: "Stay" },
        { src: "/images/loft/logob.png", alt: "Loft" },
        { src: "/images/artcafe/logob.png", alt: "Art Cafe" },
        { src: "/images/podlab/logob.png", alt: "Pod Lab" },
    ],
    links: [
        { label: "Home", href: "/" },
        { label: "Calendar", href: "/calendar" },
        {
            label: "Spaces",
            href: "/spaces",
            children: [
                { label: "Art Cafe", href: "/artcafe" },
                { label: "Makerspace", href: "/makerspace" },
                { label: "CoWork", href: "/cowork" },
                { label: "Pod Lab", href: "/podlab" },

                { label: "Loft", href: "/loft" },
                { label: "Roof", href: "/roof" },
            ],
        },
        { label: "Programs", href: "/programs" },
        { label: "Stay @ Sattya", href: "/stay" },
        { label: "Spotted", href: "/spotted" },
        { label: "Get Involved", href: "/get-involved" },
        { label: "About", href: "/about" },
    ],
    contact: {
        email: "collective@sattya.org",
        phones: ["9709119138 (mobile)", "9709119136 (office)"],
        address: "Jawalakhel, Lalitpur",
        hours: {
            office: "Mon–Wed, 10–5",
            cowork: "Daily, 10–8",
            cafe: "Daily, 10–8",
        },
    },
    socials: {
        instagram: "https://instagram.com/sattyacollective",
        tiktok: "https://www.tiktok.com/@sattyacollective",
        youtube: "https://www.youtube.com/@SattyaCollective",
        whatsapp: "https://wa.me/9709119138",
        spotted: "https://spottedbysattya.substack.com",
    },
};