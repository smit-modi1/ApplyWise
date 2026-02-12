// Dashboard functionality
function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
  
  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  document.getElementById(`${tabName}Tab`).classList.add('active');
  
  // Load data for the tab
  loadTabData(tabName);
}

function loadTabData(tabName) {
  if (tabName === 'companies') {
    loadCompanies();
  } else if (tabName === 'roles') {
    loadRoles();
  } else if (tabName === 'location') {
    loadLocations();
  } else if (tabName === 'matches') {
    loadMatches();
  }
}

function loadCompanies() {
  const companiesList = document.querySelector('.companies-list');
  const savedCompanies = JSON.parse(localStorage.getItem('selectedCompanies') || '[]');
  
  if (savedCompanies.length === 0) {
    companiesList.innerHTML = '<p class="empty-state">No companies selected yet. Add companies to get started!</p>';
    return;
  }
  
  companiesList.innerHTML = '';
  savedCompanies.forEach(companyName => {
    const companyItem = document.createElement('div');
    companyItem.className = 'company-item';
    companyItem.innerHTML = `
      <div class="company-logo">🏢</div>
      <div class="company-details">
        <h3>${companyName}</h3>
        <p>Company details</p>
      </div>
      <div class="company-actions">
        <button class="btn-secondary-small" onclick="removeCompany('${companyName}')">Remove</button>
      </div>
    `;
    companiesList.appendChild(companyItem);
  });
}

function loadRoles() {
  const rolesSection = document.querySelector('.roles-section');
  const savedRoles = JSON.parse(localStorage.getItem('selectedRoles') || '[]');
  
  if (savedRoles.length === 0) {
    rolesSection.innerHTML = '<p class="empty-state">No roles selected yet.</p>';
    return;
  }
  
  // Group roles by category (simplified)
  const rolesContainer = document.querySelector('.role-chips-container');
  rolesContainer.innerHTML = '';
  
  savedRoles.forEach(role => {
    const roleChip = document.createElement('div');
    roleChip.className = 'role-chip-display';
    roleChip.innerHTML = `
      ${role}
      <button class="remove-btn" onclick="removeRole('${role}')">×</button>
    `;
    rolesContainer.appendChild(roleChip);
  });
}

function loadLocations() {
  const locationsList = document.getElementById('locationsList');
  const savedLocations = JSON.parse(localStorage.getItem('selectedLocations') || '["London, UK", "New York, USA"]');
  
  locationsList.innerHTML = '';
  savedLocations.forEach(location => {
    const locationChip = document.createElement('div');
    locationChip.className = 'location-chip';
    locationChip.innerHTML = `
      ${location}
      <button class="remove-btn" onclick="removeLocation('${location}')">×</button>
    `;
    locationsList.appendChild(locationChip);
  });
}

function loadMatches() {
  // Sample matches data
  const matches = [
    {
      title: 'Senior Risk Manager',
      company: 'Goldman Sachs',
      location: 'New York, USA',
      score: 92,
      salary: '$120k-150k',
      type: 'Full-time',
      remote: true
    },
    {
      title: 'Product Operations Lead',
      company: 'Stripe',
      location: 'San Francisco, USA',
      score: 88,
      salary: '$140k-180k',
      type: 'Full-time',
      remote: true
    },
    {
      title: 'Business Control Officer',
      company: 'Barclays',
      location: 'London, UK',
      score: 85,
      salary: '£80k-100k',
      type: 'Full-time',
      remote: false
    }
  ];
  
  const matchesGrid = document.getElementById('matchesGrid');
  matchesGrid.innerHTML = '';
  
  matches.forEach(match => {
    const matchCard = createMatchCard(match);
    matchesGrid.appendChild(matchCard);
  });
}

function createMatchCard(match) {
  const card = document.createElement('div');
  card.className = 'match-card';
  
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (match.score / 100) * circumference;
  
  card.innerHTML = `
    <div class="match-header">
      <div class="match-company">
        <div class="company-logo-small">🏢</div>
        <div>
          <h3>${match.title}</h3>
          <p>${match.company} • ${match.location}</p>
        </div>
      </div>
      <div class="match-score">
        <div class="score-circle">
          <svg class="score-svg" width="80" height="80">
            <circle cx="40" cy="40" r="36" fill="transparent" stroke="#e5e7eb" stroke-width="6"/>
            <circle cx="40" cy="40" r="36" fill="transparent" stroke="#10b981" stroke-width="6" 
                    stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" class="score-progress"/>
          </svg>
          <div class="score-text">${match.score}%</div>
        </div>
        <span class="score-label">Match Score</span>
      </div>
    </div>
    
    <div class="match-details">
      <div class="match-badges">
        <span class="badge">${match.type}</span>
        ${match.remote ? '<span class="badge">Remote</span>' : ''}
        <span class="badge">${match.salary}</span>
      </div>
      
      <div class="match-documents">
        <div class="document-item">
          <span class="doc-icon">📄</span>
          <span>Tailored CV (DOCX)</span>
          <button class="btn-link-small">Download</button>
        </div>
        <div class="document-item">
          <span class="doc-icon">✉️</span>
          <span>Cover Letter (DOCX)</span>
          <button class="btn-link-small">Download</button>
        </div>
        <div class="document-item">
          <span class="doc-icon">📋</span>
          <span>Job Description</span>
          <button class="btn-link-small">View</button>
        </div>
      </div>
      
      <div class="match-actions">
        <button class="btn-primary">Apply Now</button>
        <button class="btn-secondary">View Details</button>
      </div>
    </div>
  `;
  
  return card;
}

function addLocation() {
  const input = document.getElementById('locationInput');
  const location = input.value.trim();
  
  if (!location) return;
  
  const savedLocations = JSON.parse(localStorage.getItem('selectedLocations') || '[]');
  if (!savedLocations.includes(location)) {
    savedLocations.push(location);
    localStorage.setItem('selectedLocations', JSON.stringify(savedLocations));
    loadLocations();
    input.value = '';
  }
}

function removeLocation(location) {
  const savedLocations = JSON.parse(localStorage.getItem('selectedLocations') || '[]');
  const updated = savedLocations.filter(l => l !== location);
  localStorage.setItem('selectedLocations', JSON.stringify(updated));
  loadLocations();
}

function removeCompany(company) {
  const savedCompanies = JSON.parse(localStorage.getItem('selectedCompanies') || '[]');
  const updated = savedCompanies.filter(c => c !== company);
  localStorage.setItem('selectedCompanies', JSON.stringify(updated));
  loadCompanies();
}

function removeRole(role) {
  const savedRoles = JSON.parse(localStorage.getItem('selectedRoles') || '[]');
  const updated = savedRoles.filter(r => r !== role);
  localStorage.setItem('selectedRoles', JSON.stringify(updated));
  loadRoles();
}

function logout() {
  localStorage.removeItem('onboardingComplete');
  window.location.href = 'index.html';
}

function showAddCompanyModal() {
  alert('Add company modal - to be implemented');
}

function showAddRoleModal() {
  alert('Add role modal - to be implemented');
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
  loadTabData('profile');
});
