"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Link from "next/link";

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

    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState<string | null>(
        null
    );

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
            setSaving(true);

            let finalLogoUrl = logoUrl;

            if (image) {
                if (logoUrl) {
                    const parts = logoUrl.split("/");
                    const fileNameToDelete = parts[parts.length - 1];

                    if (fileNameToDelete) {
                        const { error: deleteError } = await supabase.storage
                            .from("companies")
                            .remove([fileNameToDelete]);

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
        <div className="mx-auto max-w-4xl relative">
            <div className="mb-8 space-y-2">
                <h1 className="text-3xl uppercase tracking-[0.15em] underline underline-offset-3">
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

                <div>
                    <label className="mb-2 block">
                        Remplacer le logo
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

                            const file =
                                e.dataTransfer.files?.[0];

                            if (file) {
                                handleFile(file);
                            }
                        }}
                        className={`
            flex h-52 cursor-pointer items-center justify-center
            rounded-lg border-2 border-dashed transition-colors
            ${isDragging
                                ? "border-primary bg-primary/5"
                                : "border-muted-foreground/25"
                            }
        `}
                    >
                        <input
                            id="logo-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file =
                                    e.target.files?.[0];

                                if (file) {
                                    handleFile(file);
                                }
                            }}
                        />

                        <label
                            htmlFor="logo-upload"
                            className="flex h-full w-full cursor-pointer items-center justify-center"
                        >
                            {preview ? (
                                <div className="text-center space-y-2">
                                    <Image
                                        src={preview}
                                        alt="Prévisualisation"
                                        width={120}
                                        height={120}
                                        className="mx-auto rounded-lg object-cover"
                                    />
                                    <p className="text-sm text-muted-foreground">
                                        Cliquez ou déposez une autre image
                                    </p>
                                </div>
                            ) : logoUrl ? (
                                <div className="text-center space-y-2">
                                    <Image
                                        src={logoUrl}
                                        alt={name}
                                        width={120}
                                        height={120}
                                        className="mx-auto rounded-lg object-cover opacity-70"
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
                        disabled={saving}
                    >
                        {saving
                            ? "Enregistrement..."
                            : "Enregistrer"}
                    </Button>
                </div>
            </form>
        </div>
    );
}