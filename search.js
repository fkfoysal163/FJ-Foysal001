// Side Search Widget Injector
function initSidebarSearchWidget() {
    const container = document.getElementById('sidebar-search-container');
    if (!container) return;

    container.innerHTML = `
        <form action="search.html" method="GET">
            <div class="input-group">
                <input type="text" name="q" class="form-control" placeholder="কীওয়ার্ড লিখুন..." required>
                <button class="btn btn-primary" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
        </form>
    `;
}

// Perform Search Operation
function handleSearchPage() {
    const resultsContainer = document.getElementById('search-results-container');
    const searchTitle = document.getElementById('search-title-text');
    if (!resultsContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');

    if (!query) {
        if (searchTitle) searchTitle.innerText = "অনুসন্ধান করুন";
        resultsContainer.innerHTML = `<p class="alert alert-info">অনুগ্রহ করে সার্চ বক্সে কিছু লিখে সার্চ করুন।</p>`;
        return;
    }

    if (searchTitle) {
        searchTitle.innerText = `"${query}" - এর অনুসন্ধানের ফলাফল`;
    }

    // Filter jobs based on title or company
    const filteredJobs = allJobs.filter(job => 
        job.title.toLowerCase().includes(query.toLowerCase()) || 
        job.company.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredJobs.length === 0) {
        resultsContainer.innerHTML = `<p class="alert alert-warning">"${query}" সম্পর্কিত কোনো চাকরি পাওয়া যায়নি।</p>`;
        return;
    }

    let html = '';
    filteredJobs.forEach(job => {
        html += `
            <div class="card mb-3 shadow-sm border-0">
                <div class="card-body">
                    <h5 class="card-title fw-bold"><a href="job.html?id=${job.id}" class="text-decoration-none text-dark">${job.title}</a></h5>
                    <p class="card-text text-muted mb-2"><i class="fa-regular fa-building me-1"></i>${job.company} | <i class="fa-solid fa-location-dot me-1"></i>${job.location}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge bg-danger">ডেডলাইন: ${job.deadline}</span>
                        <a href="job.html?id=${job.id}" class="btn btn-sm btn-outline-primary">বিস্তারিত দেখুন</a>
                    </div>
                </div>
            </div>
        `;
    });

    resultsContainer.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    initSidebarSearchWidget();
    handleSearchPage();
});