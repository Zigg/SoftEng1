# Ordering System Setup

## Overview
...

## Key Features

- **Feature 1**: Register Feature

- **Feature 2**: Login Feature
- **Feature 3**: Description of feature 3.

## Technologies Used

List all the technologies, languages, frameworks, libraries etc. used in the project. Placeholders

- **Language**: TypeScript
- **Framework**: Next.js, React.js
- **Database**:  MySQL, Prisma, PlanetScale
- **Authentication**: NextAuth
- **UI**: Tailwind CSS, Shadcn UI
- **Email-Service**: TBD

## Getting Started

## Prerequisites
Before you begin, make sure you have the following installed on your machine:

-Node.js

## Setup .env.example file 

```
DATABASE_URL= 
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

## Install Dependencies
`
npm i
`



## Setup local development server 

`
npm run dev
`

## Troubleshooting
If for some reason if the user roles and admin is not populated in the database or you running a new database migration you can simply run the following commands

#### Setup role-seed to seed the roles 
#### CD to scripts 
### Run 
```
npm run role-seed
```
#### Setup admin-seed to seed a default admin 
#### CD to scripts 
### Run
```
npm run admin-seed