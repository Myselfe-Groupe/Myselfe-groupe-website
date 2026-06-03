import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 py-20 sm:px-10 lg:px-12">
        <div className="max-w-2xl space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-secondary">
            Accueil
          </p>
          <h1 className="font-title text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Une palette cohérente, pilotée par des tokens et prête pour le mode sombre.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-secondary">
            Les couleurs principales sont désormais définies une seule fois dans
            globals.css, puis réutilisées dans l’interface via bg-background,
            text-foreground, border-border et bg-muted.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="lg">
              Notre histoire
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
