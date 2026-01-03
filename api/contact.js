// Vercel Serverless Function: /api/contact
// Sends email via SMTP using nodemailer.
// Required env vars (set in Vercel):
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM

const nodemailer = require("nodemailer");

const safe = (v) => String(v || "").trim();

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const name = safe(req.body?.name);
    const email = safe(req.body?.email);
    const phone = safe(req.body?.phone);
    const message = safe(req.body?.message);
    const source = safe(req.body?.source);

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Please provide name, email, and message." });
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !MAIL_TO || !MAIL_FROM) {
      return res.status(500).json({ error: "Server email is not configured (missing env vars)." });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const subject = `New Tecgin enquiry (${source || "website"}) — ${name}`;
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      source ? `Source: ${source}` : null,
      "",
      "Message:",
      message,
    ].filter(Boolean).join("\n");

    await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: email,
      subject,
      text,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send. Check Vercel logs." });
  }
};
