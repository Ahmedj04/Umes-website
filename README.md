# UMES Website Refactor

Structure:
- index.html — homepage
- about.html — company background, founding year, mission, and current services
- style.css — shared visual system and responsive styles
- script.js — shared interactions
- services/web-development.html
- services/digital-marketing.html
- services/content-analytics.html
- services/network-architecture.html

All service pages reuse the same CSS and JavaScript so typography, spacing, navigation, buttons, cards, mobile behavior, and footer remain consistent.

Shared CSS and JavaScript URLs include a short integer cache version, such as `?v=2`. Whenever `style.css` or `script.js` changes, increment that asset's version in every HTML page, including the service pages. Deploy the updated HTML alongside the asset so browsers request the new version.

Canonical URLs use `https://umes.in/` for the homepage and retain `.html` for the About Us and service pages. Each page declares its canonical URL, matching `sitemap.xml`.

On Apache hosting, deploy `.htaccess` to the document root with `mod_rewrite` enabled and `AllowOverride FileInfo Indexes`. It permanently redirects HTTP and alternate hostnames to `https://umes.in`, and explicit `/index.html` requests to `/`, preserving query strings. These rules assume Apache handles TLS directly; if using a CDN or reverse proxy that terminates TLS, configure HTTPS detection in the trusted server/proxy configuration first to avoid redirect loops.

GitHub Pages does not process `.htaccess`. If using GitHub Pages, configure the custom domain and Enforce HTTPS in the repository's Pages settings; the HTML canonical tags still apply.
