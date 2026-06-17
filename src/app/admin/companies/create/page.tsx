"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function CreateCompanyPage() {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [image, setImage] = useState<File | null>(null);

  const addTag = () => {
    const value = tagInput.trim();

    if (!value) return;

    setTags((prev) => [...prev, value]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      let logoUrl = "";

      if (image) {
        const extension = image.name.split(".").pop();

        const fileName =
          crypto.randomUUID() + "." + extension;

        const { error: uploadError } =
          await supabase.storage
            .from("companies")
            .upload(fileName, image);

        if (uploadError) {
          throw uploadError;
        }

        const {
          data: { publicUrl },
        } = supabase.storage
          .from("companies")
          .getPublicUrl(fileName);

        logoUrl = publicUrl;
      }

      const { error } = await supabase
        .from("companies")
        .insert({
          name,
          description,
          website,
          logo_url: logoUrl,
          tags,
        });

      if (error) {
        throw error;
      }

      router.push("/admin/companies");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Nouvelle entreprise
        </h1>

        <p className="text-muted-foreground">
          Ajouter une entreprise au groupe.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Nom
          </label>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Site web
          </label>

          <input
            value={website}
            onChange={(e) =>
              setWebsite(e.target.value)
            }
            placeholder="https://..."
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows={8}
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(
                e.target.files?.[0] ?? null
              )
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Tags
          </label>

          <div className="flex gap-2">
            <input
              value={tagInput}
              onChange={(e) =>
                setTagInput(e.target.value)
              }
              className="flex-1 rounded-lg border p-3"
            />

            <button
              type="button"
              onClick={addTag}
              className="rounded-lg border px-4"
            >
              Ajouter
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() =>
                  removeTag(tag)
                }
                className="rounded-full bg-muted px-3 py-1 text-sm"
              >
                {tag} ✕
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() =>
              router.push("/admin/companies")
            }
            className="rounded-lg border px-4 py-2"
          >
            Annuler
          </button>

          <button
            disabled={loading}
            className="rounded-lg bg-primary px-4 py-2 text-white"
          >
            {loading
              ? "Création..."
              : "Créer l'entreprise"}
          </button>
        </div>
      </form>
    </div>
  );
}