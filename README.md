# Wood Panels

Wood Panels is a catalog of sheet goods: chipboard, MDF, plywood, and solid wood. Visitors browse sheets by size and price in euro. A signed-in user can publish a sheet, edit or delete their own listings, save a wishlist, and comment.

## How to run

Requires Node.js.

```bash
npm install
npm run dev
```

Open the address Vite prints, usually `http://localhost:5173`.

Create a file named `.env.local` in the project root. It is not committed. It needs the Supabase project URL, including `/rest/v1`, and the publishable key:

```
VITE_SUPABASE_URL=https://your-project.supabase.co/rest/v1
VITE_SUPABASE_ANON_KEY=your-publishable-key
```

Restart `npm run dev` after changing that file.

Other scripts:

```bash
npm run build
npm run preview
npm run lint
```

## Architecture

The app is a Vite + React single-page application. Routing is in `src/App.jsx` with React Router.

- `src/components/` holds one folder per component. Styles are CSS files next to the component.
- `src/hooks/` holds custom hooks. `useAuth` reads the signed-in user. `usePanels` loads a sheet list.
- `src/context/` shares the signed-in user through the Context API.
- `src/utils/request.js` sends REST requests to Supabase. The app does not use the Supabase JavaScript SDK.
- The loading indicator uses the `react-spinners` package.

The backend is Supabase. Panel rows live in `public.panels`. Comments live in `public.comments`. Accounts live in Supabase Auth, not in a public users table.

## Deployment

Supabase already hosts the database and authentication, so there is no separate backend server to deploy.

Frontend: 

## Functional Guide

### 1. Project Overview

**Application name:** Wood Panels

**Application category / topic:** Product catalog

**Main purpose:** The application lists wood-based sheets with their material, size, thickness, price, photo, and description. A buyer can compare sheets and open one for the full details. A signed-in user can publish a listing, keep a private wishlist, and leave comments.

### 2. User Access & Permissions

**Guest (not authenticated)**

Available pages: `/`, `/catalog`, `/catalog/:id`, `/login`, `/register`, and the 404 page for an unknown address.

Public data: sheet name, material, dimensions, price, image, description, and the comments on that sheet. The author email of a sheet is stored, but it is not shown on the card or the details page.

A guest does not see Wishlist, New listing, Edit, Delete, or the comment form. Opening `/wishlist`, `/panels/new`, or `/panels/:id/edit` sends them to `/login`.

**Authenticated user**

The header shows Wishlist, New listing, the user email, and Sign out. Sign in and Register are hidden.

Main sections: the same public pages, plus `/wishlist`, `/panels/new`, and `/panels/:id/edit`.

Details pages: `/catalog/:id` shows one sheet. The author also sees Edit and Delete there. Any signed-in user can add the sheet to the wishlist and post a comment. A user can delete only their own comment.

Create / Edit / Delete: New listing creates a panel. Edit and Delete are shown only when the signed-in email matches `author`.

### 3. Authentication & Session Handling

**Authentication flow**

When the app loads, `AuthProvider` reads `localStorage`. If a user object is stored, the header renders the signed-in menu.

Login sends the email and password to Supabase Auth (`/auth/v1/token?grant_type=password`). On success the app stores the email and access token, then navigates home.

Registration creates the account, then navigates to Sign in and shows "Account created. Sign in with your email and password." It does not sign the user in by itself.

Logout clears the stored user and navigates home. The header returns to Sign in and Register.

**Session persistence**

The session is kept in `localStorage` under the key `user`, and shared with components through Context. After a refresh, `AuthProvider` reads that key again, so the user stays signed in.

### 4. Routing Structure

**Route guards**

`Private` wraps `/wishlist`, `/panels/new`, and `/panels/:id/edit`. Without a user it renders a redirect to `/login`.

`Login` and `Register` redirect to `/` when a user is already signed in, so those pages are not available to them.

**Main routes**

| Path | Page |
| --- | --- |
| `/` | Latest sheets |
| `/catalog` | Full catalog |
| `/catalog/:id` | Sheet details |
| `/login` | Sign in |
| `/register` | Register |
| `/wishlist` | Saved sheets, private |
| `/panels/new` | New listing, private |
| `/panels/:id/edit` | Edit listing, private |
| any other path | 404 |

**Nested and parameterized routes**

There is no nested layout route. The header, banner, and footer wrap every page in `App`.

Parameterized routes: `/catalog/:id` and `/panels/:id/edit`.

### 5. List → Details Flow

**Catalog / list page**

Home and Catalog load sheets from Supabase, newest first. Each card shows the photo, material, price, name, size, thickness, and the date it was added.

Catalog has material filters: All, MDF, Plywood, Chipboard, and Solid wood. The filter runs in the browser on the loaded list.

**Details page**

A card is a `Link` to `/catalog/:id`. The details page reads `id` with `useParams` and requests that one row. It shows the photo, price, dimensions, description, comments, and, for the author, Edit and Delete.

### 6. Data Source & Backend

**Backend type:** Supabase (hosted Postgres, Auth, and REST). The React app talks to it with `fetch` in `src/utils/request.js`.

Wishlist ids are stored in `localStorage` for the signed-in email. The sheet records themselves still come from Supabase.

### 7. Data Operations (CRUD)

The collection is `panels`.

**Create:** The New listing form sends `POST /panels`. The author column is set to the signed-in email. There is no author field on the form. After a successful save the app opens the catalog.

**Read:** Home and Catalog send `GET /panels?order=created_at.desc`. Details sends `GET /panels?id=eq.{id}`. Comments are read with `GET /comments?panel_id=eq.{id}`.

**Update:** Edit listing loads the same row, and only the author can open it. Save sends `PATCH /panels?id=eq.{id}` with the user access token. The app then returns to that sheet's details page, which loads the updated row.

**Delete:** On the details page the author confirms, then the app sends `DELETE /panels?id=eq.{id}` and navigates to the catalog. Deleting a sheet also removes its comments in the database.

A comment is created with `POST /comments` and deleted by its author with `DELETE /comments?id=eq.{id}`. The list on the page updates from the response.

### 8. Forms & Validation

**Forms used**

- Register: email, password, confirm password
- Sign in: email, password
- New listing and Edit listing: name, material, width, height, thickness, price, image URL, description
- Comment: message

Inputs are controlled with `value` and `onChange`. An empty required field shows "This field is required." after the user leaves it (`onBlur`).

**Validation rules**

- Email: required, and the value must contain `@`.
- Password: required, and it must be at least 6 characters. On registration it must also match the confirm password field.
- Image URL: required, and it must start with `http://` or `https://`.

Width, height, and thickness must be whole numbers greater than 0. Price must be a number greater than 0.

### 9. React-Specific Techniques

**Hooks and component lifecycle**

`useState` holds form values, loaded records, errors, and loading flags. `useEffect` loads data when a page mounts. `usePanels` uses that effect for Home, Catalog, and Wishlist. On the details page the effect depends on `id`, so opening another sheet updates the request. Leaving the page unmounts that component and React Router renders the next one. `useParams`, `useNavigate`, and `useLocation` come from React Router.

While a list or a sheet is loading, the page shows a spinner from `react-spinners`.

**Context API**

`AuthContext` shares `user`, `saveUser`, and `clearUser`. The header, the private routes, login, register, details, comments, wishlist, and the listing forms read it through `useAuth`.

**Component styling**

Each screen has its own CSS file. The spinner color and size are in `Spinner.css`. The spinner animation comes from `react-spinners`.

### 10. Typical User Flow

1. A guest opens the catalog and filters by material.
2. They open a sheet, read the description and comments, then register.
3. After the success message they sign in. The header shows their email.
4. They publish a sheet, comment on it, edit the price, and can delete the listing.

### 11. Error and Edge Case Handling

Authentication errors from Supabase are shown on the form. The message is the one returned by the server, for example "Email not confirmed".

Failed panel, comment, and account requests show that same server message on the page. Loading uses the spinner. Submit buttons show "Signing in...", "Publishing...", "Saving...", or "Sending..." and are disabled while the request runs.

An empty catalog or home page says "No sheets yet." A material filter with no matches says "No sheets of this material yet." A missing sheet says "Sheet not found." An unknown address shows "404 not found." A wishlist with nothing saved says "No saved sheets yet." A sheet with no comments says "No comments yet."
