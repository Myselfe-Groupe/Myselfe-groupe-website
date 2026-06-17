"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12 text-foreground">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-muted/70 p-8 shadow-[0_30px_90px_rgba(31,43,91,0.12)] backdrop-blur-sm sm:p-10">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-border/30 blur-3xl" />

        <div className="relative space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-secondary">
            Accès privé
          </p>
          <h1 className="font-title text-4xl text-secondary">
            Connexion admin
          </h1>
          <p className="text-sm leading-6 text-secondary/90">
            Identifiez-vous pour accéder à l’espace d’administration.
          </p>
        </div>

        <form onSubmit={login} className="relative mt-8 space-y-5">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-secondary">Email</span>
            <input
              type="email"
              placeholder="Email admin"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-border bg-background/90 px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-secondary">
              Mot de passe
            </span>
            <input
              type="password"
              placeholder="Mot de passe"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border border-border bg-background/90 px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <Button type="submit" size="lg" className="w-full">
            Connexion
          </Button>
        </form>
      </div>
    </main>
  );
}