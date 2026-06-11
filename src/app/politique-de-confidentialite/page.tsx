import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "MySelfe Groupe - Politique de confidentialité",
	description: "Politique de confidentialité du site MySelfe Groupe.",
};

const sections = [
	{
		title: "Responsable du Traitement des Données",
		description:
			"Le traitement des données collectées sur ce site est co-géré par les établissements exploitant l'enseigne commerciale Myselfe Groupe, représentés par Alexandra Verlhac, en sa qualité de responsable du traitement.",
        items: [
            "Pour toute question relative à vos données, vous pouvez nous contacter à l'adresse e-mail suivante : sas.namasthes@gmail.com"
        ],
	},
	{
		title: "Données Collectées et Finalités",
		description:
			"Nous collectons uniquement les données strictement nécessaires aux services que vous utilisez sur notre site.",
        items: [
            "1. Formulaires de contact",
            "Lorsque vous remplissez un formulaire de contact sur notre site, nous collectons :",
            "- Données collectées : Nom, Prénom, Adresse e-mail.",
            "- Finalité : Répondre à vos questions, traiter vos demandes et assurer le suivi de nos échanges.",
            "- Base légale : Votre consentement (matérialisé par la case à cocher avant l'envoi du formulaire).",
            "2. Mesure d'audience",
            "- Outil utilisé : Umami",
            "- Données collectées : Données de navigation anonymisées ou pseudonymisées (pages visitées, temps passé, type d'appareil).",
            "- Finalité : Analyser l'audience du site, améliorer l'expérience utilisateur et optimiser nos contenus.",
            "- Base légale : Consentement de l'utilisateur (via le bandeau de cookies) ou intérêt légitime selon l'outil choisi.",
        ],
    },
	{
		title: "Stockage et Sécurité des Données",
		items: [
			"Formulaires de contact : Les informations envoyées via nos formulaires ne sont pas stockées dans une base de données sur ce site. Elles sont directement acheminées et conservées sous forme d'e-mail sur la boîte de réception professionnelle sécurisée de Myselfe Groupe.",
			"Espace Administrateur (Supabase) : L'infrastructure Supabase est exclusivement dédiée à la gestion de l'espace d'administration (Backoffice) du site. Aucune donnée concernant les visiteurs ou les formulaires de contact n'y est enregistrée ou stockée.",
		],
	},
	{
		title: "Durée de Conservation des Données",
		items: [
			"Données des e-mails de contact : Les e-mails reçus via le formulaire sont conservés dans notre messagerie professionnelle pendant une durée maximale de 3 ans à compter de notre dernier échange, sauf si une relation contractuelle (réservation, contrat) nécessite une conservation plus longue.",
			"Données d'audience (Cookies) : Les données collectées par l'outil de mesure d'audience sont conservées pour une durée maximale de 14 mois.",
		],
	},
	{
		title: "Destinataires des Données",
		items: [
			"Les e-mails générés par le formulaire de contact sont strictement destinés à l'usage interne des équipes de Myselfe Groupe (le Restaurant, la Salle d'Arcade ou les Chambres d'Hôtes selon l'objet de votre message).",
			"Ces informations ne sont jamais vendues, louées ou partagées avec des tiers à des fins commerciales ou publicitaires.",
		],
	},
	{
		title: "Sécurité et confidentialité",
		description:
			"L'éditeur met en œuvre des mesures techniques et organisationnelles raisonnables pour protéger les données personnelles contre la perte, l'altération, la divulgation ou l'accès non autorisé. L'accès aux données personnelles est réservé aux personnes expressément autorisées.",
	},
	{
		title: "Vos Droits (Conformité RGPD)",
		items: [
			"Conformément à la réglementation européenne, vous disposez d'un droit d'accès, de rectification et de suppression des e-mails et données vous concernant.",
			"Pour exercer ce droit (par exemple, demander la suppression d'un échange d'e-mails passé), envoyez simplement votre demande à l’adresse : sas.namastes@gmail.com. Une réponse vous sera apportée sous 30 jours. Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL (https://www.cnil.fr).",
		],
	},
	{
		title: "Contact",
		description:
			"Pour exercer vos droits ou poser une question relative à la protection des données, vous pouvez contacter l'éditeur du site à l'adresse suivante : sas.namastes@gmail.com.",
	},
];

export default function PolitiqueConfidentialitePage() {
	return (
		<main className="bg-background text-foreground">
			<section className="relative overflow-hidden border-b border-border/60 bg-primary text-background">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(191,158,109,0.18),transparent_30%)]" />
				<div className="relative mx-auto w-full max-w-5xl px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
					<p className="text-sm font-medium uppercase tracking-[0.35em] text-border">
						Protection des données
					</p>
					<h1 className="mt-4 font-title text-4xl leading-tight sm:text-5xl">
						Politique de confidentialité
					</h1>
					<p className="mt-6 max-w-3xl text-base leading-8 text-background/85 sm:text-base">
						La protection de vos données personnelles est une priorité pour Myselfe Groupe. Les présentes règles de confidentialité décrivent quelles informations sont collectées sur le site <a href="https://myselfe-groupe.com" className="text-background hover:underline">myselfe-groupe.com</a>, comment elles sont traitées et quels sont vos droits, conformément au Règlement Général sur la Protection des Données (RGPD).
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
							<h2 className="font-text uppercase text-xl font-semibold text-foreground">
								{section.title}
							</h2>
							{section.description && (
								<p className="mt-4 text-sm leading-7 text-foreground sm:text-base">
									{section.description}
								</p>
							)}
							{section.items && (
								<ul className="mt-4 space-y-3 text-sm leading-7 text-foreground sm:text-base">
									{section.items.map((item) => (
										<li key={item} className="flex gap-3">
											<span>{item}</span>
										</li>
									))}
								</ul>
							)}
						</article>
					))}
				</div>
			</section>
		</main>
	);
}