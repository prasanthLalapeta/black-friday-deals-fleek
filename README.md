# Black Friday Deals 🎁

A modern web application to discover and track the best Black Friday deals for developers, built with Next.js 14 and Tailwind CSS.

## Demo

Check out the live demo: [https://black-friday-deals.functions.on-fleek.app/](https://black-friday-deals.functions.on-fleek.app/)

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Motion:** [Framer Motion](https://www.framer.com/motion/)
- **Toast Notifications:** [Sonner](https://sonner.emilkowal.ski/)
- **Font:** [Inter](https://fonts.google.com/specimen/Inter)
- **Deployment:** [Fleek Platform](https://fleek.xyz/) (@fleek-platform/next)

## Features

- 🌓 Dark mode support
- 📱 Fully responsive design
- 🔍 Search and filter deals
- 🗂️ Category-based organization
- 💨 Fast and smooth animations
- 📋 Copy discount codes with one click
- 🔄 Sort deals by various criteria
- 📱 Mobile-first approach
- 🎯 Real-time search filtering
- 📊 Deal count tracking
- 🔗 Direct deal links
- 📱 Responsive grid layout
- 🎨 Clean and modern UI
- ⚡ Optimized performance
- 🚀 Next.js-optimized deployment with Fleek Platform

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, or pnpm
- Fleek CLI (for deployment)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

### Deployment with Fleek

1. Install the required CLIs:
```bash
# Install Fleek CLI
npm install -g @fleekxyz/cli

# Install Fleek Next.js Platform CLI
npm install -g @fleek-platform/next
```

2. Authenticate with Fleek:
```bash
fleek login
```

3. Build your Next.js application with Fleek:
```bash
fleek-next build
```

4. Create a new Fleek function:
```bash
fleek functions create --name black-friday-deals
```

5. Deploy your application:
```bash
fleek functions deploy --bundle=false --path .fleek/dist/index.js --assets .fleek/static --name black-friday-deals
```

Your Next.js application will be deployed as a Fleek function with optimized static assets.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

### Developer
- Built by [Prasanth Lalapeta](https://x.com/heylalapeta)

### Data Source
All deals data is sourced from [Awesome Black Friday & Cyber Monday Deals](https://github.com/trungdq88/Awesome-Black-Friday-Cyber-Monday) repository by [@trungdq88](https://github.com/trungdq88).


