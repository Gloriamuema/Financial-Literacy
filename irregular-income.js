// irregular-income.js

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
    
    // Currency Formatter
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