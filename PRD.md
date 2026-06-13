2026 / 1st semester / Introduction to AI Programming (01) 
20230910_Gun Kim 
Product Requirements Document (PRD) 
Making Todo List Website 
1. Product Overview 
20230910_Gun Kim 
Focus-Todo is an intuitive and lightweight To-Do List web service designed for college 
students. It helps users focus on inputting and achieving their daily tasks and study goals 
without complex features, addressing the problem of procrastination and boosting daily 
productivity.  
2. Target Users 
• Primary Audience: College students with busy schedules, including assignments, 
exam preparation, and extracurricular activities.  
• User Needs & Pain Points: Users need a fast, simple, and intuitive tool to record and 
check off daily tasks. They often find traditional planner applications too heavy or 
complicated for quick daily use.  
3. Project Goals 
• Provide a distraction-free environment where users can intuitively record study goals 
and tasks within seconds. Allow users to create, complete, and delete tasks within one 
or two clicks. 
• Implement a lightweight service using browser Local Storage, eliminating the need for 
a backend server.  
• Deliver an intuitive UI/UX with immediate interactions (add/delete/complete) using 
JavaScript.  
4. Core User Scenario 
A user visits the website and navigates to the 'Dashboard' page. They type "Submit AI 
2026 / 1st semester / Introduction to AI Programming (01) 
20230910_Gun Kim 
Programming Assignment" into the input field and click the 'Add' button. The item immediately 
appears on their task list. After completing the assignment, the user clicks the checkbox next 
to the task, which instantly strikes through the text, marking it as visually complete.  
5. Feature List 
Feature Name: Description / Priority 
Add Task: Create a new item in the list upon text input and button click. / Must-have 
Complete Task: Visually change the state (e.g., strikethrough) when the checkbox is clicked. / Must-have 
Delete Task: Remove an item from the list by clicking the deleted button next to it. / Must-have 
Data Storage: Persist data even after a page refresh using the browser's Local Storage. / Should-have 
Progress Indicator: Display real-time completion progress as a percentage to motivate users and track productivity. / Nice-to-have 
6. Page Structure 
The website will consist of three clearly separated pages:  
• Home: A simple landing page explaining the service's purpose and value, including a 
'Get Started' button.  
• Dashboard: The core interactive planner page where users can manage their tasks.  
• About: An informational page explaining why the service was created and providing a 
short user guide.  
•  
7. Technical Requirements 
• Frontend: HTML5, CSS3, and Vanilla JavaScript (No heavy frameworks required).  
• Deployment: Publicly deployed using Vercel.  
2026 / 1st semester / Introduction to AI Programming (01) 
20230910_Gun Kim 
• Data Management: Browser-native Local Storage API (No backend or database).  
8. Design Requirements 
• Visual Style: Clean, minimalist design to reduce visual clutter and eye strain.  
• Color Direction: White background with blue accent colors to convey focus and 
reliability.  
• User Experience (UX): Support both mouse clicks and the Enter key for a fast and 
seamless input experience.  
• Layout: A responsive single-column layout on mobile devices and a centered content 
layout on desktop screens to maximize readability and usability. 
• Navigation Structure: A fixed navigation bar will allow users to move easily between 
Home, Dashboard, and About pages at any time. 
9. Milestones 
Milestone / Target Date / Description 
PRD Completion / 2026-06-12 / Finalize service idea and complete the PRD document. 
First Prototype / 2026-06-13 / Build HTML/CSS layout for the 3 pages and generate AI code. 
Final Implementation / 2026-06-13 / Implement core JavaScript features and Local Storage integration. 
Vercel Deployment / 2026-06-14 / Deploy the website online and write the AI Development Report.