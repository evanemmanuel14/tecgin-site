# Tecgin Site (Static + Vercel Email Form)

## Pages
- `index.html`
- `about.html`
- `services.html`
- `projects.html`
- `contact.html`

## Features
- Modern UI (Tailwind CDN)
- Click-to-call: `tel:+971582857468`
- WhatsApp button: `https://wa.me/971582857468`
- Contact + Quote forms send email via Vercel Serverless Function: `/api/contact`

## Vercel Environment Variables (Required)
Set these in **Vercel → Project → Settings → Environment Variables**:

- `SMTP_HOST` (example: smtp.gmail.com)
- `SMTP_PORT` (465 for SSL, or 587 for TLS)
- `SMTP_USER` (your mailbox username)
- `SMTP_PASS` (password / app password)
- `MAIL_TO` (where you want to receive the enquiries)
- `MAIL_FROM` (must be an address allowed by your SMTP provider, often same as SMTP_USER)

### Gmail option (recommended if you use Google Workspace / Gmail)
Use an **App Password** (not your normal password). SMTP settings:
- host: `smtp.gmail.com`
- port: `465`

## Local test
Just open `index.html` in the browser for UI.
For email sending you must deploy to Vercel (or run a local server with env vars).

## Deploy notes
- No build step needed.
- Vercel can deploy static + `/api` functions automatically.
