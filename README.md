# ToUndo - Break Free from Unwanted Habits 🚀

![ToUndo Banner](https://img.shields.io/badge/ToUndo-Habit%20Breaking%20App-blue?style=for-the-badge&logo=react)

**ToUndo** is a modern, intuitive task management application designed specifically for breaking unwanted habits and fostering positive behavioral changes. Instead of traditional "to-do" lists, ToUndo focuses on "to-undo" tasks - helping you identify and eliminate negative patterns in your life.

🔗 [Live Demo](https://toundo-app.vercel.app/)

---
## 🌟 Features

### Core Functionality
- **🎯 To-Undo Task Management** - Create tasks focused on breaking bad habits
- **📂 Smart Categorization** - Organize habits by categories (Health, Social, Work, etc.)
- **✅ Progress Tracking** - Visual progress bar showing your habit-breaking journey
- **📅 Calendar Integration** - Set target dates and track completion over time
- **🔍 Advanced Filtering** - Filter by category, completion status, or view all tasks

### User Experience
- **🌙 Dark/Light Mode** - Seamless theme switching for comfortable use
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **✨ Smooth Animations** - Polished interactions with hover effects and transitions
- **👤 User Authentication** - Secure login/signup system with personal profiles
- **💾 Persistent Storage** - Your data is saved and restored across sessions

### Visual Design
- **🎨 Modern Glassmorphism UI** - Beautiful backdrop blur effects and transparency
- **🌈 Color-Coded Categories** - Each category has its unique color scheme
- **📊 Visual Progress Indicators** - Calendar view shows completed vs incomplete days
- **🎉 Celebration Animations** - Rewarding feedback when you complete tasks

## 📸 Screenshots

<p 
  align="center">
<img src = "https://github.com/user-attachments/assets/c770cc50-c513-4cd6-a9d8-a95af088ea18" align="center" height="500">
</p>
<p 
  align="center">
<img src = "https://github.com/user-attachments/assets/5bba9a76-b556-4cd3-975e-9727134bf027" align="center" height="500">
</p>
<p 
  align="center">
<img src = "https://github.com/user-attachments/assets/8e74c42d-3b9e-4bad-ae05-1c89ad1facce" align="center" height="500">
</p>

---
## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom utilities
- **Icons**: Lucide React icon library
- **Date Handling**: date-fns for robust date operations
- **State Management**: React Hooks (useState, useEffect)
- **Theme Management**: Custom useTheme hook
- **Build Tool**: Vite 

## 📱 Component Architecture

### Core Components
- **`TaskCard`** - Individual task display with inline editing
- **`AddTaskModal`** - Modal for creating new to-undo tasks
- **`Calendar`** - Monthly calendar view with task completion status
- **`ProgressBar`** - Visual representation of overall progress
- **`CategoryFilter`** - Smart filtering system with task counts

### UI Components
- **`AuthModal`** - Login/signup modal with form validation
- **`UserProfile`** - User display with logout functionality
- **`ThemeToggle`** - Dark/light mode switcher
- **`FloatingAddButton`** - Mobile-optimized quick add button
- **`Footer`** - Social links and attribution

## 🎯 Categories

ToUndo comes with pre-configured habit categories:

- **💪 Health** - Physical and mental wellness habits
- **📱 Social** - Social media and digital detox
- **💼 Work** - Productivity and work-related habits
- **🎮 Habits** - General behavioral patterns
- **📚 Personal** - Self-improvement and learning
- **💰 Finance** - Money management and spending habits

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhinav-phi/to-undo-app.git
   cd to-undo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Building for Production

```bash
npm run build
# or
yarn build
```

## 📖 How to Use

1. **Sign Up/Login** - Create an account or log in to save your progress
2. **Add To-Undo Tasks** - Click "Add Task" and describe what habit you want to break
3. **Choose Category** - Select the most relevant category for better organization
4. **Set Target Date** - Optionally set when you want to achieve this goal
5. **Track Progress** - Mark tasks as complete when you successfully avoid the habit
6. **Monitor Calendar** - Use the calendar view to see your consistency over time
7. **Filter & Focus** - Use category filters to focus on specific areas of improvement

## 🎨 Design Philosophy

ToUndo embraces a **positive psychology approach** to habit breaking:

- **Reframing**: Instead of focusing on what you "should do," focus on what you want to "stop doing"
- **Visual Feedback**: Immediate visual confirmation of progress
- **Gentle Interface**: Calming colors and smooth animations reduce stress
- **Progress Celebration**: Clear indicators of success and improvement
- **Flexibility**: Easy editing and categorization without judgment

## 🔧 Customization

### Adding New Categories
Edit the `CATEGORIES` configuration in your categories config file:

```typescript
export const CATEGORIES = {
  newCategory: {
    name: 'New Category',
    icon: '🎯',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    borderColor: 'border-purple-200'
  }
};
```

### Theme Customization
The app uses Tailwind CSS classes for styling. Modify the theme colors in your Tailwind config or update the CSS custom properties for the glassmorphism effects.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Maintain responsive design principles
- Write meaningful commit messages
- Test on multiple devices/browsers
- Keep accessibility in mind

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abhinav**
- 🌐 [LinkedIn](https://linkedin.com/in/abhinavphi)
- 📷 [Instagram](https://instagram.com/abhinav.phi)
- 💻 [GitHub](https://github.com/abhinav-phi)

## 🙏 Acknowledgments

- **React Community** for the amazing ecosystem
- **Tailwind CSS** for the utility-first approach
- **Lucide Icons** for the beautiful icon set
- **date-fns** for reliable date handling
- **All contributors** who help improve ToUndo

---

<div align="center">

**Made with ❤️ & 🍵 by Abhinav**

[⭐ Star this repository](https://github.com/abhinav-phi/to-undo-app) if you found it helpful!

</div>

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/abhinav-phi/to-undo-app?style=social)
![GitHub forks](https://img.shields.io/github/forks/abhinav-phi/to-undo-app?style=social)
![GitHub issues](https://img.shields.io/github/issues/abhinav-phi/to-undo-app)
![GitHub license](https://img.shields.io/github/license/abhinav-phi/to-undo-app)

---

*"The best way to get rid of a bad habit is to replace it with a good one." - ToUndo helps you identify what to replace first.*
