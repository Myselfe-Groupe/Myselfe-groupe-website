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
    <aside className="border-b border-border bg-muted/70 px-4 py-5 shadow-[0_18px_60px_rgba(31,43,91,0.08)] lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-80 lg:flex-col lg:border-b-0 lg:border-r lg:px-6 lg:py-8">
      <div className="flex h-full flex-col gap-8 lg:min-h-0">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-secondary">
            Compte connecté
          </p>
          <p className="mt-3 break-all text-sm font-semibold text-foreground">
            {email}
          </p>
        </div>

        <nav className="space-y-3 lg:flex-1 lg:overflow-y-auto">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-secondary">
            Onglets
          </p>
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl border border-border/70 bg-background/70 px-4 py-3 text-sm font-medium text-secondary transition hover:border-primary hover:text-primary"
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