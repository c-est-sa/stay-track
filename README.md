# StayTrack

Most of the small-to-medium-sized hotels don't have dedicated systems to manage their guests and facilities. They tend to rely on just general spreadsheets or even paper documents, which is not only hard to keep up-to-date but also prone to human mistakes. StayTrack is a tailored web app to manage the stays and streamline the hotel workers' tasks.

## Features

1. View and manage the guest's stay status at a glance. (e.g. check-in/check-out status, payment status, special requests, etc.)
   ![guest view screen](https://github.com/user-attachments/assets/a6850999-45f8-4b50-858d-f74da5d16f7b)
   ![guest details screen](https://github.com/user-attachments/assets/a3ffdba0-7cf8-43b4-85a2-3ad492d781d1)

2. View and manage staff accounts, and have access control depending on the roles.
   ![staff list screen](https://github.com/user-attachments/assets/7157259a-0ca7-452c-a52d-a12ab2a9e702)
   ![staff details screen](https://github.com/user-attachments/assets/095022ad-93e7-458d-ba94-2217c63aaece)

## Running The Project

\*sign-in info is below

Live version: [Stay-Track](https://stay-track.vercel.app/signin)

From the repo:

1. Clone this project locally
2. Run `npm install` in your bash / command line
3. Run `npm run dev` in your bash / command line
4. Sign into the app and play around!

### Sign-In Info:

```
Admin account:
 email: adminsample@email.com
 password: adminsample

Reception account:
 email: receptionsample@email.com
 password:receptionsample
```

## Dependencies

- Supabase (database and auth)
- Prisma ORM
- React Hook Form
- Zod
- shadcn/ui
- Tailwind CSS
- ESLint
- Next.js
- Vercel

## Future Features

1. Enable CSV import to get the reservation information from external booking sites.
2. Add a room management page to track the room status history. (e.g. who cleaned the room, which equipment is missing, etc.)
