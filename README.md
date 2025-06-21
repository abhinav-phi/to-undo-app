# ToUndo - Break Free from Unwanted Habits 🚀

![ToUndo Banner](https://img.shields.io/badge/ToUndo-Habit%20Breaking%20App-blue?style=for-the-badge&logo=react)

**ToUndo** is a modern, intuitive habit-breaking application that flips the traditional to-do concept on its head. Instead of managing tasks you need to complete, ToUndo helps you track and eliminate unwanted habits and negative behaviors from your life.

🔗 [Live Demo](https://toundo-app.vercel.app/)

---

## ✨ What Makes ToUndo Different

Traditional productivity apps focus on what you *should* do. ToUndo focuses on what you want to *stop* doing - helping you identify, track, and systematically eliminate habits that don't serve you.

---

## 🌟 Features

### 🎯 Core Functionality
- **To-Undo Task Management** - Create tasks focused on breaking unwanted habits
- **Smart Categorization** - Organize habits across 9 predefined categories (Life, Work, Relationships, Health, etc.)
- **Progress Tracking** - Visual progress indicators showing your habit-breaking journey
- **Calendar Integration** - Monthly calendar view with daily completion tracking
- **Advanced Filtering** - Filter by category, completion status, or specific dates
- **Task Management** - Edit, delete, and update tasks with inline editing capabilities

### 👤 User Experience
- **Secure Authentication** - User registration and login system with persistent sessions
- **Personal Profiles** - Individual user accounts with isolated task data
- **Theme Switching** - Seamless dark/light mode toggle
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Persistent Storage** - All data automatically saved to localStorage
- **Intuitive Interface** - Clean, modern design with smooth animations

### 🎨 Visual Design
- **Modern Glassmorphism UI** - Beautiful backdrop blur effects and semi-transparent elements
- **Gradient Backgrounds** - Dynamic animated background elements
- **Color-Coded Categories** - Each category has distinct visual styling
- **Interactive Animations** - Hover effects, transitions, and micro-interactions
- **Calendar Visualization** - Visual representation of daily progress

---

## 📱 Categories

ToUndo includes 9 comprehensive habit categories:

| Category | Icon |
|----------|------|
| **🌱 Life** | General life improvements and personal growth 
| **💼 Work** | Professional habits and productivity 
| **💝 Relationships** | Social interactions and communication patterns 
| **🔄 Habits** | General behavioral patterns 
| **💪 Health & Fitness** | Physical and mental wellness 
| **📚 Learning** | Educational and skill development 
| **🚨 Urgent** | High-priority behavioral changes 
| **🎯 Personal Projects** | Self-improvement initiatives 
| **📋 Other** | Miscellaneous habits 

---

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom utilities and dark mode support
- **Icons**: Lucide React icon library
- **Date Handling**: date-fns for robust date operations
- **State Management**: React Hooks (useState, useEffect)
- **Build Tool**: Vite for fast development and building
- **Linting**: ESLint with TypeScript support

---

## 🏗️ Architecture

### Core Hooks
- **`useAuth`** - Authentication state management with localStorage persistence
- **`useTasks`** - Task CRUD operations with user-specific data isolation
- **`useTheme`** - Theme switching with system preference detection

### Key Components
- **`TaskCard`** - Individual task display with inline editing and category styling
- **`AddTaskModal`** - Modal for creating new habit-breaking tasks
- **`Calendar`** - Monthly calendar with task completion visualization
- **`ProgressBar`** - Overall progress tracking across all tasks
- **`CategoryFilter`** - Smart filtering with task count indicators
- **`AuthModal`** - User authentication with login/signup forms
- **`UserProfile`** - User display with logout functionality
- **`ThemeToggle`** - Dark/light mode switcher

---

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
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

---

## 📖 How to Use

### Getting Started
1. **Create Account** - Sign up with username, password, and optional email
2. **Login** - Access your personal dashboard
3. **Add Habits** - Click "Add Task" to create your first habit to break

### Managing Tasks
1. **Categorize** - Choose the most relevant category for organization
2. **Set Due Dates** - Optional target dates for motivation
3. **Track Progress** - Check off tasks when you successfully avoid the habit
4. **Monitor Trends** - Use the calendar to see patterns and consistency

### Advanced Features
- **Filter Tasks** - View by category, completion status, or specific dates
- **Edit Tasks** - Update task details with inline editing
- **Calendar View** - Visual tracking of daily progress
- **Progress Analytics** - See completion rates and streaks

---

## 🎨 Design Philosophy

ToUndo embraces a **positive psychology approach** to behavior change:

- **Reframing Mindset** - Focus on elimination rather than addition
- **Visual Feedback** - Immediate confirmation of progress and success
- **Non-Judgmental Interface** - Calming design that reduces anxiety around change
- **Flexible Tracking** - Easy modification without perfectionism pressure
- **Celebration of Progress** - Clear indicators of improvement and milestones

---

## 🔧 Customization

### Adding Categories
Extend the categories in `src/config/categories.ts`:

```typescript
export const CATEGORIES: Record<string, CategoryConfig> = {
  newCategory: {
    name: 'Custom Category',
    color: 'text-purple-700 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-700',
    icon: '🎯'
  }
};
```

### Theme Customization
- Modify Tailwind config in `tailwind.config.js`
- Update CSS custom properties for glassmorphism effects
- Customize gradient backgrounds in `App.tsx`

### Storage Options
Currently uses localStorage. Can be extended to support:
- Backend API integration
- Cloud storage synchronization
- Multi-device data sync

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Maintain TypeScript strict mode compliance
- Follow existing code patterns and naming conventions
- Ensure responsive design across all screen sizes
- Test on both light and dark themes
- Write meaningful commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Abhinav**
- 🌐 [LinkedIn](https://linkedin.com/in/abhinavphi)
- 📷 [Instagram](https://instagram.com/abhinav.phi)
- 💻 [GitHub](https://github.com/abhinav-phi)

---

## 🙏 Acknowledgments

- **React Community** for the robust ecosystem
- **Tailwind CSS** for utility-first styling approach
- **Lucide Icons** for beautiful, consistent iconography
- **date-fns** for reliable date manipulation
- **Vite** for lightning-fast development experience
- **TypeScript** for type safety and developer experience

---

<div align="center">

**Made with ❤️ & ☕ by Abhinav**

[⭐ Star this repository](https://github.com/abhinav-phi/to-undo-app) if it helps you break free from unwanted habits!

</div>

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/abhinav-phi/to-undo-app?style=social)
![GitHub forks](https://img.shields.io/github/forks/abhinav-phi/to-undo-app?style=social)
![GitHub issues](https://img.shields.io/github/issues/abhinav-phi/to-undo-app)
![GitHub license](https://img.shields.io/github/license/abhinav-phi/to-undo-app)

---

*"The chains of habit are too weak to be felt until they are too strong to be broken." - ToUndo helps you break them while they're still weak.*
