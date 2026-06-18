"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Button from "../ui/Button";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    const { error } = await supabase.auth.signOut();

    setIsLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/login");
    router.refresh();
  }

  return (
    <Button
      variant="outline"
      size="lg"
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? "Déconnexion..." : "Se déconnecter"}
    </Button>
  );
}