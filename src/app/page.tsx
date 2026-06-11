import BusinessCard from "@/components/cards/BusinessCard";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/contact/ContactForm";
import Image from "next/image";

export const metadata = {
  title: "MySelfe Groupe - Accueil",
  description: "Découvrez l'histoire inspirante de MySelfe Groupe, une entreprise familiale passionnée par l'entrepreneuriat et la création de marques uniques. Explorez notre parcours, nos valeurs et nos entreprises, notamment Namas'Thés, un lieu d'exception regroupant Boulangerie, Pizzeria, Patisserie, Snacking, Chocolaterie et Salon de thé. Rejoignez-nous dans cette aventure entrepreneuriale et découvrez comment nous transformons nos passions en succès.",
};

export default function Home() {
  return (
    <div className="flex flex-col bg-background text-foreground">
      <section id="accueil" className="min-h-screen flex items-start">
        <main className="mx-auto w-full max-w-5xl px-6 py-10 sm:px-10 lg:px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 sm:gap-12">
            <Image
              src={"/logo/MyselfeGroupeLogo.png"}
              alt={"MySelfe Groupe - Logo"}
              width={700}
              height={700}
              className="absolute left-0 top-0 object-cover opacity-10"
            />
            <Image
              src={"/images/alex.png"}
              alt={"Alex - Fondatrice de MySelfe Groupe"}
              width={700}
              height={700}
              className="aspect-square w-40 sm:w-1/3 rounded-full object-cover border-secondary border shadow-lg z-10"
            />
            <div className="max-w-2xl space-y-6 z-10">
              <p className="text-base font-medium uppercase tracking-[0.35em] text-secondary">
                Histoire
              </p>
              <h1 className="font-title text-4xl font tracking-wide text-secondary sm:text-5xl">
                Le parcours de Myselfe Groupe, une aventure entrepreneuriale inspirante
              </h1>
              <p className="max-w-xl text-sm sm:text-base leading-7 text-secondary">
                Le Groupe Myselfe est né d'une ambition simple mais profondément humaine : créer des lieux où l'on se sent bien, où l'on prend le temps de vivre, d'échanger et de se retrouver.
              </p>
              <p className="max-w-xl text-sm sm:text-base leading-7 text-secondary">
                À l'origine de cette aventure se trouve Alexandra Verlhac, une entrepreneuse passionnée qui n'a jamais eu peur des défis. Toujours guidée par ses convictions et son envie d'aller plus loin, elle a imaginé un concept centré sur l'humain, le partage et la convivialité.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#namas-thes">
                  <Button variant="primary" size="lg">
                    Nos entreprises
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </main>
      </section>

      <section id="namas-thes" className="min-h-screen flex items-center bg-muted">
        <div className="mx-auto w-full max-w-7xl px-2 py-10 sm:px-6 lg:px-8 space-y-10">
          <BusinessCard
            name="Namas'Thés"
            tags={[
              "Boulangerie",
              "Pizzeria",
              "Patisserie",
              "Snacking",
              "Chocolaterie",
              "Salon de thé",
            ]}
            description="Namas'Thés est bien plus qu'une simple boulangerie ou pizzeria. C'est un véritable lieu de vie, un espace où l'on peut faire une pause, savourer un moment de détente et créer du lien. Chaque détail a été pensé pour offrir une expérience unique, alliant qualité, convivialité et authenticité."
            logoSrc="/images/vitrine-namasthes.jpeg"
            website="https://namas-thes.com"
          />
          <BusinessCard
            name="A venir..."
            tags={[
              "Salle d'Arcade",
            ]}
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
            logoSrc="/images/vitrine-namasthes.jpeg"
            website="https://namas-thes.com"
          />
        </div>
      </section>

      <section id="notre-histoire" className="relative overflow-hidden py-20 sm:py-24">
        <div className="relative flex flex-row mx-auto w-full max-w-6xl gap-8 px-6 sm:px-10 lg:px-12">
          <div className="space-y-6">
            <p className="text-base font-medium uppercase tracking-[0.35em] text-secondary">
              Histoire du groupe
            </p>
            <h2 className="font-title text-3xl leading-tight text-secondary sm:text-5xl">
              Une aventure humaine née d'un lieu de partage
            </h2>
            <p className="sm:text-lg leading-8 text-secondary">
              Le Groupe Myselfe s'est construit autour d'une conviction simple : les projets les plus durables sont ceux qui créent du lien, du sens et des souvenirs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="sm:w-2/3 space-y-6 rounded-2xl border border-border bg-white/60 p-6 sm:p-8 shadow-[0_20px_80px_rgba(31,43,91,0.08)] backdrop-blur-sm md:p-10">
                <p className="text-sm leading-7 text-secondary">
                  Tout a commencé avec l'ouverture de la boulangerie-pâtisserie-pizzeria Namas'Thés. Plus qu'un commerce, ce lieu a été pensé comme un véritable espace de vie, où chacun peut faire une pause, respirer, savourer un moment de détente et créer du lien. Rapidement, ce premier projet est devenu le point de départ d'une aventure bien plus vaste.
                </p>
                <p className="text-sm leading-7 text-secondary">
                  Car derrière Namas'Thés se dessine une vision plus grande : celle d'un univers qui rassemble, qui rapproche les personnes et qui offre une expérience humaine à part entière. Pour Alexandra Verlhac, entreprendre ne consiste pas seulement à développer des activités, mais à créer des lieux porteurs de sens, où l'accueil, la qualité et l'authenticité occupent une place centrale.
                </p>
                <p className="text-sm leading-7 text-secondary">
                  Cette aventure n'aurait cependant pas la même saveur sans les femmes et les hommes qui l'accompagnent au quotidien. Entourée d'une équipe engagée, passionnée et prête à la suivre dans ses idées parfois audacieuses, Alexandra construit chaque jour un projet collectif fondé sur la confiance, l'enthousiasme et l'envie d'innover.
                </p>
                <p className="text-sm leading-7 text-secondary">
                  Aujourd'hui, le Groupe Myselfe poursuit son développement avec la même énergie qu'à ses débuts. Entre nouveaux projets, nouvelles expériences et nouvelles façons de créer du lien, l'histoire ne fait que commencer.
                </p>
                <p className="text-sm leading-7 text-secondary">
                  Et si une chose est certaine, c'est que Alexandra Verlhac et son équipe vous réservent encore de belles surprises pour l'avenir. Car le Groupe Myselfe est avant tout une aventure en mouvement, portée par une conviction forte : les plus beaux projets sont ceux qui réunissent les personnes autour de moments sincères et mémorables.
                </p>
              </div>
              <aside className="sm:w-1/3 space-y-4 sm:space-y-6">
                <div className="rounded-2xl border border-border/80 bg-primary p-6 text-background shadow-[0_20px_80px_rgba(31,43,91,0.14)]">
                  <p className="text-base font-medium uppercase tracking-[0.3em] text-border">
                    En bref
                  </p>
                  <ul className="mt-6 space-y-4">
                    <li className="rounded-xl border border-background/15 bg-background/5 p-4">
                      <span className="block text-sm uppercase tracking-[0.25em] text-border">
                        Origine
                      </span>
                      <span className="mt-1 block text-base">
                        Namas'Thés, premier lieu de l'histoire.
                      </span>
                    </li>
                    <li className="rounded-xl border border-background/15 bg-background/5 p-4">
                      <span className="block text-sm uppercase tracking-[0.25em] text-border">
                        Vision
                      </span>
                      <span className="mt-1 block text-base">
                        Créer des espaces qui rassemblent et inspirent.
                      </span>
                    </li>
                    <li className="rounded-xl border border-background/15 bg-background/5 p-4">
                      <span className="block text-sm uppercase tracking-[0.25em] text-border">
                        Élan
                      </span>
                      <span className="mt-1 block text-base">
                        Un collectif engagé, tourné vers l'avenir.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-xl border border-border bg-muted/80 p-6">
                  <p className="text-sm font-medium uppercase tracking-[0.3em] text-secondary">
                    Bienvenue dans l'univers Myselfe
                  </p>
                  <p className="mt-4 font-title text-3xl leading-tight text-foreground sm:text-4xl">
                    Une aventure humaine qui ne cesse de grandir.
                  </p>
                </div>
              </aside>
            </div>

          </div>


        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center bg-muted">
        <div className="mx-auto w-full max-w-4xl px-6 py-20 sm:px-10 lg:px-12">
          <h2 className="text-5xl font-semibold font-title">Contact</h2>
          <p className="mt-4 text-base sm:text-lg text-secondary">Entrons en contact — envoyez-nous un message.</p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
