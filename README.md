# 🚀 Portfolio Website

A modern, interactive portfolio website built with React and Three.js, featuring stunning 3D graphics and smooth animations. This project showcases my work, skills, and experience with a beautiful, responsive design.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![Build](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)

## 🌐 Live Demo

Visit the live site: [https://aksh00001.github.io](https://aksh00001.github.io)

## ✨ Features

- **3D Interactive Background** - Immersive Three.js powered background with particle effects
- **Smooth Animations** - GSAP and Framer Motion for fluid, engaging transitions
- **Responsive Design** - Fully responsive across all devices and screen sizes
- **Modern UI** - Clean, contemporary design built with Tailwind CSS
- **Project Showcase** - Display your best work with detailed project cards
- **Contact Section** - Easy-to-use contact form for potential clients/employers
- **Skills Display** - Highlight your technical skills and expertise
- **Fast Performance** - Optimized build with Vite for lightning-fast load times

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.2** - Modern React with hooks and functional components
- **Vite 5.0** - Next-generation frontend tooling for fast builds and HMR

### 3D Graphics & Animation
- **Three.js 0.158** - WebGL-powered 3D graphics library
- **@react-three/fiber 8.15** - React renderer for Three.js
- **@react-three/drei 9.88** - Useful helpers and abstractions for react-three-fiber
- **GSAP 3.13** - Professional-grade animation library
- **Framer Motion 10.16** - Production-ready animation library for React

### Styling
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **PostCSS 8.4** - CSS transformations and optimizations
- **Autoprefixer 10.4** - Automatic vendor prefixing

### Development Tools
- **ESLint 8.53** - Linting and code quality
- **React Icons 5.5** - Popular icon library

## 📦 Project Structure

```
Portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── client/                      # Frontend application
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── About.jsx       # About section
│   │   │   ├── Background3D.jsx # Three.js 3D background
│   │   │   ├── Contact.jsx     # Contact form
│   │   │   ├── Hero.jsx        # Hero/landing section
│   │   │   ├── ProjectCard.jsx # Project card component
│   │   │   ├── Skills.jsx      # Skills display
│   │   │   └── Work.jsx        # Projects showcase
│   │   ├── data/
│   │   │   └── projects.js     # Project data
│   │   ├── App.jsx             # Main app component
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Global styles
│   ├── index.html              # HTML entry point
│   ├── package.json            # Dependencies and scripts
│   ├── vite.config.js          # Vite configuration
│   ├── tailwind.config.js      # Tailwind configuration
│   └── postcss.config.js       # PostCSS configuration
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aksh00001/aksh00001.github.io.git
   cd aksh00001.github.io
   ```

2. **Install dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The page will automatically reload when you make changes

### Build for Production

```bash
cd client
npm run build
```

The optimized production build will be created in the `client/dist` directory.

### Preview Production Build

```bash
cd client
npm run preview
```

## 🔧 Configuration

### Vite Configuration

The `vite.config.js` file contains build and server settings:
- **Base URL**: Set to `/` for GitHub Pages user site
- **Output Directory**: `dist`
- **Development Server**: Runs on port 5173

### Tailwind CSS

Customize the design system in `tailwind.config.js`:
- Colors, fonts, spacing, and other design tokens
- Custom plugins and extensions
- Responsive breakpoints

## 🌐 Deployment

This project uses **GitHub Actions** for automatic deployment to GitHub Pages.

### Automatic Deployment

The site automatically deploys when you push to the `main` branch:

1. **GitHub Actions Workflow** (`.github/workflows/deploy.yml`) triggers on push
2. **Build Process**: Installs dependencies and builds the project
3. **Deploy**: Publishes the `client/dist` folder to the `gh-pages` branch
4. **Live Site**: Available at `https://aksh00001.github.io`

### Manual Deployment

If you need to deploy manually:

```bash
cd client
npm run build
# Then push the dist folder to gh-pages branch manually
```

### GitHub Pages Settings

Ensure your repository settings are configured:
1. Go to **Settings** → **Pages**
2. **Source**: Deploy from branch
3. **Branch**: `gh-pages` / `root`
4. Save changes

## 📝 Customization

### Adding Your Projects

Edit `client/src/data/projects.js` to add your projects:

```javascript
export const projects = [
  {
    id: 1,
    title: "Your Project",
    description: "Project description",
    image: "/path/to/image.jpg",
    tags: ["React", "Node.js"],
    link: "https://project-url.com",
    github: "https://github.com/yourusername/project"
  }
];
```

### Updating Content

- **Hero Section**: Edit `client/src/components/Hero.jsx`
- **About**: Edit `client/src/components/About.jsx`
- **Skills**: Edit `client/src/components/Skills.jsx`
- **Contact**: Edit `client/src/components/Contact.jsx`

### Styling

- **Global Styles**: `client/src/index.css`
- **Tailwind Config**: `client/tailwind.config.js`
- **Component Styles**: Inline Tailwind classes in JSX files

## 🐛 Troubleshooting

### Build Fails
- Ensure all dependencies are installed: `npm install`
- Clear cache: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be v18+)

### 3D Background Not Loading
- Check browser WebGL support
- Ensure Three.js dependencies are installed
- Check browser console for errors

### Deployment Issues
- Verify GitHub Actions has proper permissions
- Check `gh-pages` branch exists
- Review workflow logs in GitHub Actions tab

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Akshu**

- GitHub: [@aksh00001](https://github.com/aksh00001)
- Portfolio: [https://aksh00001.github.io](https://aksh00001.github.io)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

## 📞 Contact

Feel free to reach out for collaborations or questions through the contact form on the website!

---

**Built with ❤️ using React, Three.js, and modern web technologies**
