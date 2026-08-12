# FillIn Frontend

## Overview

FillIn is a shift-based job marketplace that connects businesses with workers. Businesses post and manage shifts and review incoming applications; workers browse open shifts, apply, and track their applications. Both sides maintain a profile and can leave reviews for each other once a shift is complete.

## Live Application

- **Frontend:** _Not yet deployed_
- **Backend API:** _Not yet deployed_
- **Backend Repository:** https://github.com/Zaraaa82/Fillin-backend

## Screenshots

### Home Page

_TODO: add screenshot_

### Feature Page

_TODO: add screenshot_

### Other pages

_TODO: add screenshot_

## Technologies Used

- React
- Vite
- React Router
- Axios
- CSS

## Features

- User registration and login as either a worker or a business
- Protected routes, plus role-restricted routes for worker-only and business-only pages
- Worker and business profile creation and editing
- Browse open shifts and view shift details
- Businesses can create, edit, and manage shifts, and accept or reject applications
- Workers can apply to shifts and view or withdraw their applications
- Workers and businesses can leave and view reviews for each other

## Project Structure

```text
src/
├── assets/
├── components/
├── context/
├── guards/
├── pages/
├── services/
├── App.jsx
└── main.jsx
```

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js

The backend API has to be running — see https://github.com/Zaraaa82/Fillin-backend

## Installation

### 1. Clone the repository

```bash
git clone <FRONTEND_REPOSITORY_URL>
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the environment file

Create a `.env` file in the `frontend` directory:

```env
VITE_BACK_END_SERVER_URL=http://localhost:3000
```

### 4. Start the development server

```bash
npm run dev
```

Go to:

```text
http://localhost:5173
```

## Application Routes

| Route                              | Page                         | Access             |
| ----------------------------------- | ---------------------------- | ------------------- |
| `/`                                  | Home page                    | Public               |
| `/sign-up`                           | Sign up page                 | Public               |
| `/sign-in`                           | Sign in page                 | Public               |
| `/dashboard`                         | Dashboard                    | Authenticated        |
| `/profile/me`                        | My profile                   | Authenticated        |
| `/profile/form`                      | Create / edit profile        | Authenticated        |
| `/profile/worker/:id`                | Worker profile details       | Authenticated        |
| `/profile/business/:id`              | Business profile details     | Public               |
| `/shifts`                            | Shift listings               | Public               |
| `/shifts/:shiftId`                   | Shift details                | Public               |
| `/shifts/create`                     | Create shift                 | Business only        |
| `/shifts/:shiftId/edit`              | Edit shift                   | Business only        |
| `/shifts/:shiftId/applications`      | Applications for a shift     | Business only        |
| `/business/shifts`                   | Business's own shifts        | Business only        |
| `/applications/me`                   | My applications              | Worker only          |
| `/applications/:applicationId/review`| Leave a review               | Authenticated        |

## User Stories

_TODO: add user stories_

## Future Enhancements

1. Add Dark Mode
2. Add shift search/filtering (`ShiftFilters` is not yet implemented)


## Team Members

| Name          | GitHub                        |
| ------------- | ------------------------------ |
| Bushra Husain | https://github.com/Bushra-11   |
| Zahraa Alaiwi | https://github.com/Zaraaa82    |

## Credits
