// Sample Data Structure (This data would ideally come from a live database or API)
const aidResources = [
    { zip: '77002', category: 'Food', name: 'Houston Food Bank', link: 'https://www.houstonfoodbank.org/', description: 'Distributes food through partner pantries.' },
    { zip: '77002', category: 'Housing', name: 'Harris County Rental Assistance', link: 'https://www.harriscountyrentassistance.org/', description: 'Emergency rental and utility assistance program.' },
    { zip: '77002', category: 'Utilities', name: 'Texas LIHEAP Program', link: 'https://www.texasliheap.org/', description: 'Low-Income Home Energy Assistance Program.' },
    { zip: '10001', category: 'Food', name: 'City Harvest NYC', link: 'https://www.cityharvest.org/', description: 'Mobile food pantries across NYC.' },
    { zip: '10001', category: 'Employment', name: 'NYC Workforce1 Career Centers', link: 'https://www.nyc.gov/site/sbs/careers/workforce1.page', description: 'Free job search and training services.' },
    { zip: '90012', category: 'Housing', name: 'Los Angeles Housing Department', link: 'https://housing.lacity.org/', description: 'Information on affordable housing and tenant rights.' },
];

document.getElementById('aid-search-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const zipCode = document.getElementById('aid-zip-code').value.trim();
    const category = document.getElementById('aid-category').value;
    const resultsContainer = document.getElementById('aid-results');

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Filter the resources based on user input
    const filteredResources = aidResources.filter(resource => {
        const zipMatch = resource.zip === zipCode;
        const categoryMatch = category === "" || resource.category === category;
        return zipMatch && categoryMatch;
    });

    if (filteredResources.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">Sorry, no resources were found for that combination. Try searching a different category or a nearby zip code.</p>';
        return;
    }

    // Display the results
    filteredResources.forEach(resource => {
        const resultCard = document.createElement('div');
        resultCard.classList.add('resource-card');
        
        resultCard.innerHTML = `
            <h3>${resource.name} (${resource.category})</h3>
            <p>${resource.description}</p>
            <a href="${resource.link}" target="_blank" class="cta-button primary small">Visit Program Website &rarr;</a>
        `;
        resultsContainer.appendChild(resultCard);
    });
});