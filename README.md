# StayTrack

Most of the small-to-medium-sized hotel don't have dedicated systems to manage their guests and facilities. They tend to rely on just general spreadsheets or even paper document, which is not only hard to keep it up-to-date but also attracts human mistakes. StayTrack is a tailored web app to manage the stays and streamlines the hotel workers' tasks.

## Features

1. Manage the guest's stay status at a glance. (e.g. check-in/check-out status, payment status, special requests, etc.)
2. Access control depending on the staff role.

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

1. Enable CSV import to get the reservation information from the external booking sites.
2. Add a room management page to track the room status history. (e.g. who cleaned the room, which equipment is missing, etc.)
