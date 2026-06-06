"use client";

import React, { useState } from "react";
import Button from "../ui/Button";

type FormState = {
    nom: string;
    prenom: string;
    email: string;
    sujet: string;
    message: string;
};

const initialState: FormState = {
    nom: "",
    prenom: "",
    email: "",
    sujet: "",
    message: "",
};

export default function ContactForm() {
    const [form, setForm] = useState<FormState>(initialState);
    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [submitting, setSubmitting] = useState(false);

    function validate(): boolean {
        const next: Partial<FormState> = {};
        if (!form.nom.trim()) next.nom = "Veuillez entrer votre nom";
        if (!form.prenom.trim()) next.prenom = "Veuillez entrer votre prénom";
        if (!form.email.trim()) next.email = "Veuillez entrer une adresse email";
        else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) next.email = "Adresse email invalide";
        if (!form.sujet.trim()) next.sujet = "Veuillez indiquer un sujet";
        if (!form.message.trim()) next.message = "Veuillez écrire un message";

        setErrors(next);
        return Object.keys(next).length === 0;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;
        setSubmitting(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) {
                if (data?.errors) {
                    setErrors(data.errors);
                } else {
                    throw new Error(data?.error || "Erreur lors de l'envoi");
                }
                return;
            }
            setForm(initialState);
            setErrors({});
            alert("Message envoyé — merci !");
        } catch (err) {
            console.error(err);
            alert("Une erreur est survenue. Réessayez plus tard.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col">
                    <span className="text-sm mb-1">Nom</span>
                    <input
                        name="nom"
                        value={form.nom}
                        onChange={handleChange}
                        className="px-3 py-2 rounded border border-border bg-transparent"
                        aria-invalid={!!errors.nom}
                        aria-describedby={errors.nom ? "nom-error" : undefined}
                    />
                    {errors.nom ? <span id="nom-error" className="text-xs text-red-500 mt-1">{errors.nom}</span> : null}
                </label>

                <label className="flex flex-col">
                    <span className="text-sm mb-1">Prénom</span>
                    <input
                        name="prenom"
                        value={form.prenom}
                        onChange={handleChange}
                        className="px-3 py-2 rounded border border-border bg-transparent"
                        aria-invalid={!!errors.prenom}
                        aria-describedby={errors.prenom ? "prenom-error" : undefined}
                    />
                    {errors.prenom ? <span id="prenom-error" className="text-xs text-red-500 mt-1">{errors.prenom}</span> : null}
                </label>
            </div>

            <label className="flex flex-col">
                <span className="text-sm mb-1">Adresse email</span>
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="px-3 py-2 rounded border border-border bg-transparent"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email ? <span id="email-error" className="text-xs text-red-500 mt-1">{errors.email}</span> : null}
            </label>

            <label className="flex flex-col">
                <span className="text-sm mb-1">Sujet</span>
                <input
                    name="sujet"
                    value={form.sujet}
                    onChange={handleChange}
                    className="px-3 py-2 rounded border border-border bg-transparent"
                    aria-invalid={!!errors.sujet}
                    aria-describedby={errors.sujet ? "sujet-error" : undefined}
                />
                {errors.sujet ? <span id="sujet-error" className="text-xs text-red-500 mt-1">{errors.sujet}</span> : null}
            </label>

            <label className="flex flex-col">
                <span className="text-sm mb-1">Message</span>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    className="px-3 py-2 rounded border border-border bg-transparent resize-vertical"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message ? <span id="message-error" className="text-xs text-red-500 mt-1">{errors.message}</span> : null}
            </label>

            <div className="pt-2">
                <Button
                    size="lg"
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center px-4 py-2 bg-primary text-background rounded"
                >
                    {submitting ? "Envoi..." : "Envoyer"}
                </Button>
            </div>
        </form>
    );
}

export type { FormState };
