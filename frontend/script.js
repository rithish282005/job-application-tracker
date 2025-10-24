const form = document.getElementById('appForm');
const list = document.getElementById('applicationList');

const API_URL = 'http://localhost:3000/applications';

// Fetch all applications
async function fetchApplications() {
    const res = await fetch(API_URL);
    const data = await res.json();
    list.innerHTML = '';
    data.forEach(app => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${app.company}</strong> - ${app.jobTitle} (${app.dateApplied}) - <em>${app.status}</em>
            <button onclick="deleteApp(${app.id})">Delete</button>
        `;
        list.appendChild(li);
    });
}

// Add a new application
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newApp = {
        company: form.company.value,
        jobTitle: form.jobTitle.value,
        dateApplied: form.dateApplied.value,
        status: form.status.value
    };
    await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newApp)
    });
    form.reset();
    fetchApplications();
});

// Delete application
async function deleteApp(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchApplications();
}

// Initial fetch
fetchApplications();
