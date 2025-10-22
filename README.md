# You Better Vote

A simple backlog refinement story point voting tool built with [Next.js](https://nextjs.org).

## Features

- Create and join voting rooms with unique IDs
- Room existence is checked before joining
- Persistent room storage using a local `rooms.json` file (for development)
- Light/dark mode support
- Custom theme colors

## Getting Started

1. **Install dependencies:**

   ```bash
   p/npm install
   # or
   yarn install
   ```

2. **Create a `rooms.json` file in your project root:**
   ```json
   {}
   ```
   > This file is used for storing active rooms. It is ignored by git.

3. **Run the development server:**
   ```bash
   pnpm dev
   # or
   yarn dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Project Structure

- `app/page.tsx` – Home/login page, create room button
- `app/room/page.tsx` – Voting room page
- `app/api/createRoom/route.ts` – API route to create rooms
- `app/api/checkRoom/route.ts` – API route to check if a room exists
- `rooms.json` – Stores active room IDs (not committed to git)

## Development Notes

- **Room storage:** This project uses a simple JSON file for room persistence. For production, use a real database.
- **Theme:** Custom colors are defined in `app/globals.css` and can be extended in `tailwind.config.mjs`.
- **.gitignore:** `rooms.json` is ignored by default.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
