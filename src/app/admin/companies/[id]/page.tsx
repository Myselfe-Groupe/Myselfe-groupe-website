"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface Company {
    id: string;
    name: string;
    description: string;
    website: string;
    logo_url: string;
    tags: string[];
}

export default function EditCompanyPage() {
    const supabase = createClient();
    const router = useRouter();
    const params = useParams();

    const companyId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [name, setName] = useState("");
    const [website, setWebsite] = useState("");
    const [description, setDescription] = useState("");
    const [logoUrl, setLogoUrl] = useState("");

    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");

    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        fetchCompany();
    }, []);

    async function fetchCompany() {
        const { data, error } = await supabase
            .from("companies")
            .select("*")
            .eq("id", companyId)
            .single();

        if (error) {
            console.error(error);
            return;
        }

        setName(data.name);
        setWebsite(data.website ?? "");
        setDescription(data.description);
        setLogoUrl(data.logo_url ?? "");
        setTags(data.tags ?? []);

        setLoading(false);
    }

    function addTag() {
        const value = tagInput.trim();

        if (!value) return;

        setTags([...tags, value]);
        setTagInput("");
    }

    function removeTag(tag: string) {
        setTags(tags.filter((t) => t !== tag));
    }

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        try {
            setSaving(true);

            let finalLogoUrl = logoUrl;

            if (image) {
                // Supprime l'ancien logo
                if (logoUrl) {
                    // Découpe l'URL pour ne garder que la toute fin (le nom du fichier)
                    const parts = logoUrl.split("/");
                    const fileNameToDelete = parts[parts.length - 1];

                    if (fileNameToDelete) {
                        const { error: deleteError } = await supabase.storage
                            .from("companies")
                            .remove([fileNameToDelete]); // Supabase attend juste ['nom-du-fichier.ext']

                        if (deleteError) {
                            console.error(
                                "Détails de l'erreur de suppression :",
                                deleteError
                            );
                        } else {
                            console.log("Ancien logo supprimé avec succès du bucket");
                        }
                    }
                }

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

                finalLogoUrl = publicUrl;
            }

            const { error } = await supabase
                .from("companies")
                .update({
                    name,
                    website,
                    description,
                    logo_url: finalLogoUrl,
                    tags,
                })
                .eq("id", companyId);

            if (error) {
                throw error;
            }

            router.push("/admin/companies");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la mise à jour");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div>
                Chargement...
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Modifier l'entreprise
                </h1>

                <p className="text-muted-foreground">
                    Mettre à jour les informations.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                <div>
                    <label className="mb-2 block">
                        Nom
                    </label>

                    <input
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        className="w-full rounded-lg border p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block">
                        Site web
                    </label>

                    <input
                        value={website}
                        onChange={(e) =>
                            setWebsite(e.target.value)
                        }
                        className="w-full rounded-lg border p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block">
                        Description
                    </label>

                    <textarea
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        rows={8}
                        className="w-full rounded-lg border p-3"
                    />
                </div>

                {logoUrl && (
                    <div>
                        <label className="mb-2 block">
                            Logo actuel
                        </label>

                        <Image
                            src={logoUrl}
                            alt={name}
                            width={120}
                            height={120}
                            className="rounded-lg border"
                        />
                    </div>
                )}

                <div>
                    <label className="mb-2 block">
                        Remplacer le logo
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
                    <label className="mb-2 block">
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
                                className="rounded-full bg-muted px-3 py-1"
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
                        disabled={saving}
                        className="rounded-lg bg-primary px-4 py-2 text-white"
                    >
                        {saving
                            ? "Enregistrement..."
                            : "Enregistrer"}
                    </button>
                </div>
            </form>
        </div>
    );
}