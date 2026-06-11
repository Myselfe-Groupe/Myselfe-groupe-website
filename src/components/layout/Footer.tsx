import Link from "next/link";
import Image from "next/image";

const usefulLinks = [
	{ label: "Accueil", href: "/#accueil" },
	{ label: "Namas'Thés", href: "/#namas-thes" },
	{ label: "Contact", href: "/#contact" },
];

const legalLinks = [
	{ label: "Mentions légales", href: "/mentions-legales" },
	{ label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
];

export default function Footer() {
	return (
		<footer className="mt-auto border-t-2 border-border bg-primary text-background">
			<div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 py-12 sm:px-6 lg:grid-cols-[1.15fr_1fr_1fr_1fr_auto] lg:items-start lg:gap-12 lg:px-6">
                <div className="relative h-40 w-40 mx-auto lg:mx-0">
                    <Image
                        src="/logo/MyselfeGroupeLogo.png"
                        alt="Myselfe Groupe"
                        fill
                    />
                </div>
				<div>
					<h3 className="text-xl text-background">Contact</h3>
					<ul className="mt-4 space-y-2.5 text-xs text-background">
						<li className="flex items-start gap-2.5">
							<span aria-hidden="true" className="mt-0.5 text-border">
								<MapPinIcon />
							</span>
							<span>1 Place du Commerce, Saint-Viance</span>
						</li>
						<li className="flex items-start gap-2.5">
							<span aria-hidden="true" className="mt-0.5 text-border">
								<MailIcon />
							</span>
							<a href="mailto:sas.namastes@gmail.com" className="hover:text-border transition-colors">
								sas.namastes@gmail.com
							</a>
						</li>
						<li className="flex items-start gap-2.5">
							<span aria-hidden="true" className="mt-0.5 text-border">
								<PhoneIcon />
							</span>
							<a href="tel:+33555231016" className="hover:text-border transition-colors">
								05 55 23 10 16
							</a>
						</li>
					</ul>
				</div>

				<div>
					<h3 className="text-xl text-background">Liens utiles</h3>
					<ul className="mt-4 space-y-2 text-xs text-background">
						{usefulLinks.map((link) => (
							<li key={link.label}>
								<Link href={link.href} className="hover:text-border transition-colors">
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h3 className="text-xl text-background">Informations</h3>
					<ul className="mt-4 space-y-2 text-xs text-background">
						{legalLinks.map((link) => (
							<li key={link.label}>
								<Link href={link.href} className="hover:text-border transition-colors">
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div className="lg:justify-self-end">
					<h3 className="text-xl text-background">Suivez-nous !</h3>
					<div className="mt-4 flex items-center gap-4 text-border">
						<a
							href="https://www.instagram.com/grp.myselfe/"
							aria-label="Instagram"
							target="_blank"
							rel="noreferrer"
							className="transition-transform hover:-translate-y-0.5"
						>
							<InstagramIcon />
						</a>
						<a
							href="https://www.tiktok.com/@grp.myselfe"
							aria-label="TikTok"
							target="_blank"
							rel="noreferrer"
							className="transition-transform hover:-translate-y-0.5"
						>
							<TikTokIcon />
						</a>
					</div>
				</div>

			</div>

			<div className="border-t border-border px-6 py-4 text-center text-xs text-background sm:px-10 lg:px-12">
				<p><span className="font-semibold text-border">©</span> 2026 MySelfe Groupe. Tous droits réservés</p>
			</div>
		</footer>
	);
}

function MapPinIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path
				d="M12 22C12 22 19 15.6 19 10.5C19 6.36 15.87 3 12 3C8.13 3 5 6.36 5 10.5C5 15.6 12 22 12 22Z"
				stroke="currentColor"
				strokeWidth="1.8"
			/>
			<circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
		</svg>
	);
}

function MailIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
			<path d="M4 7L12 13L20 7" stroke="currentColor" strokeWidth="1.8" />
		</svg>
	);
}

function PhoneIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path
				d="M6.6 3H9.8L11.2 7.6L9.3 9.5C10.16 11.36 11.64 12.84 13.5 13.7L15.4 11.8L20 13.2V16.4C20 17.28 19.28 18 18.4 18C10.45 18 4 11.55 4 3.6C4 2.72 4.72 2 5.6 2H6.6V3Z"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function InstagramIcon() {
	return (
		<svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
			<circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
			<circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
		</svg>
	);
}

function TikTokIcon() {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path
				d="M14 4V13.4C14 15.4 12.4 17 10.4 17C8.63 17 7.2 15.57 7.2 13.8C7.2 12.03 8.63 10.6 10.4 10.6C10.84 10.6 11.26 10.69 11.64 10.85V7.68C11.24 7.62 10.83 7.59 10.4 7.59C6.97 7.59 4.2 10.36 4.2 13.8C4.2 17.24 6.97 20 10.4 20C13.84 20 16.6 17.24 16.6 13.8V9.66C17.67 10.53 19.02 11 20.4 11V8.02C18.16 8.02 16.32 6.2 16.32 3.95V4H14Z"
				fill="currentColor"
			/>
		</svg>
	);
}
