document.getElementById('budget-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values (parseFloat handles converting string to number)
    const income = parseFloat(document.getElementById('income').value) || 0;
    const housing = parseFloat(document.getElementById('housing').value) || 0;
    const food = parseFloat(document.getElementById('food').value) || 0;
    const utilities = parseFloat(document.getElementById('utilities').value) || 0;
    const transportation = parseFloat(document.getElementById('transportation').value) || 0;

    // Calculate Totals
    const totalNeedsSpent = housing + food + utilities + transportation;
    const remaining = income - totalNeedsSpent;

    // Calculate 50/30/20 Targets
    const targetNeeds = income * 0.50; // 50% for Needs
    const targetWants = income * 0.30; // 30% for Wants
    const targetSavings = income * 0.20; // 20% for Savings & Debt

    // Update Results Display (Format as currency)
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD', // Assuming USD for formatting, adjust if needed
        minimumFractionDigits: 2,
    });

    document.getElementById('result-income').textContent = formatter.format(income);
    document.getElementById('result-needs-spent').textContent = formatter.format(totalNeedsSpent);
    document.getElementById('result-remaining').textContent = formatter.format(remaining);

    // Provide personalized advice based on targets
    const adviceNeeds = document.getElementById('advice-needs');
    const adviceWants = document.getElementById('advice-wants');
    const adviceSavings = document.getElementById('advice-savings');

    // Needs Advice
    if (totalNeedsSpent > targetNeeds) {
        const overspent = totalNeedsSpent - targetNeeds;
        adviceNeeds.innerHTML = `Needs Check: Your current spending on Needs (${formatter.format(totalNeedsSpent)}) is ${formatter.format(overspent)} over the recommended 50% (${formatter.format(targetNeeds)}). You may need to look for lower housing or utility costs.`;
        adviceNeeds.style.color = 'red';
    } else {
        adviceNeeds.innerHTML = `Needs Check: You are comfortably within or below the 50% target for Needs. Great job!`;
        adviceNeeds.style.color = 'green';
    }

    // Remaining for Savings & Wants Advice (combines 30% and 20%)
    if (remaining < targetWants + targetSavings) {
        const shortfall = (targetWants + targetSavings) - remaining;
        adviceSavings.innerHTML = `Action Required: After paying your Needs, you have ${formatter.format(remaining)} left. This is ${formatter.format(shortfall)} short of the total 50% needed for Wants and Savings. Focus on reducing Needs spending.`;
        adviceSavings.style.color = 'red';
    } else {
        // If they have enough remaining, show how they can allocate it
        const idealSavings = remaining * (targetSavings / (targetWants + targetSavings));
        const idealWants = remaining * (targetWants / (targetWants + targetSavings));
        adviceSavings.innerHTML = `Great News! You have enough to cover your goals. You could aim for ${formatter.format(idealWants)} for your Wants (30%) and ${formatter.format(idealSavings)} for Savings/Debt (20%).`;
        adviceSavings.style.color = 'green';
    }

    // Show the results box
    document.getElementById('results').hidden = false;
});

if (remaining >= targetWants + targetSavings) {
    // Assume a function exists to check if a user is logged in and award a badge
    // updateProgress("Budget_Completed_Goal", 1); 
    // awardBadge('BudgetMaster');
}// --- IRREGULAR INCOME CALCULATOR LOGIC ---

document.getElementById('irregular-income-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Get all four income inputs
    const incomes = [
        parseFloat(document.getElementById('income-m1').value) || 0,
        parseFloat(document.getElementById('income-m2').value) || 0,
        parseFloat(document.getElementById('income-m3').value) || 0,
        parseFloat(document.getElementById('income-m4').value) || 0
    ];

    // 2. Find the lowest income (the SAFE BASE BUDGET)
    const safeBaseIncome = Math.min(...incomes);

    // 3. Calculate the average income
    const totalIncome = incomes.reduce((sum, current) => sum + current, 0);
    const averageIncome = totalIncome / incomes.length;
    
    // Currency Formatter (reuse the one from the standard budget calc)
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });

    // 4. Update Results Display
    document.getElementById('result-average').textContent = formatter.format(averageIncome);
    document.getElementById('result-safe-base').textContent = formatter.format(safeBaseIncome);

    // 5. Provide Actionable Advice
    const difference = averageIncome - safeBaseIncome;
    const adviceElement = document.getElementById('advice-irr-plan');

    adviceElement.innerHTML = `
        <p>Your Safe Base Budget is ${formatter.format(safeBaseIncome)}. This is the income you should use for your mandatory bills (Needs).</p>
        <p>The difference between your average and lowest income is ${formatter.format(difference)}.</p>
        <h4>Action Plan (Buffer Savings):</h4>
        <ul>
            <li>Every month you earn above the Safe Base, save the extra amount (up to ${formatter.format(difference)}).</li>
            <li>This saved amount becomes your Buffer Fund, which you will use only during slow months when your income falls below the Safe Base.</li>
        </ul>
    `;

    document.getElementById('irr-results').hidden = false;
});