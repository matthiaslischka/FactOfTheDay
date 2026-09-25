# One Fact of the Day

[![Netlify Status](https://api.netlify.com/api/v1/badges/f3bdbe7f-5637-404e-af32-860265ddd20f/deploy-status)](https://app.netlify.com/projects/onefactoftheday/deploys)

Live site: https://onefactoftheday.netlify.app

## How this site is updated

- `template.html` is the source of truth for the page layout. It contains `{{FACT}}`, `{{SOURCE_URL}}`, `{{SOURCE_LABEL}}`, and `{{DATE}}` placeholders and should **never** be edited to contain real content.
- `index.html` is the actual deployed file, generated from `template.html`. Don't hand-edit it directly — regenerate it instead, or your changes will be overwritten by the next render.
- To render a new fact locally:

  ```sh
  node scripts/render.js \
    --fact "..." \
    --url "https://..." \
    --label "Source: Example.com" \
    --date "YYYY-MM-DD"
  ```

- A scheduled job is intended to run daily: research one interesting fact for the current day, then run `render.js` with the result and push the updated `index.html`.
