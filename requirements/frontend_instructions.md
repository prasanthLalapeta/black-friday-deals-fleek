# Project Overview
Follow this guide to create a web app that lets users explore available Black Friday deals from Awesome Black Friday/Cyber Monday - https://github.com/trungdq88/Awesome-Black-Friday-Cyber-Monday/blob/main/README.md, presented as a dashboard with categories and a search feature. and each deal has a button to copy the discount code to clipboard.

# Features
- We will use Next.js, Shadcn, framer-motion and TailwindCSS for the frontend.
- We will use https://github.com/trungdq88/Awesome-Black-Friday-Cyber-Monday/blob/main/README.md to extract the deals from the README.md. 
- Have a nice UI & animations when loading the deals using framer-motion.
- Use dashboard from shadcn to style the UI.
- User can see list of deals with title, description, discount code, and a button to copy the discount code to clipboard.
- User can search the deals by title, description, and category.
- User can filter the deals by category.
- User can sort the deals by title, description, and category.
- User can see the total number of deals and the total number of pages.
- User can navigate to the next page and previous page.
- User can click on a deal to see the details.
- User can click on a category to see the deals in that category.
- User can click on a deal to copy the discount code to clipboard.
- User can click on a deal to open the link in a new tab or modal.
- User can see a loading state when the deals are loading.
- User can see an error state if there is an error loading the deals.
- User can see a toast notification when the discount code is copied to clipboard.
- User can search the deals by title, description, and category.

# Relevant docs
## fetch deals from README.md
- https://github.com/trungdq88/Awesome-Black-Friday-Cyber-Monday/blob/main/README.md#-developer-macos-apps


# Current File Structure

IMAGE-TO-MARKDOWN/
├── .next/
├── app/
│   ├── fonts/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       └── tooltip.tsx
├── hooks/
├── lib/
├── node_modules/
├── requirements/
│   └── frontend_instructions.md
├── .eslintrc.json
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json

# Rules
- All new components should go in /components and be named like example-component.tsx unless otherwise specified.
- All new pages go in /app.
