**Dance Course Booking System**

Welcome to the Dance Course Booking System! This platform enables students and administrators of a local dance organisation to view, book, and manage dance courses and classes effortlessly.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Public Access (Unauthenticated Users)](#public-access-unauthenticated-users)
  - [Administrator Access (Organisers)](#administrator-access-organisers)
- [Link To Website](#link-to-website)

---

## Overview

The Dance Course Booking System supports:

- **Public Users** (not logged in) can browse information about the organisation, view upcoming and current courses, and enrol in courses or book individual class sessions.
- **Organisers** (authenticated administrators) can manage courses and classes, maintain participant lists, and administer organiser and user accounts.

The organisation offers classes for all fitness levels and abilities. Courses may range from weekend workshops (e.g., five sessions over two days) to longer weekly series (e.g., twelve sessions over three months). On average, five weekly courses run continuously, plus one or two intensive weekend workshops each year.

---

## Features

### Public View (Unauthenticated)

- **Home Page**
  - Overview of the organisation, reviews and its mission
- **Course Catalogue**
  - List of current and upcoming courses
  - For each course:
    - Name and total duration
    - date and time
    - Intro and list of links to classes
- **Classes**
  - Date and time
  - location and pricing
  - category each class belongs too
- **Booking & Enrollment**
  - Enrol in an entire course
  - Book attendance at individual class sessions

### Administrative Panel (Organisers)

- **Authentication**
  - Secure login for organisers (Admin role)
- **Course & Class Management**
  - Create and delete courses
  - Add, update, or remove individual class sessions
- **Participant Management**
  - Attendee list can be viewed in admin backend
- **User & Organiser Management**
  - Add or remove organiser accounts
  - Remove or ban public users if necessary

---

## Getting Started

### Prerequisites

- Node.js >= 14 and npm, or an equivalent runtime
- Nedb for the database
- Git & GitHub

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/dance-booking-system.git
   cd dance-booking-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - create `.env` and fill in database credentials and secret keys.

---

## Usage

### Public Access (Unauthenticated Users & Students)

1. Navigate to the home page to read about the organisation and its dance classes.
2. Browse the "Courses" section to see all current and upcoming courses.
3. Click on a course and classes to view full details (name, duration, schedule, description, location, and price).
4. Use the "Enrol" or "Attend" buttons to enrol for a course or attend a class. Provide full name and email to enrol, just email to attend.

### Administrator Access (Organisers)

1. Visit `/login` and log in with your organiser(admin) credentials.
2. in both "Attended" and "Courses" dashboard you can view a list of student and remove them
   - Removing a user from an enrolled coruse will automatically remove them from the Attended class taht falls into that course
4. Use the "Courses" dashboard to:
   - **Add Course**: Create a new course with name, total duration, description, price, and default schedule.
   - **Edit Course**: Update course details.
   - **Delete Course**: Remove a course and all associated class sessions.
5. Use the "Classes" dashboard to:
   - view individual class details
   - **Add** classes
   - **Update** classes
   - **Delete**: specific classes.
6.  Use the "Users" dashboard to:
   - **Add** users
   - **Delete**: specific users.

---


## Link To Website

https://dance-booking-system-ozb2.onrender.com

---

*Happy dancing and booking!*

