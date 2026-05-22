# Suwave MVC Route Plan

## Goal

Prepare Suwave to grow beyond the current single-screen prototype by separating routes, feature components, shared UI, data models, and controller logic with English names.

This document plans the refactor only. The first implementation should preserve the current visual flow before adding new product features.

## Current State

The project currently uses the Next.js App Router with:

```text
src/app/
  _components/
    suwave-home.tsx
    suwave-home.module.css
  layout.tsx
  manifest.ts
  page.tsx
```

`src/app/page.tsx` renders `SuwaveHome`, and `SuwaveHome` currently owns:

- Splash screen and PWA install sheet.
- Home header, search, promo banner, categories, marketplace listing cards, and bottom menu.
- The categories and jobs menu screen.
- The list of companies with open jobs.
- The company description and vacancy list screen.
- Mock arrays for listings, job companies, and vacancies.
- Screen navigation with local `screen` state instead of route navigation.

That is good for a prototype, but it will become expensive to maintain as more categories, companies, listings, user flows, and API data are added.

## Next.js Direction

Use the App Router as the route layer:

- A folder segment plus `page.tsx` exposes a page route.
- Route-specific code can stay close to the route.
- Private folders such as `_components`, `_lib`, and `_controllers` help separate implementation details from routing.
- Shared UI that is reused across features should live outside route-specific folders.

The recommended project strategy is:

1. Keep pages in `src/app`.
2. Keep components used by only one feature inside that feature route.
3. Keep reusable components and cross-feature helpers in `src/shared`.
4. Introduce MVC responsibilities without forcing a classic server MVC shape onto React.

## Naming Recommendation

Use English for folders, files, types, hooks, and exported components.

| Current idea | Recommended English name | Reason |
| --- | --- | --- |
| `home` | `home` | Clear and already common. |
| `emprego-menu` | `jobs` or `job-categories` | The domain is jobs, and the screen starts the jobs flow. |
| `empresa-list` | `company-list` | Clear component name. |
| `empresa-description` | `company-details` | Details scales better than description when vacancies, contact, and metadata grow. |
| `empresa` route | `companies` | Collection routes should normally use plural nouns. |
| `anuncio` route | `listings` | In a marketplace, a posted item or service is usually a listing. |
| `menu` shared component | `bottom-navigation` | Describes its UI responsibility. |
| `back` shared component | `back-button` | Describes the element and behavior. |
| `compartilhar` shared component | `share-button` | Keeps shared UI naming in English. |

### Route name note

Prefer `listings` for marketplace posts. Use `ads` only if the feature is paid advertising, sponsored placement, or campaign management.

## Recommended Routes

The current flow should become real pages:

| Current screen | URL | Route file |
| --- | --- | --- |
| Home | `/` | `src/app/page.tsx` |
| Jobs menu | `/jobs` | `src/app/jobs/page.tsx` |
| Companies with open jobs | `/jobs/companies` | `src/app/jobs/companies/page.tsx` |
| Company details and vacancies | `/companies/[companySlug]` | `src/app/companies/[companySlug]/page.tsx` |
| Listing area | `/listings` | `src/app/listings/page.tsx` |
| Create listing later | `/listings/new` | `src/app/listings/new/page.tsx` |

This keeps the jobs journey explicit while allowing company pages to be reused outside the jobs flow later.

Example:

```text
/jobs
  -> /jobs/companies
  -> /companies/supermercado-bino
```

## Proposed Structure

```text
src/
  app/
    layout.tsx
    manifest.ts
    page.tsx

    _components/
      app-shell.tsx
      install-sheet.tsx
      splash-screen.tsx
      device-status-bar.tsx

    _controllers/
      use-install-prompt.ts

    home/
      _components/
        category-grid.tsx
        home-header.tsx
        listing-card.tsx
        marketplace-feed.tsx
        promo-banner.tsx

    jobs/
      page.tsx
      _components/
        job-category-menu.tsx
      _controllers/
        use-job-category-menu.ts
      companies/
        page.tsx
        _components/
          company-list.tsx
          company-row.tsx
          jobs-search.tsx

    companies/
      [companySlug]/
        page.tsx
        _components/
          company-about.tsx
          company-header.tsx
          company-hero.tsx
          company-logo.tsx
          vacancy-list.tsx
          vacancy-row.tsx

    listings/
      page.tsx
      _components/
        listing-grid.tsx
      new/
        page.tsx
        _components/
          listing-form.tsx

  models/
    company.ts
    job.ts
    listing.ts

  repositories/
    company-repository.ts
    job-repository.ts
    listing-repository.ts

  shared/
    navigation/
      back-button.tsx
      bottom-navigation.tsx
    actions/
      share-button.tsx
    motion/
      motion-variants.ts
```

## Small Structure Alternative

If the first refactor should stay lighter, start with this smaller structure:

```text
src/
  app/
    page.tsx
    _components/
      app-shell.tsx
      install-sheet.tsx
      splash-screen.tsx

    jobs/
      page.tsx
      _components/
        job-category-menu.tsx
      companies/
        page.tsx
        _components/
          company-list.tsx

    companies/
      [companySlug]/
        page.tsx
        _components/
          company-details.tsx
          vacancy-list.tsx

    listings/
      page.tsx

  models/
    company.ts
    job.ts
    listing.ts

  shared/
    navigation/
      back-button.tsx
      bottom-navigation.tsx
    actions/
      share-button.tsx
```

Start small if most data is still mocked. Add repositories and controllers when data fetching, filtering, mutations, and shared business rules arrive.

## MVC Adapted to Next.js

In this project, MVC should mean clear responsibility boundaries:

### Model

Models describe domain data and rules.

Recommended examples:

```text
src/models/company.ts
src/models/job.ts
src/models/listing.ts
```

Possible types:

```ts
export type Company = {
  id: string;
  slug: string;
  name: string;
  segment: string;
  city: string;
  state: string;
};
```

Models should not import page components or CSS modules.

### View

Views render UI.

In App Router, views include:

- `page.tsx` files as route entry points.
- Route-local `_components`.
- Shared visual components such as buttons and navigation.

Pages should compose UI and pass data down. Large view blocks should move into components.

### Controller

Controllers coordinate behavior between pages, models, repositories, navigation, and UI state.

In this frontend-first phase, controllers can be:

- Route-level hooks such as `use-job-category-menu.ts`.
- Server-side page orchestration when pages fetch data.
- Server actions or route handlers later when mutations arrive.

Avoid keeping controller logic inside large visual components when it starts handling routing, filters, install prompts, forms, and API state together.

## Responsibility Rules

### Pages

`page.tsx` should:

- Define the route entry.
- Load or receive data for that route.
- Compose feature components.
- Keep route metadata close when needed.

`page.tsx` should not become a large visual component with every list item, modal, hook, and mock array in the same file.

### Route Components

Route-local components should:

- Stay inside that route when they are not reused elsewhere.
- Use a name that describes the rendered UI.
- Receive typed props instead of reading unrelated route state.

### Shared Components

Shared components should be truly reusable.

Recommended first shared components:

```text
src/shared/navigation/bottom-navigation.tsx
src/shared/navigation/back-button.tsx
src/shared/actions/share-button.tsx
```

Do not move a component to `shared` just because it might be reused one day.

### Data

Move the current mock arrays out of the large home component:

```text
src/repositories/listing-repository.ts
src/repositories/company-repository.ts
src/repositories/job-repository.ts
```

During the prototype phase, repositories may return local mock data. Later, the same call sites can move to API or database-backed implementations.

## Route-Specific Mapping

### Home

Keep `/` focused on the marketplace entry experience.

Suggested split:

```text
home-header.tsx
promo-banner.tsx
category-grid.tsx
marketplace-feed.tsx
listing-card.tsx
```

The home page should link to `/jobs` when the user enters the jobs flow.

### Jobs

Use `/jobs` for the job category menu.

Suggested split:

```text
job-category-menu.tsx
```

If the generic category menu remains broader than jobs, consider a later `/categories` route. For the current screenshots and journey, `/jobs` is the clearest boundary.

### Job Companies

Use `/jobs/companies` for the current list of companies with vacancies.

Suggested split:

```text
jobs-search.tsx
company-list.tsx
company-row.tsx
```

Each company row should navigate with a company slug instead of selecting a local screen state.

### Company Details

Use `/companies/[companySlug]` for a company page.

Suggested split:

```text
company-header.tsx
company-logo.tsx
company-hero.tsx
company-about.tsx
vacancy-list.tsx
vacancy-row.tsx
```

This page can show company details and vacancies now, and later support services, products, reviews, contact actions, and saved companies.

### Listings

Use `listings` for marketplace announcements.

Suggested start:

```text
src/app/listings/page.tsx
src/app/listings/_components/listing-grid.tsx
src/app/listings/new/page.tsx
src/app/listings/new/_components/listing-form.tsx
```

The bottom menu item labeled `Anunciar` can later navigate to `/listings/new`.

## Navigation Plan

Replace the current local screen switching with route navigation:

- Use `Link` for normal page-to-page navigation.
- Use a shared `BackButton` when the design needs an explicit icon action.
- Keep `BottomNavigation` shared when the same bottom menu appears across multiple pages.
- Use route-aware active state later so the bottom menu highlights the correct section.

Expected route transitions:

```text
Home category action -> /jobs
Open jobs action -> /jobs/companies
Company row -> /companies/[companySlug]
Back from company -> /jobs/companies
Announce action -> /listings/new
```

## Styling Plan

The current `suwave-home.module.css` is likely too broad for route ownership after the split.

Recommended progression:

1. Keep the existing CSS module during the first extraction if that lowers risk.
2. Move styles to route-local CSS modules as route components stabilize.
3. Keep only truly shared styles in global CSS or shared UI modules.

Possible later split:

```text
home.module.css
jobs.module.css
company-details.module.css
bottom-navigation.module.css
```

## Migration Steps

### Phase 1: Establish boundaries

1. Extract shared UI from the large home component.
2. Extract the install prompt behavior into a controller hook.
3. Extract domain types for `Company`, `JobVacancy`, and `Listing`.
4. Move mock data behind repository files or clearly named mock data modules.

### Phase 2: Turn screens into pages

1. Keep home at `/`.
2. Create `/jobs`.
3. Create `/jobs/companies`.
4. Create `/companies/[companySlug]`.
5. Replace local screen changes with route links.

### Phase 3: Prepare marketplace listings

1. Create `/listings`.
2. Create `/listings/new` when the post-listing flow is ready.
3. Connect `BottomNavigation` actions to actual routes.

### Phase 4: Grow data and behavior

1. Add real repository implementations when API data is introduced.
2. Add filters and search state near the route that owns them.
3. Add loading, error, and not-found UI per route when remote data arrives.
4. Add focused tests around route behavior and high-risk UI flows.

## First Refactor Target

The best first implementation target is:

```text
src/app/page.tsx
src/app/jobs/page.tsx
src/app/jobs/companies/page.tsx
src/app/companies/[companySlug]/page.tsx
src/shared/navigation/bottom-navigation.tsx
src/shared/navigation/back-button.tsx
src/shared/actions/share-button.tsx
```

That split removes the current `screen` switch as the main navigation mechanism and gives the project stable places to grow.

## Decisions to Keep Consistent

- Use English names in code and folders.
- Prefer plural route collections: `companies`, `jobs`, `listings`.
- Prefer `_components` for route-private UI inside `src/app`.
- Prefer `src/shared` only for reused UI or cross-feature helpers.
- Prefer `models` for domain types and `repositories` for data access boundaries.
- Keep page files thin and route-focused.
- Do not place all future categories back into one large page component.
