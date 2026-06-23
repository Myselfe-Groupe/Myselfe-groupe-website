"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface Company {
  id: string;
  name: string;
  description: string;
  website: string;
  logo_url: string;
  tags: string[];
}

export default function CompaniesPage() {
  const supabase = createClient();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchCompanies() {
    const { data } = await supabase
      .from("companies")
      .select("*")
      .order("created_at");

    setCompanies(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    fetchCompanies();
  }, []);

  async function deleteCompany(id: string) {
    const confirmed = confirm(
      "Êtes-vous sûr de vouloir supprimer cette entreprise ?"
    );

    if (!confirmed) return;

    try {
      // 1. Récupérer les infos de l'entreprise (notamment le logo) AVANT la suppression
      const { data: companyData, error: fetchError } = await supabase
        .from("companies")
        .select("logo_url")
        .eq("id", id)
        .single();

      if (fetchError) {
        console.error("Erreur lors de la récupération de l'entreprise avant suppression:", fetchError);
      }

      // 2. Supprimer l'entreprise de la base de données PostgreSQL
      const { error: deleteError } = await supabase
        .from("companies")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      // 3. Si l'entreprise avait un logo, on le supprime du bucket Storage
      if (companyData?.logo_url) {
        // On nettoie l'URL des éventuels paramètres de cache (?v=...)
        const urlWithoutParams = companyData.logo_url.split("?")[0];
        const parts = urlWithoutParams.split("/");
        const fileNameToDelete = parts[parts.length - 1];

        if (fileNameToDelete) {
          const { error: storageError } = await supabase.storage
            .from("companies")
            .remove([fileNameToDelete]);

          if (storageError) {
            console.error("Erreur lors de la suppression de l'image du bucket:", storageError);
          } else {
            console.log("Image associée supprimée du bucket avec succès !");
          }
        }
      }

      // 4. Rafraîchir la liste des entreprises à l'écran
      fetchCompanies();

    } catch (error) {
      console.error("Erreur globale lors de la suppression:", error);
      alert("Une erreur est survenue lors de la suppression de l'entreprise.");
    }
  }

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Entreprises
          </h1>

          <p className="text-muted-foreground">
            Gérez les entreprises du groupe.
          </p>
        </div>

        <Link href="/admin/companies/create">
          <Button variant="primary" size="lg">
            Ajouter une entreprise
          </Button>
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="p-4 text-left">
                Entreprise
              </th>

              <th className="p-4 text-left">
                Site web
              </th>

              <th className="p-4 text-left">
                Tags
              </th>

              <th className="p-4 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {companies.map((company) => (
              <tr
                key={company.id}
                className="border-t"
              >
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={company.logo_url}
                      alt={company.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div className="space-y-1">
                      <p className="font-medium underline underline-offset-2">
                        {company.name}
                      </p>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {company.description}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-4 text-sm">
                  {company.website}
                </td>

                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {company.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary/80 text-background px-3 py-1 text-xs border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex flex-col justify-end gap-2">
                    <Link href={`/admin/companies/${company.id}`}>
                      <Button variant="primary" className="w-full">
                        Modifier
                      </Button>
                    </Link>
                    <Button
                      className="w-full"
                      variant="destructive"
                      onClick={() =>
                        deleteCompany(company.id)
                      }
                    >
                      Supprimer
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}