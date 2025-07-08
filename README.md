# Admin Dashboard with Right Sidebar

A modern, responsive admin dashboard built with React featuring a right-side sidebar, user authentication, expert profile management, and site content management.

## Features

### 🔐 Authentication System
- User registration with username and password
- Secure login/logout functionality
- Form validation and error handling
- Password visibility toggle

### 📊 Dashboard
- Modern, responsive design
- Statistics cards with key metrics
- Quick action buttons
- User profile display

### 🎯 Right-Side Sidebar
- Clean, organized navigation
- Grouped menu items by category
- Active state indicators
- User profile section with logout

### 👨‍💼 Expert Profile Management
- Comprehensive expert information display
- Editable profile fields
- Professional details and contact information
- Social media links
- Rating system

### 📝 Site Content Management
- Content listing with search and filtering
- Content statistics dashboard
- Add, edit, and delete functionality
- Content categorization and tagging

## Technology Stack

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **React Icons** - Icon library
- **Modern JavaScript** - ES6+ features

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Login.js          # Authentication component
│   ├── Dashboard.js      # Main dashboard layout
│   ├── Sidebar.js        # Right-side navigation
│   ├── ExpertProfile.js  # Expert profile management
│   └── SiteContent.js    # Content management
├── App.js                # Main application component
├── index.js             # Application entry point
└── index.css            # Global styles
```

## Usage

### Authentication
1. Start at the login page
2. Click "Need an account? Register" to create a new account
3. Fill in username and password (minimum 6 characters)
4. Register and then login with your credentials

### Dashboard Navigation
- Use the right-side sidebar to navigate between sections
- Dashboard: Overview with statistics and quick actions
- Expert Profile: View and edit expert information
- Site Content: Manage website content and articles

### Expert Profile
- View comprehensive expert information
- Click "Edit Profile" to modify details
- Save changes or cancel to revert

### Site Content
- Browse all content items
- Use search to find specific content
- Filter by content type (articles, tutorials, guides)
- View content statistics

## Features in Detail

### Responsive Design
- Mobile-friendly layout
- Adaptive sidebar positioning
- Flexible grid systems

### Modern UI/UX
- Gradient backgrounds and modern styling
- Smooth animations and transitions
- Intuitive navigation
- Professional color scheme

### Data Management
- Local state management with React hooks
- Form handling and validation
- Search and filtering capabilities

## Customization

### Styling
- Modify `styled-components` in each component
- Update color schemes in the gradient definitions
- Adjust spacing and typography in `index.css`

### Functionality
- Add new sidebar menu items in `Sidebar.js`
- Extend expert profile fields in `ExpertProfile.js`
- Implement backend integration for data persistence

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App

### Code Style

- Use functional components with hooks
- Implement styled-components for styling
- Follow React best practices
- Maintain consistent naming conventions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository. 