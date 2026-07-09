# GrowEasy — Next.js (App Router, JavaScript)

Converted from the original Vite + React + `react-router-dom` project.

## What changed

- **Routing**: `react-router-dom`'s `<Routes>/<Route>` in `App.jsx` → Next.js file-based routing. Each route is now a folder under `app/` with a `page.js` (`app/manage-leads/page.js`, `app/lead-sources/page.js`, etc). The `/` → `/lead-sources` redirect is now `redirect()` in `app/page.js`.
- **Layout**: `main.jsx` + the `<Sidebar />` wrapper in `App.jsx` → `app/layout.js` (root layout), wrapped in `AntdRegistry` for correct antd SSR style injection.
- **Navigation**: `NavLink` (react-router) → `next/link`'s `Link` + `usePathname()` for active-state styling in `sidebar.component.jsx`.
- **Components**: originals under `src/components` and `src/pages` moved to `app/_components` and `app/_features` (the underscore prefix keeps Next.js from treating them as routes; also avoids clashing with the legacy Pages Router, which claims any top-level `pages/` folder).
- **Client components**: any component using hooks or browser-only libraries (antd, MUI, lucide-react icons with interactivity) is marked `"use client"` at the top of the file — `sidebar.component.jsx`, `organizationSelector.component.jsx`, `table.component.jsx`, `manageLeads.component.jsx`.
- **Images**: `src/assets/logo.png` moved to `public/logo.png`, rendered via `next/image` instead of a bare `<img>` import.
- **CSS**: `index.css` + `App.css` merged into `app/globals.css`, imported once in the root layout. CSS Modules (`*.module.css`) work unchanged.
- **Minor bugfixes carried along**: removed a duplicate `sx` prop on one MUI `Grid` in `manageLeads.component.jsx`, and added a `key` to the list item in `table.component.jsx` (both were latent bugs in the original, not behavior changes).

## Project structure

```
app/
  layout.js                          root layout (Sidebar + AntdRegistry)
  page.js                            "/" → redirects to /lead-sources
  globals.css
  _components/
    Sidebar/sidebar.component.jsx
    Sidebar/sidebar.module.css
    OrganizationSelector/organizationSelector.component.jsx
    OrganizationSelector/organizationSelector.module.css
    Table/table.component.jsx
    Table/table.module.css
  _features/
    ManageLeads/manageLeads.component.jsx
    ManageLeads/manageLeads.module.css
    ManageLeads/dataSource.js
    LeadSources/leadSources.component.jsx
    LeadSources/leadSources.module.css
    OtherTabs/otherTabs.component.jsx
  manage-leads/page.js
  lead-sources/page.js
  dashboard/page.js
  generate-leads/page.js
  engage-leads/page.js
  team-members/page.js
  ad-accounts/page.js
  whatsapp-account/page.js
  tele-calling/page.js
  crm-fields/page.js
public/
  favicon.svg
  icons.svg
  logo.png
```

## Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` — it redirects to `/lead-sources`. Sidebar links route through `/manage-leads`, `/dashboard`, etc.

## Notes

- Dependency versions in `package.json` are close to the original project's; run `npm install` and let npm resolve to the latest compatible versions, then re-test — especially antd and MUI, since major-version upgrades can introduce breaking API changes.
- `next.config.js` transpiles `antd`/`@mui/material` — needed because they ship untranspiled ESM/CJS mixes that can otherwise break the Next.js build.
- `TableComponent` isn't wired up anywhere yet (it was commented out in the original `ManageLeads` too — `{/* <TableComponent tableData={data} /> */}`), so lead data from `dataSource.js` isn't rendered. That's unchanged from the source project.
