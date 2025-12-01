# 🚀 Multi-Mode Interactive Portfolio

A cutting-edge, interactive portfolio website featuring three distinct user experiences through a single-screen mode selector. Built with **React**, **Tailwind CSS**, and **Framer Motion** for stunning animations.

## ✨ Features Overview

### 🎨 **Three Unique Modes**

#### 1. **Classic Mode**
- Modern, premium portfolio layout with gradient designs
- Smooth scrolling sections with scroll-triggered animations
- Interactive project cards with hover effects
- Timeline-based education and experience displays
- Fully responsive design
- Sections: Hero, Projects, Education, Experience, Contact

#### 2. **Terminal Mode** 💻 *(Enhanced!)*
- Full-page terminal emulator with authentic CLI experience
- **4 Color Themes**: Matrix (green), Hacker (cyan), Retro (amber), Modern (blue)
- **20+ Commands** including:
  - Navigation: `list`, `ls`, `open`, `cd`, `project`
  - Info: `whoami`, `about`, `skills`, `achievements`
  - Customization: `theme`, `username`, `banner`
  - Utilities: `clear`, `history`, `date`, `echo`, `cowsay`, `matrix`
  - System: `help`, `exit`
- **Advanced Features**:
  - Command history (↑/↓ arrows)
  - Tab autocomplete with suggestions
  - Keyboard shortcuts (Ctrl+L, Ctrl+C)
  - Real-time status bar
  - Animated cursor
  - Beautiful box-drawing characters
  - ASCII art support

#### 3. **Retro Desktop Mode** 💾
- Nostalgic OS-style interface
- Animated boot sequence with progress bar
- PIN login screen (accepts any 4+ digits)
- Draggable, resizable windows
- Desktop icons for portfolio sections
- Taskbar with window management
- Multiple wallpaper themes
- XP-style window design

---

## 🎯 Enhanced Terminal Features

### Color Themes
```bash
theme matrix   # Classic green on black
theme hacker   # Cyan cyberpunk style
theme retro    # Amber terminal vibes
theme modern   # Sleek blue interface
```

### Command Categories

**📁 NAVIGATION**
```bash
list, ls              # Show all sections
open <section>        # Open projects/education/experience/contact
project <id>          # View detailed project info
cd <section>          # Navigate to section
```

**ℹ️ INFORMATION**
```bash
whoami                # Display current user
about                 # About this portfolio
skills                # List technical skills
achievements          # Show certifications
```

**🎨 CUSTOMIZATION**
```bash
theme <name>          # Change color theme
username <name>       # Change username
banner                # Display ASCII art banner
```

**🛠️ UTILITIES**
```bash
clear, cls            # Clear screen
history               # Show command history
date                  # Display current date/time
echo <text>           # Print text
cowsay <text>         # ASCII art message
matrix                # Matrix rain simulation
```

**⌨️ KEYBOARD SHORTCUTS**
- `↑/↓` - Navigate command history
- `Tab` - Autocomplete commands
- `Ctrl+L` - Clear screen
- `Ctrl+C` - Cancel current input

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Pasinduhansana/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:5173` to see your portfolio!

---

## 📁 Project Structure

```
Portfolio/
├── src/
│   ├── components/
│   │   ├── ModeSelector.jsx       # Landing page (Tailwind)
│   │   ├── ClassicShell.jsx       # Classic mode (Tailwind)
│   │   ├── TerminalShell.jsx      # Enhanced Terminal (Tailwind)
│   │   ├── RetroDesktop.jsx       # Retro desktop mode
│   │   ├── RetroDesktop.css
│   │   ├── Window.jsx             # Draggable windows
│   │   └── Window.css
│   ├── data/
│   │   └── portfolioData.js       # Portfolio content
│   ├── App.jsx                    # Main app (Tailwind)
│   ├── index.css                  # Tailwind config
│   └── main.jsx
├── tailwind.config.js             # Tailwind configuration
├── package.json
└── README.md
```

---

## 🎨 Customization Guide

### Update Portfolio Content

Edit `src/data/portfolioData.js`:

```javascript
export const portfolioData = {
  projects: [
    {
      title: "Your Project",
      description: "Description here",
      tech: ["React", "Node.js"],
      demo: "https://demo-link.com",
      repo: "https://github.com/username/repo",
      features: ["Feature 1", "Feature 2"]
    }
  ],
  education: [...],
  experience: [...],
  contact: {
    email: "your@email.com",
    github: "https://github.com/username",
    linkedin: "https://linkedin.com/in/username"
  }
};
```

### Customize Tailwind Theme

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* your colors */ },
      secondary: { /* your colors */ }
    }
  }
}
```

### Add New Terminal Commands

In `src/components/TerminalShell.jsx`:

```javascript
const commands = {
  mycommand: (args) => ({
    output: 'Your output here',
    type: 'text' // or 'error'
  })
};
```

---

## 🌐 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (fully responsive)

---

## ♿ Accessibility Features

- ✅ Keyboard navigation support
- ✅ ARIA labels on interactive elements
- ✅ Focus indicators
- ✅ Reduced motion support
- ✅ WCAG AA contrast ratios
- ✅ Screen reader friendly

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **React** | UI framework |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Smooth animations |
| **Vite** | Build tool & dev server |
| **LocalStorage** | Mode preference persistence |

---

## 📱 Responsive Design

All modes are fully responsive:
- **Desktop**: Full experience with all features
- **Tablet**: Optimized layouts
- **Mobile**: Touch-friendly, stacked layouts

---

## 🎯 Terminal Mode Examples

### View Projects
```bash
guest@portfolio:~$ open projects
╔════════════════════════════════════════════════════════════╗
║                         PROJECTS                           ║
╚════════════════════════════════════════════════════════════╝

[0] E-Commerce Platform
    📝 A full-stack e-commerce application...
    🛠️  Tech: React, Node.js, MongoDB, Stripe, Redux
    🔗 Demo: https://example.com/demo
    💻 Repo: https://github.com/username/ecommerce
```

### Change Theme
```bash
guest@portfolio:~$ theme hacker
✓ Theme changed to 'hacker'
```

### ASCII Art
```bash
guest@portfolio:~$ cowsay Hello Portfolio!
 __________________
< Hello Portfolio! >
 ------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🎯 Future Enhancements

- [ ] Sound effects with mute toggle
- [ ] More terminal themes
- [ ] Terminal command aliases
- [ ] Window minimize/maximize in Retro mode
- [ ] Right-click context menus
- [ ] Deep linking for terminal state
- [ ] Export resume as PDF
- [ ] Dark/light mode toggle for Classic mode
- [ ] Analytics integration
- [ ] Blog section

---

## 📧 Contact

For questions or feedback, explore the portfolio in any of the three modes!

---

## 🌟 Highlights

- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎨 **Beautiful Design** - Tailwind CSS for stunning visuals
- 🔄 **Smooth Animations** - Framer Motion for fluid transitions
- 📱 **Fully Responsive** - Works perfectly on all devices
- ♿ **Accessible** - WCAG compliant
- 🎮 **Interactive** - Three unique experiences
- 💾 **Persistent** - Remembers your mode preference

---

<div align="center">

**Made with ❤️ using React + Tailwind CSS + Framer Motion**

[View Demo](http://localhost:5173) • [Report Bug](https://github.com/Pasinduhansana/Portfolio/issues) • [Request Feature](https://github.com/Pasinduhansana/Portfolio/issues)

</div>
