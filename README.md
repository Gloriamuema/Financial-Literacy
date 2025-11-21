Finance Forward: Financial Literacy for Low-Income Families
🌟 Project Overview
Finance Forward is a free, non-profit web application dedicated to providing unbiased, actionable financial literacy education and tools specifically tailored for low-to-moderate-income families.

The core mission is to promote financial stability by offering resources for crisis management, debt reduction, budgeting with irregular income, and long-term wealth building, all presented in plain, accessible language.

🚀 Features
The site is structured around three core pillars of financial health: Crisis Triage, Learning, and Actionable Tools.

Core Features
Crisis Zone (crisis.html): Immediate, actionable steps and scripts for high-anxiety situations (debt collectors, eviction).

Irregular Income Tool: A specialized calculator for families with unstable paychecks (gig workers, tipped employees) to determine a safe, minimum monthly budget.

Budget Calculator: Simple 50/30/20 rule breakdown to manage fixed and flexible expenses.

Local Aid Finder: Connects users via ZIP code to vetted, local non-profit and government assistance programs (food, housing, utilities).

Tax Help (taxes.html): A guide to maximizing refunds, focusing on the Earned Income Tax Credit (EITC) and locating VITA/TCE free tax services.

Learning Modules: Clear, jargon-free content on Budgeting, Debt Management, Credit Basics, and Long-Term Savings.

🛠️ Technology Stack
This is a lightweight, mobile-first, static website focused on accessibility and speed.

HTML5: Structure and Semantics.

CSS3: Styling (Mobile-first, responsive design).

JavaScript (Vanilla JS): Client-side interactivity for calculators (Budget Tool, Irregular Income Tool) and the Local Aid Finder filtering.

No Backend/Database: All calculators run locally in the browser. Resource data is currently stored in JavaScript arrays (aid-finder.js).

⚙️ Setup and Installation
Follow these steps to get a local copy of the project running on your machine.

Prerequisites
You need a web browser (Chrome, Firefox, Edge) to view the project. No server environment is strictly required for local testing.

Steps
Clone the Repository:

Bash

git clone https://github.com/Gloriamuema/Financial-Literacy
cd finance-forward
Verify File Structure: Ensure all core files are in the root directory:

.
├── index.html        (Home Page)
├── modules.html      (Learning Modules)
├── tools.html        (Calculators and Aid Finder)
├── crisis.html       (Crisis Zone)
├── taxes.html        (Tax Help)
├── about.html        (About Us / Mission)
├── style.css         (Global Styling)
├── calculator.js     (Budget/Irregular Income Logic)
└── aid-finder.js     (Local Aid Data/Filtering)
Run Locally: Open the index.html file directly in your web browser. (e.g., right-click index.html -> Open with -> Chrome)

🤝 Contribution Guidelines
We welcome contributions from developers, financial experts, and community advocates!

How to Contribute
Fork the repository.

Create a new branch for your feature or fix (git checkout -b feature/new-calculator).

Commit your changes (git commit -m 'feat: added validation to budget form').

Push to the branch (git push origin feature/new-calculator).

Open a Pull Request.

Areas for Improvement
Database Integration: Implement a simple backend (Node.js/Firebase) to manage the aidResources data instead of using a static JavaScript array.

Visualizations: Use Chart.js or D3.js to create visual charts showing budget allocation or debt payoff progress.

User Assessment: Develop the 30-second assessment quiz and the corresponding JS logic to generate personalized roadmaps.

📞 Contact
For general inquiries, partnership opportunities or to report a bug, please contact:

Email: gloriamuema98@gmail.com

Website: