# 💰 Taskforce Wallet Web App

> A powerful financial management application built with the MERN stack as part of the Code of Africa Challenge.

## 🔗 Important Links
- 🌐 [Live Demo](https://task-force-pro-wallet-gray.vercel.app/) - Try the app live
- 📦 [GitHub Repository](https://github.com/IMANARIYO/task-force-pro-wallet.git) - Access the source code


## 📋 System Requirements

### Minimum Requirements
- Node.js 14.x or higher
- npm 6.x or higher
- MongoDB 4.4 or higher
- 2GB RAM minimum
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Development Tools
- VS Code (recommended) or any modern code editor
- Git 2.x or higher
- MongoDB Compass (optional, for database management)
- Postman (optional, for API testing)

## 🚀 Detailed Installation Guide

### 1. Environment Setup

```bash
# Check if you have Node.js installed
node --version  # Should be 14.x or higher

# Check npm version
npm --version   # Should be 6.x or higher

# Check git version
git --version   # Should be 2.x or higher
```

### 2. Project Setup

```bash
# Clone the repository
git clone https://github.com/IMANARIYO/task-force-pro-wallet.git

# Enter project directory
cd task-force-pro-wallet
```

### 3. Backend Configuration

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
touch .env  # or manually create it

# Add these variables to .env:
PORT=3333
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
NODE_ENV=development

# Start backend server
npm start
```

### 4. Frontend Configuration

```bash
# Open new terminal and navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Create .env file
touch .env  # or manually create it

# Add these variables to .env:
REACT_APP_BACKEND_URL=http://localhost:3333
PORT=3000
REACT_APP_API_URL=http://localhost:3333/api

# Start frontend application
npm start
```

## 🗄️ MongoDB Atlas Setup

1. **Create Free Account**
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Click "Try Free"
   - Complete registration

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "FREE" shared cluster
   - Select region (choose closest to you)
   - Click "Create"

3. **Set Database Access**
   - Go to "Database Access"
   - Add new database user
   - Username: `your_username`
   - Password: `your_password`
   - Role: "Atlas admin"

4. **Get Connection String**
   - Go to "Database" section
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database user password

## 📱 Using the Application

### First Time Setup
1. Visit `http://localhost:3000` in your browser
2. Click "Sign Up" to create new account
3. Verify your email (if required)
4. Log in to access dashboard

### Managing Accounts
1. Click "Add Account" on dashboard
2. Enter account details:
   - Account name
   - Initial balance
   - Spending limit (optional)
3. Save to create account

### Recording Transactions
1. Click "New Transaction"
2. Select transaction type (Income/Expense)
3. Enter amount and category
4. Add description (optional)
5. Save transaction

## 🔍 Troubleshooting Common Issues

### Backend Won't Start
1. Check MongoDB connection
   ```bash
   # Test MongoDB connection
   mongosh "your_connection_string"
   ```
2. Verify all dependencies installed
   ```bash
   npm install
   ```
3. Check port availability
   ```bash
   # On Windows
   netstat -ano | findstr :3333
   
   # On Mac/Linux
   lsof -i :3333
   ```

### Frontend Connection Issues
1. Verify backend is running
2. Check CORS settings in backend
3. Verify environment variables
4. Clear browser cache

### Database Connection Failed
1. Check MongoDB Atlas IP whitelist
2. Verify connection string in .env
3. Check database user permissions
4. Test connection with MongoDB Compass

## 📚 API Documentation

### Base URL
```
http://localhost:3333/api
```

### Key Endpoints
```plaintext
POST   /api/auth/register    - Create new account
POST   /api/auth/login       - Login user
GET    /api/transactions     - Get all transactions
POST   /api/transactions     - Create transaction
GET    /api/accounts         - Get all accounts
POST   /api/accounts         - Create account
```

## 🛠️ Development Tips

### Using Tailwind CSS
```jsx
// Example component with Tailwind
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h2 className="text-xl font-bold text-gray-800">Account Balance</h2>
  <span className="text-2xl text-green-600">$1,234.56</span>
</div>
```

### State Management
```jsx
// Example React state hook usage
const [transactions, setTransactions] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
    setLoading(false);
  };

  fetchTransactions();
}, []);
```

## 🤝 Community and Support

- Join our [linked in](https://www.linkedin.com/in/imanariyo-baptiste-046191286)
- Follow project updates on [my site](https://imanariyo-brand-portfolio-website.vercel.app/)
- Check [skyepe](https://join.skype.com/invite/HfpS2fJSROLM) 
---

Made with ❤️ by Imanariyo Baptiste
