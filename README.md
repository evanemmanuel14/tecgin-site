# Tecgin Site (Vercel)

Static HTML website (Tailwind CDN) + Vercel Serverless contact form.

## Pages
- `index.html` (Home)
- `services.html`
- `projects.html`
- `about.html`
- `contact.html`

## Deploy
1. Push to GitHub
2. Import to Vercel
3. Framework preset: **Other**
4. Build command: **(leave empty)**
5. Output directory: **(leave empty)**

## Contact form email (required)
This repo includes `api/contact.js` which sends email via SMTP using **nodemailer**.

Add these Environment Variables in Vercel (Project → Settings → Environment Variables):
- `SMTP_HOST`
- `SMTP_PORT` (usually 587)
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_TO` (your receiving email)
- `MAIL_FROM` (a sender address you own)

Then redeploy.

## WhatsApp + Call
- WhatsApp button uses `https://wa.me/971582857468`
- Call button uses `tel:+971582857468`

## Edit content
Open the HTML files and edit text/sections. Images live in `assets/`.
