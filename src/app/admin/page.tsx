const dashboardTabs = [
  {
    id: "overview",
    title: "Vue d'ensemble",
    description: "Résumé rapide des activités et des points prioritaires du dashboard.",
  },
  {
    id: "messages",
    title: "Messages",
    description: "Gérer les demandes reçues depuis le formulaire de contact.",
  },
  {
    id: "content",
    title: "Contenu du site",
    description: "Mettre à jour les textes, visuels et blocs éditoriaux du site.",
  },
  {
    id: "settings",
    title: "Paramètres",
    description: "Ajuster les accès, les informations de l'espace admin et la maintenance.",
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-border bg-muted/70 p-6 shadow-[0_20px_80px_rgba(31,43,91,0.08)] backdrop-blur-sm sm:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-secondary">
          Dashboard admin
        </p>
        <h1 className="mt-3 font-title text-4xl text-secondary sm:text-5xl">
          Bienvenue dans l’espace d’administration
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-secondary/90 sm:text-base">
          Utilisez la sidebar pour naviguer entre les différentes actions du dashboard.
          Les sections ci-dessous servent de points de départ pour structurer les futurs outils d’administration.
        </p>
      </section>

      <section id="overview" className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-2xl border border-border bg-background p-6 shadow-[0_20px_60px_rgba(31,43,91,0.06)]">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-secondary">
            Vue d'ensemble
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">
            Les prochaines actions à prioriser
          </h2>
          <p className="mt-3 text-sm leading-7 text-secondary">
            Cette zone peut accueillir vos indicateurs principaux, les tâches en cours et les alertes importantes.
          </p>
        </article>

        <article className="rounded-2xl border border-border bg-background p-6 shadow-[0_20px_60px_rgba(31,43,91,0.06)]">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-secondary">
            Raccourcis
          </p>
          <ul className="mt-4 space-y-3 text-sm text-secondary">
            {dashboardTabs.map((tab) => (
              <li key={tab.id} className="rounded-xl border border-border/70 bg-muted/50 p-4">
                <span className="block font-medium text-foreground">{tab.title}</span>
                <span className="mt-1 block leading-6">{tab.description}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section id="messages" className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-border bg-background p-6">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-secondary">
            Messages
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">Gestion des demandes</h2>
          <p className="mt-3 text-sm leading-7 text-secondary">
            Connectez ici la liste des messages reçus, leur statut de traitement et les réponses envoyées.
          </p>
        </article>

        <article className="rounded-2xl border border-border bg-background p-6">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-secondary">
            Statut
          </p>
          <div className="mt-4 space-y-4 text-sm text-secondary">
            <div className="rounded-xl border border-border/70 bg-muted/50 p-4">
              <span className="block font-medium text-foreground">Boîte de réception</span>
              <span className="mt-1 block">À brancher sur les données du formulaire de contact.</span>
            </div>
            <div className="rounded-xl border border-border/70 bg-muted/50 p-4">
              <span className="block font-medium text-foreground">Actions rapides</span>
              <span className="mt-1 block">Répondre, archiver ou marquer comme traité.</span>
            </div>
          </div>
        </article>
      </section>

      <section id="content" className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-border bg-background p-6">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-secondary">
            Contenu du site
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">Modifier les contenus</h2>
          <p className="mt-3 text-sm leading-7 text-secondary">
            Cette section peut servir à publier les actualités, modifier la page d’accueil ou actualiser les visuels.
          </p>
        </article>

        <article className="rounded-2xl border border-border bg-background p-6">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-secondary">
            Maintenance
          </p>
          <p className="mt-3 text-sm leading-7 text-secondary">
            Ajoutez ici les outils de publication, de prévisualisation et de validation avant mise en ligne.
          </p>
        </article>
      </section>

      <section id="settings" className="rounded-2xl border border-border bg-background p-6">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-secondary">
          Paramètres
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-foreground">Gestion de l'espace admin</h2>
        <p className="mt-3 text-sm leading-7 text-secondary">
          Vous pourrez y regrouper les réglages de compte, les accès et les options de sécurité.
        </p>
      </section>
    </div>
  );
}