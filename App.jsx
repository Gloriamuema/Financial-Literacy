import React, { useState, useCallback } from 'react';
import { Home, BookOpen, Wrench, FileText, Info, Menu, X, DollarSign, Zap, Wallet, CreditCard, PiggyBank, Search, ShieldCheck } from 'lucide-react';

// --- Global Constants ---
// Use the provided app ID from the environment for display
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// --- Reusable UI Components ---

/**
 * Renders a card for the 3 main financial goals on the Home page.
 */
const GoalCard = ({ title, description, icon: Icon, color, onClick }) => {
    const colorClasses = {
        teal: 'border-teal-500 text-teal-600 bg-teal-100 ring-teal-500/30 hover:border-teal-800 hover:bg-teal-200',
        red: 'border-red-500 text-red-600 bg-red-100 ring-red-500/30 hover:border-red-800 hover:bg-red-200',
        green: 'border-green-500 text-green-600 bg-green-100 ring-green-500/30 hover:border-green-800 hover:bg-green-200',
    };
    const classes = colorClasses[color];

    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center p-6 border-2 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.03] ${classes} text-center`}
        >
            <div className={`p-3 rounded-full mb-3 ring-4 ${classes}`}>
                <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-700 mb-4">{description}</p>
            <span className={`text-sm font-semibold mt-auto ${classes.split(' ')[1]}`}>
                Start &rarr;
            </span>
        </button>
    );
};

/**
 * Renders a link/card for a learning module.
 */
const ModuleItem = ({ title, description, theme }) => {
    const accentClasses = {
        teal: 'border-teal-400 hover:bg-teal-100 text-teal-800',
        indigo: 'border-indigo-400 hover:bg-indigo-100 text-indigo-800',
        green: 'border-green-400 hover:bg-green-100 text-green-800',
        red: 'border-red-400 hover:bg-red-100 text-red-800',
    };
    const classes = accentClasses[theme];

    return (
        <div className={`p-6 border-l-4 rounded-lg shadow-md transition-colors ${classes} bg-white`}>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 mb-4">{description}</p>
            <button onClick={() => console.log('Lesson started')} className={`text-sm font-medium ${classes.split(' ')[2] || 'text-indigo-600'} hover:underline`}>
                Start Lesson
            </button>
        </div>
    );
};

/**
 * Renders a card for a financial tool/calculator.
 */
const ToolCard = ({ title, description, icon: Icon }) => {
    return (
        <div className="flex flex-col p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
                {Icon && <Icon className="h-6 w-6 text-indigo-600" />}
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4 flex-grow">{description}</p>
            <button onClick={() => console.log(`Tool used: ${title}`)} className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm self-start">
                Use Tool &rarr;
            </button>
        </div>
    );
};

/**
 * Renders a card for a tax help resource.
 */
const TaxResourceCard = ({ title, description }) => (
    <div className="p-5 bg-white rounded-lg shadow-md border-b-2 border-yellow-500 transition-shadow hover:shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
            <ShieldCheck className="w-5 h-5 mr-2 text-yellow-600" />
            {title}
        </h3>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <button onClick={() => console.log(`Tax resource viewed: ${title}`)} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            Read Guide &rarr;
        </button>
    </div>
);

/**
 * Renders a card for a team member.
 */
const TeamMember = ({ name, role, bio }) => (
    <div className="p-4 bg-indigo-50 rounded-lg shadow-md text-center">
        <div className="w-20 h-20 bg-indigo-200 rounded-full mx-auto mb-3 flex items-center justify-center text-indigo-700 font-bold text-lg">
            {name.split(' ').map(n => n[0]).join('')}
        </div>
        <h4 className="font-semibold text-gray-900">{name}</h4>
        <p className="text-sm text-indigo-600">{role}</p>
        <p className="text-xs text-gray-600 mt-2">{bio}</p>
    </div>
);

// --- Page Content Components ---

// Home Page Component
const HomePage = ({ handleNavClick }) => (
    <div className="space-y-12 p-4 sm:p-8">
        {/* Hero Section */}
        <section className="bg-indigo-700 text-white rounded-xl shadow-xl p-8 sm:p-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">
                Unlock Your Financial Strength
            </h1>
            <p className="text-indigo-200 text-lg mb-8 max-w-2xl mx-auto">
                Simple, free, easy-to-understand steps to build stability and confidence for your family.
            </p>
            <div className="flex justify-center space-x-4 flex-wrap gap-4">
                <button
                    onClick={() => handleNavClick('Learn')}
                    className="px-6 py-3 bg-yellow-400 text-indigo-900 font-bold rounded-full shadow-lg hover:bg-yellow-300 transition-transform transform hover:scale-105"
                >
                    Start Learning Today
                </button>
                <button
                    onClick={() => handleNavClick('Tools')}
                    className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full shadow-lg hover:bg-white hover:text-indigo-700 transition-colors transition-transform transform hover:scale-105"
                >
                    Try Our Budget Tool
                </button>
            </div>
        </section>

        {/* Modules Quick Access Section */}
        <section>
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                Start Here: Your 3 Financial Goals
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
                <GoalCard
                    title="Budgeting Mastery"
                    description="Take control of your cash flow and build a sustainable monthly plan."
                    icon={Wallet}
                    color="teal"
                    onClick={() => handleNavClick('Learn')}
                />
                <GoalCard
                    title="Debt Freedom"
                    description="Strategies to manage, reduce, and eliminate high-interest debt quickly."
                    icon={CreditCard}
                    color="red"
                    onClick={() => handleNavClick('Learn')}
                />
                <GoalCard
                    title="Building Savings"
                    description="Establish an emergency fund and start planning for long-term wealth."
                    icon={PiggyBank}
                    color="green"
                    onClick={() => handleNavClick('Learn')}
                />
            </div>
        </section>

        {/* Aid Finder Section */}
        <section className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-yellow-400">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <Search className="h-6 w-6 mr-2 text-yellow-500" /> Need Immediate Help?
            </h2>
            <p className="text-gray-600 mb-6">
                Find nearby resources for food, rent, utilities, and healthcare. We connect you directly to local programs.
            </p>
            <div className="flex space-x-3 max-w-md">
                <input
                    type="text"
                    placeholder="Enter your Zip Code (e.g., 90210)"
                    className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button className="px-5 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                    Find Aid
                </button>
            </div>
        </section>
    </div>
);

// Learn Modules Page Component
const LearnModules = () => (
    <div className="p-4 sm:p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-2">
            Learning Modules: Core Concepts
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ModuleItem title="1. The Zero-Based Budget" description="Learn the most effective method for tracking every dollar you earn and spend." theme="teal" />
            <ModuleItem title="2. Credit Score Secrets" description="Understand the five factors that impact your score and how to improve it fast." theme="indigo" />
            <ModuleItem title="3. Emergency Fund Basics" description="The essential guide to saving 3-6 months of expenses for peace of mind." theme="green" />
            <ModuleItem title="4. Understanding Compound Interest" description="Harness the power of passive growth for savings and long-term investments." theme="red" />
            <ModuleItem title="5. Student Loan Repayment" description="Compare repayment plans and find forgiveness programs you qualify for." theme="indigo" />
            <ModuleItem title="6. Basics of Insurance" description="What you need to know about life, health, auto, and home insurance coverage." theme="teal" />
        </div>
    </div>
);

// Financial Tools Page Component
const FinancialTools = () => (
    <div className="p-4 sm:p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-2">
            Financial Calculators & Tools
        </h1>
        <p className="text-gray-600">
            Use our interactive tools to run scenarios and gain clarity on your financial journey.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolCard title="Debt Payoff Calculator" description="See how much interest you can save by making extra payments." icon="CreditCard" />
            <ToolCard title="Net Worth Tracker" description="Calculate your assets minus liabilities to see your current financial standing." icon="PiggyBank" />
            <ToolCard title="Retirement Savings Estimator" description="Project your future retirement income based on your current contributions." icon="DollarSign" />
            <ToolCard title="Mortgage Affordability" description="Determine how much house you can realistically afford based on income and debt." icon="Home" />
            <ToolCard title="Budget Template Generator" description="Download a pre-built spreadsheet template for your monthly budget." icon="FileText" />
            <ToolCard title="Compound Interest Calculator" description="See how quickly your savings can grow over time with compounding." icon="Zap" />
        </div>
    </div>
);

// Tax Help Page Component
const TaxHelp = () => (
    <div className="p-4 sm:p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-2">
            Tax Help & Resources
        </h1>
        <p className="text-gray-600 mb-6">
            Stay compliant and maximize your returns with our simplified tax guides.
        </p>
        <div className="space-y-6">
            <TaxResourceCard title="Understanding W-2 vs. 1099 Forms" description="A clear breakdown of the difference between being a salaried employee and an independent contractor for tax purposes." />
            <TaxResourceCard title="Deductions and Credits Every Taxpayer Should Know" description="A checklist of common tax breaks to ensure you are not leaving money on the table." />
            <TaxResourceCard title="Guide to Filing Estimated Quarterly Taxes" description="Essential information for freelancers and small business owners on IRS requirements for quarterly payments." />
            <TaxResourceCard title="Where to Find Free Tax Assistance Services" description="Local and national programs offering free tax preparation for eligible individuals and families." />
        </div>
    </div>
);

// About Us Component
const AboutUs = () => (
    <div className="p-4 sm:p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-2">
            About Finance Forward
        </h1>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-600 space-y-4">
            <p className="text-lg text-gray-700">
                Founded on the principle of financial accessibility, **Finance Forward** aims to democratize financial knowledge. We believe everyone deserves the tools and education necessary to achieve economic security, regardless of their background.
            </p>
            <p className="text-gray-600">
                Our content is meticulously curated by certified financial planners and experienced educators to ensure accuracy, clarity, and actionable advice. We are committed to providing free, unbiased, and confidential resources to help you succeed.
            </p>
        </div>

        <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <TeamMember name="Erica Jonson, CFP" role="Chief Financial Educator" bio="Erica specializes in debt management and credit repair strategies." />
                <TeamMember name="Marcus Chen" role="Technology Lead" bio="Marcus develops our calculators and ensures data security." />
                <TeamMember name="Sarah Ali" role="Community Outreach Director" bio="Sarah connects users with local aid programs and resources." />
            </div>
        </section>
    </div>
);

// --- Main Application Component ---
const App = () => {
    const [currentPage, setCurrentPage] = useState('Home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Define the navigation structure
    const navItems = [
        { name: 'Home', component: HomePage, icon: Home },
        { name: 'Learn', component: LearnModules, icon: BookOpen },
        { name: 'Tools', component: FinancialTools, icon: Wrench },
        { name: 'Tax Help', component: TaxHelp, icon: FileText },
        { name: 'About Us', component: AboutUs, icon: Info },
    ];

    // Function to determine which component to render
    const renderPage = useCallback(() => {
        const PageComponent = navItems.find(item => item.name === currentPage)?.component;
        // Pass handleNavClick down to HomePage for internal navigation
        return PageComponent ? (
            <PageComponent handleNavClick={handleNavClick} />
        ) : (
            <div className="p-8 text-center text-red-500">Page Not Found</div>
        );
    }, [currentPage, navItems]);

    const handleNavClick = (pageName) => {
        setCurrentPage(pageName);
        // Close mobile menu after clicking a link
        setIsMobileMenuOpen(false);
    };

    const NavLink = ({ item, isMobile = false }) => {
        const isActive = currentPage === item.name;
        const activeClasses = isMobile ? 'bg-indigo-700 text-white' : 'text-yellow-300 border-yellow-300';
        const inactiveClasses = isMobile ? 'text-indigo-200 hover:bg-indigo-700 hover:text-white' : 'text-white hover:text-indigo-200 transition duration-150 font-medium pb-1 border-b-2 border-transparent hover:border-yellow-300';

        return (
            <button
                onClick={() => handleNavClick(item.name)}
                className={`flex items-center text-sm font-medium rounded-lg transition-all duration-200 ${isMobile ? 'w-full p-3' : 'pb-1'} ${isActive ? activeClasses : inactiveClasses}`}
                aria-current={isActive ? 'page' : undefined}
            >
                {isMobile && <item.icon className="h-5 w-5 mr-3" />}
                {item.name}
            </button>
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header / Navbar */}
            <header className="bg-indigo-900 shadow-lg z-40 sticky top-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <button onClick={() => handleNavClick('Home')} className="flex items-center space-x-2 text-xl font-extrabold text-white">
                            <Zap className="h-7 w-7 text-yellow-400" />
                            <span>FINANCE FORWARD</span>
                        </button>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex md:space-x-8">
                            {navItems.map(item => (
                                <NavLink key={item.name} item={item} />
                            ))}
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            className="md:hidden p-2 rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div id="mobile-menu" className="md:hidden bg-indigo-800">
                        <div className="pt-2 pb-3 space-y-1 px-2 sm:px-3">
                            {navItems.map(item => (
                                <NavLink key={item.name} item={item} isMobile={true} />
                            ))}
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content Area */}
            <main id="main-content" className="flex-grow max-w-7xl mx-auto w-full">
                {renderPage()}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
                    <p className="text-sm mb-2">
                        &copy; 2025 Finance Forward | Financial Stability Resources
                    </p>
                    <p className="text-xs text-gray-400 mb-3">
                        Free, Unbiased, and Confidential Resources.
                    </p>
                    <div className="text-xs text-gray-500 space-x-4">
                        <button onClick={() => console.log('Privacy Policy clicked')} className="hover:text-white transition-colors">
                            Privacy Policy
                        </button>
                        <span>|</span>
                        <button onClick={() => console.log('Contact Us clicked')} className="hover:text-white transition-colors">
                            Contact Us
                        </button>
                    </div>
                    <p className="mt-3 text-xs text-gray-600">
                        App ID: {appId}
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default App;