# QA Technical Test

You are a QA engineer working on testing the new portal our engineers have been working on. 

## Getting started

To run the portal you will need to run the following commands in your terminal. You will need to install Yarn on your machine if you don't already have it installed. You can run the below command based on your computers OS.

Mac:
If you don't already have brew installed run the below command:
```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
Then you can install yarn.
```bash
  brew install yarn
```

Windows:
[Visit the Node.js official website.](https://nodejs.org/en)

```bash
  npm install -g yarn
```

Once yarn is installed your machine you can run the below commands to get the project up and running.

```bash
  yarn
  yarn start
```

## Overview
The Generic Company LTD team have built a brand new news publishing portal. The team have built the platform based on the acceptance criteria below. You should now clone this repository and test this application locally as you would with any new feature / platform.

## Key Features:
The user that creates an article, cannot publish it. It must be approved and published by a different user.
In this case, user test@test.com has created all the current articles in progress.

## Acceptance Criteria
- Users can log-in to the news portal with valid credentials
- Users can view a list of published articles
- Users can view a preview of a published article
- Users can view a list of in-progress articles
- Users can view a preview of an in-progress article
- Users can create a new article
- Users can sign-out of the news portal

## Instructions
- Use the provided information above to assist with testing this news portal
- Ensure as much test coverage as possible, do not limit to the acceptance criteria
- Write test cases and document any findings / bugs

## Log In

Below is a list of users that are able to access the below portal as you will need multiple users to complete some of the test cases. 

User 1:
Email: test@test.com
Password: T35tM3!

User 2:
Email: test+admin@test.com
Password: V3r1fy24!

User 3:
Email: test+user@test.com
Password: Password1