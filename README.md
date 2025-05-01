# Tafara Mutsvedu Portfolio Website

![Performance Score](https://img.shields.io/badge/Performance-100-brightgreen)
![Accessibility Score](https://img.shields.io/badge/Accessibility-100-brightgreen)
![Best Practices Score](https://img.shields.io/badge/Best_Practices-100-brightgreen)
![SEO Score](https://img.shields.io/badge/SEO-100-brightgreen)

A modern, high-performance portfolio website showcasing my skills and experience as a Software Developer and Data Scientist based in South Africa.

## 🚀 Features

- **Optimized Performance**: Achieves 100/100 on Google Lighthouse performance metrics
- **Fully Accessible**: Implements WCAG guidelines for maximum accessibility (100/100 score)
- **SEO Optimized**: Structured data, meta tags, and semantic HTML for excellent search engine visibility
- **Responsive Design**: Seamless experience across all devices and screen sizes
- **Interactive UI**: Smooth animations and transitions for an engaging user experience
- **Enhanced Project Showcase**: Immersive project carousel with improved navigation and optimized color scheme
- **Location Integration**: Interactive map showing my location using Mapbox
- **Contact Form**: Easy-to-use contact form with validation
- **PWA Support**: Progressive Web App capabilities for offline access
- **Dark/Light Mode**: Seamless theme switching with optimized contrast and readability

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Build Tool**: Vite with advanced optimization configurations
- **Routing**: React Router for seamless navigation
- **Animation**: Framer Motion for smooth UI transitions
- **Map Integration**: Mapbox GL
- **Icons**: Lucide React
- **Form Handling**: EmailJS for contact form submission
- **Performance Optimization**: Code splitting, lazy loading, and asset optimization

## 🏗️ Project Structure

```
portfolio-website/
├── public/             # Static assets
├── src/                # Source code
│   ├── components/     # React components
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
└── tailwind.config.js  # TailwindCSS configuration
```

## 🔧 Performance Optimizations

This website implements several performance optimizations to achieve a perfect Lighthouse score:

1. **Code Splitting**: Separates vendor code from application code
2. **Lazy Loading**: Components and images load only when needed
3. **Font Optimization**: Variable fonts with font-display: swap for faster text rendering
4. **Image Optimization**: Properly sized and compressed images with modern formats
5. **Enhanced Project Showcase**: Optimized carousel with efficient DOM updates, improved color contrast, and smooth transitions
6. **Minification**: All JavaScript and CSS is minified for production
7. **Tree Shaking**: Removes unused code from the final bundle
8. **Caching Strategy**: Proper cache headers for optimal resource caching
9. **Preloading**: Critical resources are preloaded for faster rendering
10. **Reduced Motion**: Respects user preferences for reduced motion

## ♿ Accessibility Features

The website is built with accessibility as a priority:

1. **Semantic HTML**: Proper use of HTML5 elements for better structure
2. **ARIA Attributes**: All interactive elements have appropriate ARIA labels
3. **Keyboard Navigation**: Full keyboard support for all interactive elements
4. **Focus Management**: Visible focus indicators for keyboard users
5. **Color Contrast**: All text meets WCAG AA contrast requirements
6. **Screen Reader Support**: Compatible with popular screen readers
7. **Alternative Text**: All images have descriptive alt text

## 🔍 SEO Optimizations

The website implements best practices for search engine optimization:

1. **Structured Data**: JSON-LD for rich search results
2. **Meta Tags**: Comprehensive meta tags for better indexing
3. **Canonical URLs**: Proper canonical URLs to prevent duplicate content
4. **Semantic HTML**: Helps search engines understand content structure
5. **Mobile Friendly**: Fully responsive design for all devices
6. **Performance**: Fast loading times improve search rankings
7. **Sitemaps**: XML sitemap for better crawling

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
   REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
   REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   REACT_APP_EMAILJS_USER_ID=your_emailjs_user_id
   ```

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
