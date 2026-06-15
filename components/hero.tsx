'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Our Works', href: '/works' },
  { label: 'Clients', href: '/clients' },
  { label: 'Careers', href: '/careers' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact Us', href: '/contact' },
] as const;

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/' },
  { label: 'Tiktok', href: 'https://tiktok.com/' },
  { label: 'Linkedin', href: 'https://linkedin.com/' },
  { label: 'Whatsapp', href: 'https://wa.me/9779861292675' },
] as const;

const CONTACT = {
  email: 'info@griffitystudios.com',
  phones: ['+977 9861292675', '+977 9810967545'],
  address: 'Mahalaxmisthan, Lalitpur',
};

const HOURS = 'Office: Mon–Fri, 10–5';

const AWARDS = [
  { src: '/awards/best-mobile-app.png', alt: 'Best Mobile App Development Company Nepal 2025' },
  { src: '/awards/best-graphics-design.png', alt: 'Best Graphics Design Company Nepal 2025' },
  { src: '/awards/best-branding.png', alt: 'Best Branding Company Nepal 2025' },
];

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .menu-fadein {
          animation: fadeIn .25s ease-out;
        }
        .menu-slideup {
          animation: slideUp .45s both;
        }
      `}</style>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className={`${poppins.className} menu-fadein fixed inset-0 z-50 flex flex-col lg:flex-row`}
      >
        {/* LEFT PANEL */}
        <aside className="relative hidden flex-col bg-white px-12 py-10 lg:flex lg:w-[57%] xl:px-16">
          <Link href="/" onClick={onClose} className="flex select-none items-baseline tracking-tight">
            <span className="text-2xl font-bold text-neutral-900 xl:text-[28px]">GRIFFITY</span>
            <span className="text-2xl font-light text-neutral-500 xl:text-[28px]">STUDIOS</span>
          </Link>

          <div className="relative my-8 flex flex-1 items-center justify-center">
            <div className="relative h-full max-h-[560px] w-full max-w-[460px]">
              <Image
                src="/illustration.svg"
                alt="Griffity Studios team illustration"
                fill
                priority
                sizes="(max-width: 1280px) 40vw, 460px"
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex items-end justify-center gap-8 xl:gap-12">
            {AWARDS.map((award) => (
              <div key={award.alt} className="relative h-24 w-32 xl:h-28 xl:w-36">
                <Image
                  src={award.src}
                  alt={award.alt}
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </aside>

        {/* RIGHT PANEL */}
        <section className="relative flex w-full flex-1 flex-col bg-[#0B0F14] px-8 py-8 text-white sm:px-12 lg:w-[43%] lg:px-16 lg:py-10">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="absolute right-8 top-8 text-white/80 transition hover:rotate-90 hover:text-white sm:right-12 lg:right-16"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          </button>

          <nav className="mt-14 flex flex-col gap-y-3 sm:gap-y-4 lg:mt-12">
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="menu-slideup w-fit text-3xl font-medium leading-tight text-white/90 transition-all duration-200 hover:translate-x-2 hover:text-white sm:text-4xl xl:text-[42px]"
                style={{ animationDelay: `${0.06 * i + 0.1}s` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-10 text-sm">
            <InfoRow label="Hours">
              <span className="text-white/90">{HOURS}</span>
            </InfoRow>

            <InfoRow label="Contact">
              <div className="flex flex-col gap-0.5 text-white/90">
                <a href={`mailto:${CONTACT.email}`} className="transition hover:text-white">
                  {CONTACT.email}
                </a>
                {CONTACT.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="transition hover:text-white">
                    {p}
                  </a>
                ))}
                <span>{CONTACT.address}</span>
              </div>
            </InfoRow>

            <InfoRow label="Socials">
              <div className="flex flex-col gap-0.5 text-white/90">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-white"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </InfoRow>
          </div>
        </section>
      </div>
    </>
  );
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-start gap-4 border-t border-white/10 py-4">
      <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/40">{label}</span>
      <div className="text-right">{children}</div>
    </div>
  );
}
