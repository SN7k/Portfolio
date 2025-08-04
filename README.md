# Light Phone-Inspired Portfolio

A minimalist portfolio website inspired by the Light Phone's philosophy of intentional, distraction-free design. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Minimalist Design**: Clean, uncluttered interface with purposeful typography
- **Triple-State Theme System**: Light → Dark → System preference cycling
- **JetBrains Mono Typography**: Clean monospace font matching Light Phone 3 aesthetic
- **Responsive**: Mobile-first design that works on all devices
- **Data-Driven**: All content is managed through a centralized data structure
- **TypeScript**: Full type safety for better development experience
- **Accessibility**: Proper semantic HTML and ARIA labels
- **System Theme Detection**: Automatically follows OS light/dark mode changes

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **Lucide React** for consistent iconography
- **JetBrains Mono** font family for clean typography
- **Local Storage** for theme persistence

## Project Structure

```
src/
├── components/          # React components
│   ├── About.tsx       # About section with skills
│   ├── Contact.tsx     # Contact form and links
│   ├── Footer.tsx      # Footer component
│   ├── Header.tsx      # Navigation and theme toggle
│   ├── Hero.tsx        # Hero section
│   ├── Projects.tsx    # Projects showcase
│   └── ScrollDots.tsx  # Scroll navigation
├── context/
│   └── ThemeContext.tsx # Triple-state theme system
├── data/
│   └── mockData.ts     # All portfolio data
├── utils/
│   └── dataUtils.ts    # Data utility functions
├── assets/
│   └── images/         # Images and icons
│       └── favicon.svg # Custom favicon
└── App.tsx             # Main app component
```

## Theme System

The portfolio features an advanced triple-state theme system:

### Theme States
1. **Light Mode**: Clean white background with dark text
2. **Dark Mode**: Dark background with light text  
3. **System Mode**: Automatically follows OS preference

### Theme Toggle
- **First Click**: Light mode (Moon icon)
- **Second Click**: Dark mode (Sun icon)
- **Third Click**: System mode (Monitor icon)
- **Fourth Click**: Back to Light mode

### Features
- Real-time system preference detection
- Smooth transitions between themes
- Persistent user preferences
- Automatic OS theme following

## Typography

The portfolio uses **JetBrains Mono** font family for a clean, technical aesthetic that matches the Light Phone 3 design philosophy:

- **Primary Font**: JetBrains Mono (monospace)
- **Fallback Fonts**: Fira Code, SF Mono, Monaco
- **Sans-serif**: Inter for non-monospace text
- **Font Weights**: 300, 400, 500, 600, 700

## Data Structure

All portfolio content is managed in `src/data/mockData.ts`:

### Personal Information
```typescript
export const personalInfo: PersonalInfo = {
  name: "SHOMBHUNATH KARAN",
  title: "ASPIRING FULL-STACK DEVELOPER",
  subtitle: "Focused on Performance, Usability, and Clean Code",
  email: "shombhunathkaran@gmail.com",
  github: "https://github.com/sn7k",
  linkedin: "https://linkedin.com/in/shombhunath-karan"
};

```

### Skills
Skills are organized by category (frontend, backend, design, tools):
```typescript
export const skills: Skill[] = [
  { name: "REACT", category: "frontend" },
  { name: "TYPESCRIPT", category: "frontend" },
  // ... more skills
];
```

### Projects
Projects include detailed information and can be marked as featured:
```typescript
export const projects: Project[] = [
  {
    id: 1,
    name: "INCAMPUS",
    description: "InCampus is a secure college-only platform where students and faculty can share memories, post updates, and connect through a clean, modern interface.",
    tech: ["REACT.JS", "TYPESCRIPT","TAILWIND CSS","NODE.JS", "EXPRESS.JS", "MONGODB","CLOUDINARY", "JWT", "OTP AUTH"],
    github: "https://github.com/SN7k/InCampus",
    demo: "https://incampus1.netlify.app/",
    featured: true
  }
];
```

### About Section
Background and philosophy content:
```typescript
export const aboutSection: AboutSection = {
  background: [
    "Passionate developer focused on creating clean, functional digital experiences...",
    // ... more paragraphs
  ]
};
```

## Customization

### 1. Update Personal Information
Edit `src/data/mockData.ts` to change:
- Name, title, and subtitle
- Email and social media links
- Profile information

### 2. Add/Remove Skills
Modify the `skills` array in `mockData.ts`:
```typescript
{ name: "YOUR_SKILL", category: "frontend" }
```

### 3. Manage Projects
Add new projects to the `projects` array:
```typescript
{
  id: 7,
  name: "YOUR_PROJECT",
  description: "Project description",
  tech: ["TECH1", "TECH2"],
  github: "https://github.com/your-repo",
  demo: "https://your-demo.com",
  featured: true // Set to false to hide from main view
}
```

### 4. Update About Content
Modify the `aboutSection` object to change background and philosophy text.

### 5. Customize Theme
Modify `src/context/ThemeContext.tsx` to adjust theme behavior or add new theme states.

### 6. Update Typography
Modify `tailwind.config.js` to change font families or add new font weights.

## Development

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Design Philosophy

This portfolio embodies the Light Phone's core principles:

1. **Intentional Design**: Every element serves a purpose
2. **Minimal Typography**: JetBrains Mono for clean, technical feel
3. **Reduced Distractions**: No unnecessary animations or visual noise
4. **Essential Information**: Only the most important content is presented
5. **Clean Interactions**: Subtle, purposeful hover states and transitions
6. **System Integration**: Respects user's OS preferences

## Features in Detail

### Advanced Theme System
- Triple-state theme cycling (Light → Dark → System)
- Automatic system preference detection
- Real-time OS theme change listening
- Local storage persistence for manual choices
- Visual indicators for current theme state

### Navigation
- Fixed header with smooth scrolling
- Scroll dots indicator with active states
- Responsive navigation menu
- Theme toggle with state indicators

### Contact Form
- Real-time validation
- Error handling and display
- Loading states during submission
- Form reset after successful submission

### Skills Organization
- Categorized by type (frontend, backend, design, tools)
- Interactive category navigation
- Clean grid layout with hover effects
- Consistent styling across categories

### Project Showcase
- Featured projects filter
- External link handling
- Tech stack display
- Hover effects and transitions
- Responsive grid layouts

### Assets Management
- Organized image folder structure
- Custom SVG favicon
- Optimized asset loading
- Scalable vector graphics

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized with Vite for fast builds
- Minimal bundle size
- Efficient React rendering
- Optimized images and assets
- Font optimization with Google Fonts

## License

MIT License - feel free to use this portfolio for your own projects. 