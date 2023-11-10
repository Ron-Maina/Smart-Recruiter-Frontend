# Smart Recruiter Frontend

Welcome to Smart Recruiter, an innovative platform that automates the in-person technical interview process, allowing recruiters to efficiently assess the technical skills of software development interviewees.

## MVP Features
### For Recruiters

1. Authentication:
Multiple user-type authentication for Recruiters and Interviewees.

2. Assessment Management:
Create assessments with multiple-choice, subjective (free text) questions, or coding challenges/Katas.
Review and publish assessments.

3. Invitations:
Send invitations to Interviewees individually or in bulk.

4. Performance Metrics:
View a sorted list of Interviewees based on their scores.
View statistics of answers and Interviewees' performance.

5. Detailed Analysis:
View each Interviewee's answers.
Leave feedback below each question's answer.

6. Time Management:
Set an overall time limit for the test.
Automatic submission of answers when the time limit is reached.

7. Grading:
Release grades to Interviewees.

### For Interviewees

1. User Experience:
Login and see the assessments they are signed up for.

2. Invitations:
Accept invitations to assessments.
Receive notifications for assessment details.

3. Time Tracking:
Visibility on remaining time during the test with a countdown.

4. Practice Mode:
Take a trial assessment to familiarize yourself with the platform.

5. Whiteboard Process:
Submit a full whiteboard process, including BDD, pseudocode, and code.

6. Feedback:
Read feedback from mentors.

## Technical Expectations

- Backend:
Flask Python with PostgreSQL database.

- Frontend:
ReactJs.

- External API:
Consume CodeWars API to fetch whiteboarding questions for assessments or sample tests.

## Setup & Installation

+ Clone the repository to your local machine:

```bash
git clone git@github.com:Ron-Maina/Smart-Recruiter-Frontend.git
git clone https://github.com/Ron-Maina/Smart-Recruiter-Backend.git
```
+ Navigate to the project directory:

```bash
cd Smart-Recruiter-Backend
cd Smart-Recruiter-Frontend
```
+ Open the project in your code editor:

```bash
code .
```
+ Install necessary dependencies:
```bash
npm install
```
+ Start the local server:

```bash
npm start
```

## Technologies Used
. React (Frontend)
. Flask Python (Backend)
. PostgreSQL (Database)
. CodeWars API (External API)

## Author
This frontend script for Smart Recruiter was developed by Patience Wangari Muraguri.

## License
MIT License Copyright (c) [2023] [Patience Muraguri]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
