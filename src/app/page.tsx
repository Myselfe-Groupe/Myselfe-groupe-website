import BusinessCard from "@/components/cards/BusinessCard";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-col bg-background text-foreground">
      <section id="accueil" className="min-h-screen flex items-center">
        <main className="mx-auto w-full max-w-4xl px-6 py-20 sm:px-10 lg:px-12">
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
      </section>

      <section id="namas-thes" className="min-h-screen flex items-center bg-muted">
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <BusinessCard
            name="Namas'Thés"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
            logoSrc="/images/vitrine-namasthes.png"
            website="https://namas-thes.com"
          />
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-4xl px-6 py-20 sm:px-10 lg:px-12">
          <h2 className="text-3xl font-semibold font-title">Contact</h2>
          <p className="mt-4 text-lg text-secondary">Entrons en contact — envoyez-nous un message.</p>
          <div className="mt-6">
            <a href="mailto:contact@example.com" className="inline-block">
              <Button variant="primary" size="lg">
                Nous contacter
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
