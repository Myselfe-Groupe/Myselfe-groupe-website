"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";

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

  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    null
  );

  const addTag = () => {
    const value = tagInput.trim();

    if (!value) return;

    setTags((prev) => [...prev, value]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
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
      <div className="space-y-2">
        <h1 className="text-3xl uppercase tracking-[0.15em] underline underline-offset-3">
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

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => {
              setIsDragging(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);

              const file = e.dataTransfer.files?.[0];
              handleFile(file);

              if (file && file.type.startsWith("image/")) {
                setImage(file);
              }
            }}
            className={`
              flex h-40 cursor-pointer items-center justify-center
              rounded-lg border-2 border-dashed transition-colors
              ${isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25"
              }
            `}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="image-upload"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  handleFile(file);
                }
                setImage(e.target.files?.[0] ?? null)
              }}
            />

            <label
              htmlFor="image-upload"
              className="flex h-full w-full cursor-pointer items-center justify-center"
            >
              {preview ? (
                <div className="text-center space-y-2">
                  <Image
                    src={preview}
                    alt="Preview"
                    width={120}
                    height={120}
                    className="mx-auto rounded-lg object-cover"
                  />

                  <p className="text-sm text-muted-foreground">
                    Cliquez ou déposez une autre image
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="font-medium">
                    Glissez-déposez votre image ici
                  </p>

                  <p className="text-sm text-muted-foreground">
                    ou cliquez pour sélectionner un fichier
                  </p>
                </div>
              )}
            </label>
          </div>
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
              className="rounded-lg border px-4 bg-primary text-background transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
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
                className="rounded-full bg-primary/80 text-background border border-border px-3 py-1 cursor-pointer transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {tag} ✕
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            type="button"
            onClick={() =>
              router.push("/admin/companies")
            }
            className=""
          >
            Annuler
          </Button>

          <Button
            disabled={loading}
          >
            {loading
              ? "Création..."
              : "Créer l'entreprise"}
          </Button>
        </div>
      </form>
    </div>
  );
}