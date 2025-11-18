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
        adviceNeeds.innerHTML = `**Needs Check:** Your current spending on Needs (${formatter.format(totalNeedsSpent)}) is **${formatter.format(overspent)}** over the recommended 50% (${formatter.format(targetNeeds)}). You may need to look for lower housing or utility costs.`;
        adviceNeeds.style.color = 'red';
    } else {
        adviceNeeds.innerHTML = `**Needs Check:** You are comfortably within or below the 50% target for Needs. Great job!`;
        adviceNeeds.style.color = 'green';
    }

    // Remaining for Savings & Wants Advice (combines 30% and 20%)
    if (remaining < targetWants + targetSavings) {
        const shortfall = (targetWants + targetSavings) - remaining;
        adviceSavings.innerHTML = `**Action Required:** After paying your Needs, you have ${formatter.format(remaining)} left. This is **${formatter.format(shortfall)}** short of the total 50% needed for Wants and Savings. Focus on reducing Needs spending.`;
        adviceSavings.style.color = 'red';
    } else {
        // If they have enough remaining, show how they can allocate it
        const idealSavings = remaining * (targetSavings / (targetWants + targetSavings));
        const idealWants = remaining * (targetWants / (targetWants + targetSavings));
        adviceSavings.innerHTML = `**Great News!** You have enough to cover your goals. You could aim for ${formatter.format(idealWants)} for your Wants (30%) and **${formatter.format(idealSavings)} for Savings/Debt (20%)**.`;
        adviceSavings.style.color = 'green';
    }

    // Show the results box
    document.getElementById('results').hidden = false;
});