import { NextResponse } from "next/server";
import { Resend } from "resend";

type Payload = {
  nom?: string;
  prenom?: string;
  email?: string;
  sujet?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM;
    const to = process.env.RESEND_TO;

    if (!apiKey) return NextResponse.json({ error: "RESEND_API_KEY not configured" }, { status: 500 });
    if (!from || !to) return NextResponse.json({ error: "RESEND_FROM or RESEND_TO not configured" }, { status: 500 });

    const data: Payload = await req.json();
    const { nom = "", prenom = "", email = "", sujet = "", message = "" } = data;

    const errors: Record<string, string> = {};
    if (!nom.trim()) errors.nom = "Nom requis";
    if (!prenom.trim()) errors.prenom = "Prénom requis";
    if (!email.trim()) errors.email = "Email requis";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.email = "Email invalide";
    if (!sujet.trim()) errors.sujet = "Sujet requis";
    if (!message.trim()) errors.message = "Message requis";

    if (Object.keys(errors).length > 0) return NextResponse.json({ errors }, { status: 400 });

    const resend = new Resend(apiKey);

    const html = `
      <p><strong>Nom:</strong> ${nom} ${prenom}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Sujet:</strong> ${sujet}</p>
      <hr />
      <p>${message.replace(/\n/g, "<br />")}</p>
    `;

    await resend.emails.send({
      from,
      to,
      subject: `Contact — ${sujet}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
