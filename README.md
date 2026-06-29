# User Management Dashboard

## Overview

The **User Management Dashboard** is a responsive React application that enables administrators to manage user records using the JSONPlaceholder REST API. The application supports searching, filtering, sorting, pagination, and complete CRUD (Create, Read, Update, Delete) operations.

Although JSONPlaceholder is a mock API and does not permanently store changes, the application updates the local React state to provide a realistic user management experience.

### Link for live project:

https://user-management-dashboard-sai-prathap.vercel.app

### Output:

https://drive.google.com/file/d/1wBAF88Bs_JCavCvSYTck4ynmskzl2tCs/view


---

## Features

- Fetch users from JSONPlaceholder API
- Display users in a responsive table
- Search users by:
  - First Name
  - Last Name
  - Email
- Filter users by:
  - First Name
  - Last Name
  - Email
  - Department
- Sort users by:
  - ID
  - First Name
  - Last Name
  - Email
  - Department
- Pagination (10, 25, 50, 100 records)
- Add User
- Edit User
- Delete User with confirmation dialog
- Client-side form validation
- Responsive design for Desktop, Tablet, and Mobile

---

# Technologies Used

- React.js
- JavaScript (ES6)
- Axios
- CSS3
- React Icons
- JSONPlaceholder REST API

---

# Project Structure

```
src/
│
├── components/
│   ├── Header/
│   ├── SearchBar/
│   ├── FilterPopup/
│   ├── UserTable/
│   ├── UserRow/
│   ├── Pagination/
│   ├── UserForm/
│   └── ConfirmDelete/
│
├── services/
│      api.js
│
├── styles/
│      global.css
│
├── App.js
└── index.js
```

---

# API Used

```
https://jsonplaceholder.typicode.com/users
```

The application uses the following endpoints:

| Method | Endpoint | Purpose |
|---------|----------|----------|
| GET | /users | Fetch Users |
| POST | /users | Add User |
| PUT | /users/{id} | Update User |
| DELETE | /users/{id} | Delete User |

---

# User Data Transformations

The JSONPlaceholder API does not provide the exact fields required by this assignment. Therefore, the application performs the following data transformations after fetching the user data.

## 1. First Name and Last Name Extraction

The API returns a single **name** field.

Example:

```json
{
  "name": "Leanne Graham"
}
```

The application splits the full name into two separate fields.

```javascript
const names = user.name.split(" ");

firstName = names[0];

lastName = names.slice(1).join(" ");
```

Result:

| API Data | Application Data |
|----------|------------------|
| Leanne Graham | First Name: Leanne |
| | Last Name: Graham |

---

## 2. Default Department Assignment

The JSONPlaceholder API does not provide a Department field.

To satisfy the assignment requirements, the application assigns departments from a predefined list.

```javascript
const departments = [
    "IT",
    "Engineering",
    "Sales",
    "Finance",
    "HR",
    "Marketing"
];
```

Departments are assigned sequentially while mapping the users.

Example:

```javascript
department: departments[index % departments.length]
```

Result:

| User | Department |
|-------|------------|
| User 1 | IT |
| User 2 | Engineering |
| User 3 | Sales |
| User 4 | Finance |
| User 5 | HR |
| User 6 | Marketing |

---

## 3. Local State Synchronization

JSONPlaceholder is a fake REST API.

Therefore:

- POST requests do not permanently create records.
- PUT requests do not permanently update records.
- DELETE requests do not permanently remove records.

After every successful API request, the application manually updates the React state using:

- setUsers()
- map()
- filter()

This keeps the UI synchronized with user actions.

---

# Search Functionality

Users can search using:

- First Name
- Last Name
- Email

Searching is case-insensitive.

---

# Filter Functionality

Users can filter records by:

- First Name
- Last Name
- Email
- Department

Multiple filters can be applied simultaneously.

---

# Sorting

Sorting is available for:

- ID
- First Name
- Last Name
- Email
- Department

Both ascending and descending sorting are supported.

---

# Pagination

Pagination supports:

- 10 Records
- 25 Records
- 50 Records
- 100 Records

Navigation includes:

- Previous
- Next
- Page Numbers

---

# Form Validation

The Add/Edit User form validates:

- First Name is required
- Last Name is required
- Email is required
- Valid Email format
- Department is required

Invalid inputs display validation messages before submission.

---

# Error Handling

The application gracefully handles API failures.

Example:

```
Unable to fetch users.
Please check your internet connection.
```

Network errors are caught using try...catch blocks.

---

# Responsive Design

The application is fully responsive.

Supported devices:

- Desktop
- Laptop
- Tablet
- Mobile

Responsive features include:

- Flexible layouts
- Responsive forms
- Scrollable tables
- Mobile-friendly buttons

---

# Installation

Clone the repository.

```bash
git clone <repository-url>
```

Navigate to the project.

```bash
cd user-management-dashboard
```

Install dependencies.

```bash
npm install
```

Start the application.

```bash
npm start
```

The application runs on:

```
http://localhost:3000
```

---

# Future Improvements

- Backend database integration
- Authentication & Authorization
- Role-based access
- Export users to Excel/PDF
- Dark Mode
- Advanced filtering
- Server-side pagination

---

# Author

**Sai Prathap**

Frontend Developer

React | JavaScript | HTML | CSS
