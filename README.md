# UMES website

A responsive static website with a homepage and four service pages.

- `index.html`: services, approach, process, FAQs, and contact.
- `services/*.html`: service deliverables, FAQs, and related services.
- `style.css`: shared visual system, mobile layouts, and reduced-motion support.
- `script.js`: mobile navigation, service filters, and navigation dismissal.
- `favicon.svg`: UMES brand mark.
- `scripts/prepare-site.py`: validates local links, anchors, duplicate IDs, and primary headings, then copies public assets into `dist`.

Run `node --check script.js` and `python scripts/prepare-site.py` before publishing. No dependencies or bundler are required. Sites serves `dist`; the existing CNAME remains available for the original hosting setup.

Contact links open the visitor's email application or dialer. There is no submission backend. Google Fonts fall back to system fonts when unavailable. Content and navigation remain usable without JavaScript.
