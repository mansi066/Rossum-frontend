# Rossum

## Live Demo

Check out the live version of the project here: [Rossum](https://rossum-three.vercel.app/)

Sure! Here's a well-structured **README.md** file for your **Rossum Coding Hub** project, outlining its purpose, technologies used, contribution guidelines, and rules for contributors.

---

# Rossum  
A **React-based** & **Tailwind CSS-powered** website for aspiring developers, created to foster a collaborative coding community.  
Contribute, learn, and innovate with fellow students from the **Coding Hub Official Team**.

## 🚀 Project Overview  
Rossum is designed to be the ultimate coding hub that brings students together to share knowledge, contribute to open-source projects, and build cutting-edge web applications.

### 🔥 Features  
✅ Responsive UI powered by **React & Tailwind CSS**  
✅ Interactive coding challenges & resources  
✅ Community-driven projects  
✅ events section  
✅ Contribution opportunities for students  
✅ **Admin Panel for Content Management**

## 🛠️ Tech Stack  
- **Frontend**: React.js, Tailwind CSS  
- **Backend**: Firebase (Firestore, Authentication)
- **Admin Panel**: React with role-based access control
- **Bundler**: Vite  
- **Version Control**: Git & GitHub  

##  Getting Started  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/mansi066/Rossum.git
cd Rossum
```

### **2️⃣ Install Dependencies**  
```sh
npm install
```

### **3️⃣ Run the Development Server**  
```sh
npm run dev
```

### **4️⃣ Access Admin Panel**
Navigate to `/admin.html` or run:
```sh
# For admin panel development
npm run dev
# Then visit http://localhost:5173/admin.html
```

Now you're all set to start contributing! 

## 🔐 Admin Panel

### Features
- **Secure Authentication**: Role-based access control
- **Events Management**: Create, edit, delete, and reorder events
- **Team Management**: Manage team member profiles and information
- **Contact Information**: Update contact details and social media links
- **Activity Logging**: Track all content changes
- **Real-time Preview**: See changes before publishing
- **Mobile Responsive**: Works on all devices

### Admin Credentials
For demo purposes:
- **Email**: admin@rossum.com
- **Password**: password123

### Admin Panel Sections

#### 1. Dashboard
- Overview of all content statistics
- Recent activity feed
- Quick action buttons
- Upcoming events summary

#### 2. Events Manager
- Add/Edit/Delete events
- Drag-and-drop reordering
- Featured events marking
- Archive functionality
- Event filtering (upcoming, featured, archived)

#### 3. Team Manager
- Add/Edit/Delete team members
- Department-wise organization
- Profile image management
- Contact information handling

#### 4. Contact Manager
- Update company contact details
- Social media links management
- Office hours configuration
- Contact form settings

### Technical Implementation
- **Authentication**: Firebase Auth with email/password
- **Database**: Firestore for real-time data management
- **State Management**: React Context API
- **Form Handling**: React Hook Form with validation
- **UI Components**: Custom components with Tailwind CSS
- **Drag & Drop**: React Beautiful DND for reordering

## Contributing Guidelines  
We welcome contributions from **Coding Hub official students** and any enthusiasts eager to enhance the project.

### **How to Contribute?**  
1. **Fork** the repository  
2. **Create a branch** for your changes  
3. **Make improvements** and ensure they follow best coding practices  
4. **Submit a pull request (PR)**  

### **Contribution Rules**  
- Follow **proper code indentation** & **naming conventions**  
- **Write clear, meaningful commit messages**  
- Keep components **modular & reusable**  
- Ensure **mobile responsiveness & performance optimization**  

##  Code of Conduct  
To maintain a healthy coding environment, contributors must:  
✅ Provide **helpful feedback** during code reviews.
✅ Avoid plagiarism—write **original, innovative code**  
✅ Report **bugs & issues** responsibly


🔗 GitHub Issues: [Submit an Issue](https://github.com/mansi066/Rossum/issues)  


## Guidelines For Contribution

Please follow these guidelines to help maintain the quality and organization of the project. This ensures that contributions and issues are effectively tracked, addressed, and resolved.

### 1. Create an Issue (Use the Template Provided)
- When creating an issue, kindly provide a description of how you plan to implement the solution.
- **Make sure the issue has not been raised by someone else!**
- If you raise a duplicate issue, it will be **closed**.
- Review issues raised by other contributors before raising your own to avoid confusion related to duplicate issues. For example, if someone is working on the Navbar UI and you want to add a hover effect to navbar items, understand that this falls under the existing Navbar UI issue.

## 📁 Project Structure

```
src/
├── admin/                 # Admin panel source code
│   ├── components/        # Admin UI components
│   ├── context/          # Admin state management
│   ├── services/         # Admin API services
│   └── AdminApp.jsx      # Admin app entry point
├── components/           # Main website components
├── constants/           # Application constants
└── assets/             # Static assets

admin.html              # Admin panel entry point
index.html             # Main website entry point
```

## 🚀 Deployment

The project supports multiple build targets:
- **Main Website**: `npm run build` (builds index.html)
- **Admin Panel**: Included in the same build process
- **Development**: `npm run dev` serves both applications

## 📝 Admin Panel Documentation

### Authentication Flow
1. Admin navigates to `/admin.html`
2. Login with credentials (Firebase Auth)
3. Access dashboard with role-based permissions
4. Manage content through intuitive interface

### Data Management
- **Real-time Updates**: Changes reflect immediately
- **Backup System**: Automatic backups before changes
- **Activity Logging**: All actions are tracked
- **Validation**: Form validation prevents invalid data

### Security Features
- **Role-based Access**: Only authorized users can access admin panel
- **Session Management**: Automatic logout on inactivity
- **Input Validation**: All inputs are validated and sanitized
- **CSRF Protection**: Built-in protection against common attacks

---