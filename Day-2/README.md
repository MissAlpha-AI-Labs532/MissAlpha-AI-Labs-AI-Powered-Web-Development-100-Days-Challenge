# STAYORA — AI-Powered Hotel Booking Platform

A premium, responsive hotel marketplace frontend built with **React and Vite**.

STAYORA is an AI-powered hotel booking platform designed to simplify hotel discovery, comparison, and booking through an intuitive and responsive user experience.

## Features

### Hotel Discovery
- Search hotels by destination, check-in and check-out dates, and guest count.
- Filter properties by price, rating, and property type.
- Sort hotels by price and rating.
- View detailed hotel information.

### Wishlist Management
- Save and remove favourite hotels.
- Persist wishlist data using browser localStorage.

### Booking Experience
- Validate hotel stay dates.
- Submit local demo booking requests.
- View estimated booking price breakdowns.
- Access locally saved booking requests at `/account/bookings`.

### AI Hotel Finder
- Explore the AI Finder demonstration.
- Match hotels using sample-data matching rules.

### User Experience
- Responsive navigation.
- Login and registration interface.
- Mobile-friendly layouts.
- Interactive animations and modern UI components.

## Technology Stack

- React
- Vite
- JavaScript
- CSS
- Browser localStorage

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/productassociate-sketch/stayora-frontend.git
```

Navigate into the project:

```bash
cd stayora-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at the local URL displayed in your terminal.

### Production Build

Generate the production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
stayora/
├── public/
├── src/
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── store/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Backend Integration

STAYORA is designed to integrate with a Django REST Framework backend.

Planned backend integrations include:

- User registration and authentication.
- Real hotel inventory and availability.
- Booking management and atomic booking holds.
- Payment gateway verification.
- Refund management.
- Hotel partner dashboards.
- AI-powered hotel discovery and recommendation endpoints.

## Current Demo Limitations

**This is a functional frontend demonstration, not a live booking marketplace.**

- Hotel information is based on sample data.
- Demo bookings are stored locally in the browser.
- Wishlist data is stored in browser localStorage.
- No real hotel inventory or availability is checked.
- No actual payments are processed.
- Login and registration interfaces do not currently authenticate users.
- AI Finder uses basic matching rules rather than a live AI model.

A local demo booking must never be treated as a confirmed hotel reservation.

## Security and Production Readiness

Before commercial launch:

- Implement secure backend authentication.
- Connect real hotel inventory and availability APIs.
- Implement atomic booking holds.
- Integrate and verify payment gateway transactions.
- Configure secure environment variables.
- Implement refund workflows.
- Add appropriate backend validation and authorization.

Never expose API keys, passwords, or secret credentials in frontend code or GitHub.

## Repository

**GitHub:** https://github.com/productassociate-sketch/stayora-frontend

## Brand

**STAYORA — Your Stay, Smarter.**
