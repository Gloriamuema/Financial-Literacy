// Sample Data Structure (This data would ideally come from a live database or API)
const aidResources = [
    { zip: '77002', category: 'Food', name: 'Houston Food Bank', link: 'https://www.houstonfoodbank.org/', description: 'Distributes food through partner pantries.' },
    { zip: '77002', category: 'Housing', name: 'Harris County Rental Assistance', link: 'https://www.harriscountyrentassistance.org/', description: 'Emergency rental and utility assistance program.' },
    { zip: '77002', category: 'Utilities', name: 'Texas LIHEAP Program', link: 'https://www.texasliheap.org/', description: 'Low-Income Home Energy Assistance Program.' },
    { zip: '10001', category: 'Food', name: 'City Harvest NYC', link: 'https://www.cityharvest.org/', description: 'Mobile food pantries across NYC.' },
    { zip: '10001', category: 'Employment', name: 'NYC Workforce1 Career Centers', link: 'https://www.nyc.gov/site/sbs/careers/workforce1.page', description: 'Free job search and training services.' },
    { zip: '90012', category: 'Housing', name: 'Los Angeles Housing Department', link: 'https://housing.lacity.org/', description: 'Information on affordable housing and tenant rights.' },
];


// aid-finder.js (Simplified Example)

// ... (inside the form submission handler) ...
document.getElementById('aid-search-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const zipCode = document.getElementById('aid-zip-code').value.trim();
    const category = document.getElementById('aid-category').value;
    
    const API_URL = `http://localhost:5000/api/resources?zip=${zipCode}&category=${category}`;

    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // 'data' is the list of resources returned from the Flask API
            // Now loop through 'data' and display the resource cards as before
        })
        .catch(error => {
            // Handle errors (e.g., show a message if the API is down)
            console.error('Fetch error:', error);
        });

// ...
    

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
        
        // Inside the loop that creates resource cards in aid-finder.js
resultCard.innerHTML = `
    <h3>${resource.name} (${resource.category})</h3>
    <span class="verified-badge">✔ Vetted Non-Profit</span>
    <p>${resource.description}</p>
    <div class="user-ratings">User Rating: ★★★★☆ (25 reviews)</div>
    <a href="${resource.link}" ...>Visit Website &rarr;</a>
`;
        resultsContainer.appendChild(resultCard);

    });
});