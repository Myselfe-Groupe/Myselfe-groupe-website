import Link from "next/link";
import Image from "next/image";

const navLinks = [
	{ label: "Accueil", href: "/#accueil" },
	{ label: "Namas'Thés", href: "/#namas-thes" },
];

export default function Navbar() {
	return (
		<header className="sticky top-0 z-50 border-b border-border bg-primary backdrop-blur-md">
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-10 lg:px-12">
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

				<Link
					href="/#contact"
					className="inline-flex items-center justify-center rounded-full border border-border bg-primary px-5 py-2 text-sm font-medium text-background transition-colors hover:opacity-90"
				>
					Nous contacter
				</Link>
			</div>
		</header>
	);
}

