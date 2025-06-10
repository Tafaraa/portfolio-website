# Tafara Mutsvedu Portfolio Website

![Performance Score](https://img.shields.io/badge/Performance-100-brightgreen)
![Accessibility Score](https://img.shields.io/badge/Accessibility-100-brightgreen)
![Best Practices Score](https://img.shields.io/badge/Best_Practices-100-brightgreen)
![SEO Score](https://img.shields.io/badge/SEO-100-brightgreen)

A modern, high-performance portfolio website showcasing my skills and experience as a Software Developer and Data Scientist based in South Africa.
Visit my website: [mt.](https://mutsvedutafara.com)


## 🚀 Features

- **Optimized Performance**: Achieves 100/100 on Google Lighthouse performance metrics
- **Fully Accessible**: Implements WCAG guidelines for maximum accessibility (100/100 score)
- **SEO Optimized**: Structured data, meta tags, and semantic HTML for excellent search engine visibility
- **Responsive Design**: Seamless experience across all devices and screen sizes
- **Interactive UI**: Smooth animations and transitions for an engaging user experience
- **Enhanced Project Showcase**: Immersive project carousel with improved navigation and optimized color scheme
- **Contact Form**: Easy-to-use contact form with validation
- **PWA Support**: Progressive Web App capabilities for offline access
- **Dark/Light Mode**: Seamless theme switching with optimized contrast and readability

**Note on Functionality**: Some features, such as the contact form and certain integrations, require private API keys and configurations that are not included in this public repository for security and intellectual property reasons. To access the full functionality or for detailed setup instructions, please contact me directly at [your_email@example.com] or through my website at [https://mutsvedutafara.com/contact].

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Build Tool**: Vite with advanced optimization configurations
- **Routing**: React Router for seamless navigation
- **Animation**: Framer Motion for smooth UI transitions
- **Map Integration**: Mapbox GL
- **Icons**: Lucide React
- **Form Handling**: EmailJS with real-time validation
- **CSS Architecture**: CSS Modules for component-scoped styling
- **Performance Utilities**: Custom hooks and utilities for lazy loading, throttling, and debouncing
- **Image Optimization**: Custom OptimizedImage component with priority loading and skeleton placeholders
- **Theme Management**: Dark/light mode with system preference detection

## 💼 Project Structure

```
portfolio-website/
├── public/             # Static assets
├── src/                # Source code
│   ├── components/     # React components
│   │   ├── common/       # General purpose, widely used components
│   │   ├── layout/       # Components for app layout (Header, Footer)
│   │   └── ui/           # Reusable UI elements (buttons, inputs, images)
│   ├── contexts/       # React Contexts for global state management
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page-level components, usually mapped to routes
│   │   ├── home/         # Homepage specific components
│   │   └── */            # Other individual page directories (e.g., about, contact)
│   ├── services/       # API integrations, data fetching, external services
│   ├── types/          # TypeScript type definitions and interfaces
│   ├── utils/          # Utility functions (lazy loading, performance, helpers)
│   ├── App.tsx         # Main application component and routing setup
│   └── main.tsx        # Application entry point (React DOM rendering)
├── index.html          # HTML template with optimized meta tags
├── vite.config.ts      # Enhanced Vite configuration with optimizations
└── tailwind.config.js  # TailwindCSS configuration
```

## 🔧 Performance Optimizations

This website implements several performance optimizations to achieve a perfect Lighthouse score:

1. **Code Splitting**: Separates vendor code from application code with granular chunk naming
2. **Lazy Loading**: Components and images load only when needed with intersection observer
3. **Font Optimization**: Variable fonts with font-display: swap for faster text rendering
4. **Image Optimization**: Advanced image loading with responsive sizing, lazy loading, and priority loading for LCP
5. **Enhanced Project Showcase**: Optimized carousel with efficient DOM updates, improved color contrast, and smooth transitions
6. **Minification**: All JavaScript and CSS is minified for production with Terser optimizations
7. **Tree Shaking**: Removes unused code from the final bundle
8. **Caching Strategy**: Proper cache headers and asset naming for optimal resource caching
9. **Preloading**: Critical resources are preloaded for faster rendering
10. **Reduced Motion**: Respects user preferences for reduced motion
11. **Mobile Optimizations**: Adaptive loading based on device type with smaller resource thresholds for mobile
12. **CSS Modules**: Component-scoped CSS to prevent style conflicts and improve maintainability

## ♿ Accessibility Features

The website is built with accessibility as a priority:

1. **Semantic HTML**: Proper use of HTML5 elements for better structure
2. **ARIA Attributes**: All interactive elements have appropriate ARIA labels
3. **Keyboard Navigation**: Full keyboard support for all interactive elements
4. **Focus Management**: Visible focus indicators for keyboard users
5. **Color Contrast**: All text meets WCAG AA contrast requirements with optimized dark/light mode
6. **Screen Reader Support**: Compatible with popular screen readers
7. **Alternative Text**: All images have descriptive alt text
8. **Skip Navigation**: Allows keyboard users to bypass navigation menus
9. **Reduced Motion**: Respects prefers-reduced-motion media query
10. **Form Validation**: Accessible error messages and form controls

## 🔍 SEO Optimizations

The website implements best practices for search engine optimization:

1. **Structured Data**: JSON-LD for rich search results
2. **Meta Tags**: Comprehensive meta tags for better indexing
3. **Canonical URLs**: Proper canonical URLs to prevent duplicate content
4. **Semantic HTML**: Helps search engines understand content structure
5. **Mobile Friendly**: Fully responsive design for all devices
6. **Performance**: Fast loading times improve search rankings
7. **Sitemaps**: XML sitemap for better crawling

## 🌐 Browser Compatibility

The website is optimized for all modern browsers with special attention to cross-browser compatibility:

1. **Modern Browsers**: Chrome, Firefox, Safari, Edge fully supported
2. **Theme Color Support**: Custom implementation for Firefox and Opera compatibility
3. **CSS Compatibility**: Fallbacks for older browsers where needed
4. **Media Queries**: Proper support for dark mode across all browsers
5. **Polyfills**: Automatic inclusion of necessary polyfills for older browsers
6. **Feature Detection**: Graceful degradation when features aren't supported
7. **PWA Compatibility**: Web app manifest with maskable icons for better installation experience

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/myusername/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_USER_ID=your_emailjs_user_id
   ```

**Important Note**: This `.env` file should **never** be committed to your public Git repository. It is already included in `.gitignore` to prevent accidental exposure of sensitive keys.

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [EmailJS](https://www.emailjs.com/)
- [Framer Motion](https://www.framer.com/motion/)
