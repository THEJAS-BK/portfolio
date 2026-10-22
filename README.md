# Build a Premium 3D Developer Portfolio with React

## Role
Act as a senior frontend engineer, creative developer, and UI/UX designer specializing in premium developer portfolios, interactive 3D websites, and minimalist digital experiences.

Design and develop a complete, production-ready personal portfolio website using React, with exceptional attention to typography, spacing, animations, responsiveness, accessibility, and performance.

## 1. Technology Stack
- React with Vite
- TypeScript
- Tailwind CSS
- Three.js with React Three Fiber and Drei for 3D scenes
- Framer Motion (Motion for React) for UI animations and transitions
- Lucide React for icons
- React Router only if multiple routes are necessary

Use the latest mutually compatible stable package versions. Keep dependencies minimal and avoid unnecessary libraries.

## 2. Design Direction
Create a portfolio that feels like a combination of a high-end digital studio website, an experimental creative developer portfolio, and a minimalist editorial design.

**Visual characteristics:**
- Minimalistic, premium, futuristic, and technically sophisticated
- Dark background using near-black, charcoal, and subtle gray tones
- White typography with a restrained accent color, such as electric blue or muted violet
- Oversized typography and strong visual hierarchy
- Generous negative space
- Thin borders, subtle gradients, and carefully controlled glow effects
- Smooth transitions and refined micro-interactions
- Beautiful composition across desktop, tablet, and mobile

Avoid generic AI-generated website aesthetics, excessive gradients, excessive rounded cards, unnecessary glassmorphism, constant glowing effects, and cluttered layouts.

The result should look intentionally art-directed, not like a standard portfolio template.

## 3. Hero Section
Make the first screen visually striking.

Include:
- A small availability indicator: "Available for opportunities"
- A large headline:
  "Building digital experiences that work beautifully."
- A short introduction describing me as a computer science student and developer interested in full-stack engineering, interactive applications, and system design.
- Primary CTA: "Explore my work"
- Secondary CTA: "Get in touch"
- A subtle scroll indicator
- A compact technology or role label

### 3D centerpiece
Create an interactive 3D object using React Three Fiber.

Creative direction:
- An abstract metallic orb, geometric sculpture, wireframe structure, or floating architectural form
- Subtle lighting, realistic material response, and a restrained accent color
- Gentle floating motion and smooth mouse-responsive rotation
- An elegant camera composition that complements the typography
- Soft shadows and restrained post-processing, only where beneficial

The 3D element should feel integrated into the layout, not like a random object placed behind the text.

Keep text readable and ensure the 3D object never interferes with important buttons or navigation.

On mobile, simplify the scene or replace it with a lightweight alternative.

## 4. Navigation
Build a minimal, polished navigation bar containing:
- Personal wordmark or initials
- About
- Projects
- Skills
- Contact

Requirements:
- Fixed or sticky navigation where appropriate
- Smooth scrolling
- Clear hover and active states
- Responsive mobile menu
- Subtle background treatment when scrolling
- Keyboard-accessible controls

Keep the navigation compact and avoid unnecessary visual elements.

## 5. About Section
Introduce me as a computer science and engineering student focused on building practical software and understanding how systems work.

Use concise, confident writing rather than exaggerated claims.

Include:
- Short personal introduction
- Areas of interest
- Current learning focus
- A compact set of technical interests

Use an editorial layout with strong typography, asymmetrical spacing, and minimal decoration.

## 6. Selected Projects
Create a visually distinctive project showcase. Projects must be rendered from a reusable data structure rather than duplicated markup.

Use these initial project examples, keeping all information editable:

### Sahayak
A community assistance platform connecting senior citizens with trusted people who can help them with everyday needs.
- Technologies: Flutter, React, TypeScript, Node.js, PostgreSQL
- Highlight: Voice-first assistance and real-time communication

### Issue Tracker
A collaborative issue management application for tracking tasks, responsibilities, and project progress.
- Technologies: JavaScript, Node.js, Express, MongoDB
- Highlight: REST APIs,