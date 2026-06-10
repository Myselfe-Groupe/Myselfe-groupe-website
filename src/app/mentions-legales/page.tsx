import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "MySelfe Groupe - Mentions légales",
	description: "Mentions légales du site MySelfe Groupe.",
};

const sections = [
	{
		title: "Éditeur du site",
		description: "Le présent site est édité par la société porteuse de l'enseigne commerciale commune :",
		items: [
			"Dénomination sociale / Raison sociale : NAMAS'THES",
			"Forme juridique : Société par Actions Simplifiée (SAS)",
			"Capital social : 5 000,00 € (fixe)",
			"Siège social : AU BOURG 19240 SAINT-VIANCE",
			"Numéro de SIRET : 990 138 562 00022",
			"Numéro de RCS : Brive-la-Gaillarde B 990 138 562 00022",
			"Numéro de TVA intracommunautaire : FR24 990 138 562",
			"Adresse e-mail : sas.namastes@gmail.com",
			"Numéro de téléphone : 05 55 23 10 16",
		],
	},
	{
		title: "Directrice de publication",
		items: ["Alexandra Verlhac"],
	},
	{
		title: "Organisation et Indépendance des Établissements",
		description: "L'appellation 'Myselfe Groupe' désigne une enseigne commerciale commune et un regroupement d'établissements. Ce nom ne constitue pas une entité juridique autonome. Chaque établissement présenté sur ce site dispose de sa propre existence juridique et est exploité de manière indépendante par sa société respective :",
		items: ["NAMAS'THES SAS - SIRET : 990 138 562 00022"],
	},
	{
		title: "Hébergement",
		description: "Le site est hébergé par la société suivante :",
		items: [
			"Raison sociale : Vercel Inc.",
			"Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis",
			"Site web : https://vercel.com",
		],
	},
	{
		title: "Propriété intellectuelle",
		items: [
			"L'ensemble des éléments constituant ce site (textes, graphismes, logiciels, photographies, images, vidéos, sons, plans, logos, marques, créations et œuvres protégeables diverses, bases de données, etc.) ainsi que le site lui-même, relèvent des législations françaises et internationales sur le droit d'auteur et la propriété intellectuelle.",
			"Ces éléments sont la propriété exclusive de leurs sociétés d'exploitation respectives sous l'enseigne Myselfe Groupe.",
			"Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable du Directeur de la publication.",
		],
	},
	{
		title: "Gestion des Données Personnelles (RGPD)",
		items: [
			"Les données personnelles collectées sur ce site sont traitées conformément au règlement général sur la protection des données (RGPD) et à la loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés.",
			"Les destinataires des données personnelles sont les sociétés d'exploitation respectives sous l'enseigne Myselfe Groupe.",
			"Les droits des utilisateurs peuvent être exercés en contactant le délégué à la protection des données (DPD) par courriel à l'adresse suivante : sas.namastes@gmail.com.",
		],
	},
	{
		title: "Responsabilité",
		items: [
			"MySelfe Groupe s'efforce de fournir des informations exactes et à jour, mais ne peut garantir l'absence totale d'erreurs ou d'omissions.",
			"L'utilisation du site s'effectue sous la seule responsabilité de l'utilisateur.",
		],
	},
];

export default function MentionsLegalesPage() {
	return (
		<main className="bg-background text-foreground">
			<section className="relative overflow-hidden border-b border-border/60 bg-primary text-background">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(191,158,109,0.18),transparent_30%)]" />
				<div className="relative mx-auto w-full max-w-5xl px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
					<p className="text-sm font-medium uppercase tracking-[0.35em] text-border">
						Informations légales
					</p>
					<h1 className="mt-4 font-title text-4xl leading-tight sm:text-5xl">
						Mentions légales
					</h1>
					<p className="mt-6 max-w-3xl text-base leading-8 text-background/85 sm:text-base">
						Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), il est porté à la connaissance des utilisateurs du site <a href="https://myselfe-groupe.fr" className="text-background hover:underline">myselfe-groupe.fr</a> les présentes mentions légales.
					</p>
                    <p className="mt-4 max-w-3xl text-base leading-8 text-background/85 sm:text-base">
                        La connexion et la navigation sur le site par l’utilisateur impliquent acceptation intégrale et sans réserve des présentes mentions légales.
                    </p>
				</div>
			</section>

			<section className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
				<div className="grid gap-6">
					{sections.map((section) => (
						<article
							key={section.title}
							className="rounded-2xl border border-border/70 bg-white/70 p-6 shadow-[0_24px_90px_rgba(31,43,91,0.08)] backdrop-blur-sm sm:p-8"
						>
							<h2 className="font-text uppercase text-xl text-foreground font-semibold">
								{section.title}
							</h2>
							{section.description && (
								<p className="mt-4 text-sm leading-7 text-foreground sm:text-base">
									{section.description}
								</p>
							)}
							<ul className="mt-4 space-y-3 text-sm leading-7 text-foreground sm:text-base">
								{section.items.map((item) => (
									<li key={item} className="flex gap-3">
										<span>{item}</span>
									</li>
								))}
							</ul>
						</article>
					))}
				</div>
			</section>
		</main>
	);
}