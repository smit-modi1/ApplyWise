# Premium Theme System Guide

## Overview
ApplyWise now features a premium design system with 3 cohesive color + font themes, glassmorphism effects, smooth animations, and scroll-triggered interactions.

## Theme Options

### 1. Cyber Neon (Default)
**Bold, Techy, Futuristic**
- Primary: Cyan (#00f5ff)
- Secondary: Purple (#7c3aed)
- Accent: Amber (#f59e0b)
- Best for: Tech companies, startups, modern SaaS

### 2. Ocean Depth
**Calm, Professional, Trustworthy**
- Primary: Cyan (#06b6d4)
- Secondary: Blue (#3b82f6)
- Accent: Green (#10b981)
- Best for: Enterprise, finance, healthcare

### 3. Purple Dream
**Creative, Premium, Elegant**
- Primary: Purple (#a855f7)
- Secondary: Pink (#ec4899)
- Accent: Amber (#f59e0b)
- Best for: Creative agencies, luxury brands

## Features

### Glassmorphism
- Frosted glass effects on cards and navbars
- Backdrop blur with saturation
- Subtle borders and shadows
- Hover state enhancements

### Animations
- Smooth scroll-triggered fade-ins
- Parallax effects on hero section
- Micro-interactions on buttons
- Card tilt effects (desktop only)
- Gradient animations

### Performance
- GPU-accelerated transforms
- RequestAnimationFrame for smooth scrolling
- Reduced motion support
- Lazy-loaded animations

### Accessibility
- Focus-visible states
- Reduced motion preferences
- ARIA labels on theme switcher
- Semantic HTML

## Usage

### Switching Themes
Click the theme switcher in the bottom-right corner to cycle through themes. Your preference is saved in localStorage.

### Adding Video Background
To add a video background to the hero section:

```html
<video class="hero-video-bg" autoplay muted loop playsinline>
  <source src="assets/hero-bg.mp4" type="video/mp4">
</video>
```

Place this inside the `.hero` section, before `.hero-content`.

### Customizing Colors
Edit `themes.css` to modify color variables. All components use CSS variables for easy theming.

## Browser Support
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (backdrop-filter)
- Mobile: Optimized for touch interactions

## Performance Tips
1. Use compressed video files for backgrounds
2. Limit parallax effects on mobile
3. Enable `will-change` only when needed
4. Test with reduced motion preferences
