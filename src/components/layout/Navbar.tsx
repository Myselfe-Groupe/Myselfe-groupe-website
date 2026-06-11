"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
	{ label: "Accueil", href: "/#accueil" },
	{ label: "Namas'Thés", href: "/#namas-thes" },
];

export default function Navbar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 border-b border-border bg-primary backdrop-blur-md">
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-10 lg:px-12">
				<Link href="/#accueil" className="relative flex flex-col leading-none text-foreground items-center justify-center h-full">
					<Image
                        src="/logo/MyselfeGroupeLogo.png"
                        alt="Logo de Myselfe Groupe"
                        width={60}
                        height={60}
                        className=""
                    />
				</Link>

				<nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
					{navLinks.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							className="relative inline-block pb-1 text-sm font-medium text-background transition-colors hover:opacity-90 group"
						>
							{link.label}
							<span className="absolute left-0 bottom-0 h-[0.05rem] w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
						</Link>
					))}
				</nav>

				<div className="flex items-center gap-2 md:gap-4">
					<Link
						href="/#contact"
						className="inline-flex items-center justify-center rounded-full border border-border bg-primary p-2 text-sm font-medium text-background transition-colors hover:opacity-90 md:px-5 md:py-2"
					>
						<span className="md:hidden" aria-hidden="true">
							<MailIcon />
						</span>
						<span className="hidden md:inline">Nous contacter</span>
					</Link>

					<button
						type="button"
						className="inline-flex items-center justify-center rounded-full border border-border bg-primary p-2 text-background transition-colors hover:opacity-90 md:hidden"
						aria-label="Ouvrir le menu"
						aria-expanded={isMobileMenuOpen}
						onClick={() => setIsMobileMenuOpen((value) => !value)}
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<path d="M4 7H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
							<path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
							<path d="M4 17H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
						</svg>
					</button>
				</div>
			</div>

			<div className={`md:hidden overflow-hidden border-t border-border/60 bg-primary transition-[max-height,opacity] duration-300 ${isMobileMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
				<nav className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-3 sm:px-10" aria-label="Navigation mobile">
					{navLinks.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							onClick={() => setIsMobileMenuOpen(false)}
							className="rounded-xl px-3 py-3 text-sm font-medium text-background transition-colors hover:bg-white/5"
						>
							{link.label}
						</Link>
					))}
				</nav>
			</div>
		</header>
	);
}

function MailIcon() {
	return (
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
			<path d="M4 7L12 13L20 7" stroke="currentColor" strokeWidth="1.8" />
		</svg>
	);
}
