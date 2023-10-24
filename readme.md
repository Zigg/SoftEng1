# Ordering System

## Overview
This will serve as the user authetication for the ordering system. 

## Key Features

- **Feature 1**: Register Feature
- **Feature 2**: Login Feature
- **Feature 3**: Email Verification Feature

## Technologies Used

List of all the technologies, languages, frameworks, libraries etc. used in the project.

- **Language**: Javascript
- **Framework**: React.js, express.js
- **Database**:  Firebase
- **Authentication**: Firebase Auth
- **UI**: Tailwind CSS, Shadcn UI, Flowbite, LucideReact
- **Email-Service**: Firebase Auth Email Service

# Getting Started

## Prerequisites
Before you begin, make sure you have the following installed on your machine:

- Node.js
- yarn 

## Install yarn globally
```
npm install --global yarn
```
## Setup .env.example file for frontend folder 
### These are availble within the firebase console. [link](https://console.firebase.google.com/u/0/)
For more information on getting started creating a firebase build check the following. [link](https://firebase.google.com/docs/build)


```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN= 
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID= 
# Below is for analytics not really needed for now but its setup
REACT_APP_FIREBASE_MEASUREMENT_ID= 

```

## Create Service Account Key File
```
cd into backend/functions
Create new file serviceAccountKey.json

```

## Find your service account key 
```
Go to the firebase console 
Inside project settings
Service accounts tab
Generate new private key
Copy contents and paste into newly created serviceAccountKey.json
```

## Install Dependencies

```
yarn install
npm i
```

## Setup frontend development server 

```
yarn start
```
## Setup backend development server
```
cd to backend/functions
npm run serve
```
