# Shared asset cache versions

Whenever you edit `style.css` or `script.js`, update that asset's `?v=` query parameter in every HTML page that references it, including pages under `services/`.

Use a short integer version, such as `?v=2`, and increment it after each change to the asset. Keep each asset's version consistent across all pages, preserve relative paths, and leave the other asset's version unchanged unless its contents also changed.
