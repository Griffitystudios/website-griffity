import Link from "next/link";
import NavOverlay from "./NavOverlay";

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface NavContact {
  email?: string;
  phones?: string[];
  address?: string;
  hours?: {
    office?: string;
    cowork?: string;
    cafe?: string;
  };
}

export interface NavSocials {
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  x?: string;
  pinterest?: string;
  whatsapp?: string;
  spotted?: string;
}

export interface NavProps {
  brandName?: string;
  illustrationSrc?: string;
  sattyaLogoSrc?: string;
  sattyaLogoTopSrc?: string;
  spaceLogos?: { src: string; alt: string }[];
  tagline?: string;
  links: NavLink[];
  className?: string;
  contact?: NavContact;
  socials?: NavSocials;
}


export default function Nav({
  brandName = "SATTYA MEDIA ARTS COLLECTIVE",
  illustrationSrc,
  sattyaLogoSrc,
  sattyaLogoTopSrc,
  spaceLogos = [],
  tagline,
  className = "",
  links,
  contact,
  socials,
}: NavProps) {
  return (
    <>
      {/*
        SEO-critical: all links rendered in static HTML, always visible to
        crawlers regardless of JS or nav open/close state.
      */}
      {/* <nav aria-label="Primary navigation" className="sr-only">
        {links.map((link) => (
          <div key={link.label}>
            {link.children ? (
              <>
                <span>{link.label}</span>
                {link.children.map((child) => (
                  <Link key={child.label} href={child.href}>
                    {child.label}
                  </Link>
                ))}
              </>
            ) : (
              <Link href={link.href}>{link.label}</Link>
            )}
          </div>
        ))}
      </nav> */}

      {/*
        NavOverlay is "use client" but still SSR'd by Next.js.
        It handles: logo color via usePathname, hamburger, GSAP, dropdowns.
      */}
      <NavOverlay
        brandName={brandName}
        illustrationSrc={illustrationSrc}
        sattyaLogoSrc={sattyaLogoSrc}
        sattyaLogoTopSrc={sattyaLogoTopSrc}
        spaceLogos={spaceLogos}
        links={links}
        contact={contact}
        socials={socials}
      />
    </>
  );
}