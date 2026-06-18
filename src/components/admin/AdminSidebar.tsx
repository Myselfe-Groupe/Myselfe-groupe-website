import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

const navItems = [
  { href: "/admin", label: "Vue d'ensemble" },
  { href: "/admin/companies", label: "Gérer les entreprises" },
];

export default function AdminSidebar({
  email,
}: {
  email: string;
}) {
  return (
    <aside className="border-b border-border bg-primary px-4 py-5 shadow-[0_18px_60px_rgba(31,43,91,0.08)] lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-80 lg:flex-col lg:border-b-0 lg:border-r lg:px-6 lg:py-8">
      <div className="flex h-full flex-col gap-8 lg:min-h-0">
        <div>
          <Link href="/" className="text-background text-sm">
            &larr; <span className="ml-1 underline underline-offset-2">Retourner sur le site</span>
          </Link>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-border mt-6">
            Compte connecté
          </p>
          <p className="mt-3 break-all text-sm font-semibold text-background">
            {email}
          </p>
        </div>

        <nav className="space-y-3 lg:flex-1 lg:overflow-y-auto">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-border">
            Onglets
          </p>
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg border border-border bg-background/10 px-4 py-3 text-sm font-medium text-background transition hover:bg-background/20"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="pt-2 lg:pt-0">
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}