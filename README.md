# UMES Website Refactor

Structure:
- index.html — homepage
- style.css — shared visual system and responsive styles
- script.js — shared interactions
- services/web-development.html
- services/digital-marketing.html
- services/content-analytics.html
- services/network-architecture.html

All service pages reuse the same CSS and JavaScript so typography, spacing, navigation, buttons, cards, mobile behavior, and footer remain consistent.

Canonical URLs use `https://umes.in/` for the homepage and retain `.html` for service pages. Each page declares its canonical URL, matching `sitemap.xml`.

On Apache hosting, deploy `.htaccess` to the document root with `mod_rewrite` enabled and `AllowOverride FileInfo Indexes`. It permanently redirects HTTP and alternate hostnames to `https://umes.in`, and explicit `/index.html` requests to `/`, preserving query strings. These rules assume Apache handles TLS directly; if using a CDN or reverse proxy that terminates TLS, configure HTTPS detection in the trusted server/proxy configuration first to avoid redirect loops.

GitHub Pages does not process `.htaccess`. If using GitHub Pages, configure the custom domain and Enforce HTTPS in the repository's Pages settings; the HTML canonical tags still apply.
