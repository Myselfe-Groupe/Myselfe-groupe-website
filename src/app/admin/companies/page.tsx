"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";

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

    await supabase
      .from("companies")
      .delete()
      .eq("id", id);

    fetchCompanies();
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

        <button
          className="rounded-lg bg-primary px-4 py-2 text-white"
        >
          <a href="/admin/companies/create">
            Ajouter une entreprise
          </a>
        </button>

      </div>

      <div className="overflow-hidden rounded-xl border">
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
                      <p className="font-medium">
                        {company.name}
                      </p>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {company.description}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  {company.website}
                </td>

                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {company.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-muted px-3 py-1 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/companies/${company.id}`}
                      className="rounded-lg border px-3 py-2"
                    >
                      Modifier
                    </Link>

                    <button
                      onClick={() =>
                        deleteCompany(company.id)
                      }
                      className="rounded-lg border border-red-500 px-3 py-2 text-red-500"
                    >
                      Supprimer
                    </button>
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