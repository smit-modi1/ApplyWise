// Journey flow state
let currentStep = 1;
const totalSteps = 6;
let selectedRoles = [];
let selectedIndustries = [];
let selectedCompanies = [];
let userLocation = '';

// Roles data (20-30 roles across sectors)
const roles = {
  'IT & Tech': [
    'Software Engineer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer',
    'DevOps Engineer', 'Cloud Architect', 'Data Engineer', 'Machine Learning Engineer',
    'Product Manager', 'Technical Product Manager', 'Engineering Manager', 'CTO'
  ],
  'Finance': [
    'Risk Manager', 'Business Control Officer', 'Financial Analyst', 'Investment Analyst',
    'Compliance Officer', 'Treasury Analyst', 'Credit Analyst', 'Portfolio Manager'
  ],
  'Operations': [
    'Operations Manager', 'Product Operations Lead', 'Business Operations Manager',
    'Supply Chain Manager', 'Process Improvement Manager', 'Operations Analyst'
  ],
  'Healthcare': [
    'Healthcare Data Analyst', 'Clinical Operations Manager', 'Healthcare Product Manager',
    'Medical Affairs Manager', 'Healthcare Strategy Analyst'
  ],
  'Other': [
    'Strategy Consultant', 'Business Analyst', 'Project Manager', 'Program Manager',
    'Marketing Manager', 'Sales Manager', 'HR Manager'
  ]
};

// Industries
const industries = [
  'Fintech', 'Banking', 'Healthcare', 'Healthtech', 'E-commerce', 'SaaS',
  'Consulting', 'Insurance', 'Real Estate', 'Education', 'Energy', 'Manufacturing',
  'Retail', 'Telecommunications', 'Media & Entertainment', 'Transportation', 'Aerospace',
  'Automotive', 'Food & Beverage', 'Pharmaceuticals', 'Biotechnology', 'Gaming',
  'Travel & Hospitality', 'Legal Services', 'Non-profit'
];

// Companies data
const companies = [
  { name: 'Stripe', industry: 'Fintech', size: 'large', type: 'private', location: 'San Francisco, USA' },
  { name: 'Revolut', industry: 'Fintech', size: 'large', type: 'private', location: 'London, UK' },
  { name: 'Monzo', industry: 'Fintech', size: 'large', type: 'private', location: 'London, UK' },
  { name: 'Goldman Sachs', industry: 'Banking', size: 'large', type: 'public', location: 'New York, USA' },
  { name: 'JPMorgan Chase', industry: 'Banking', size: 'large', type: 'public', location: 'New York, USA' },
  { name: 'Barclays', industry: 'Banking', size: 'large', type: 'public', location: 'London, UK' },
  { name: 'HSBC', industry: 'Banking', size: 'large', type: 'public', location: 'London, UK' },
  { name: 'Google', industry: 'SaaS', size: 'large', type: 'public', location: 'Mountain View, USA' },
  { name: 'Microsoft', industry: 'SaaS', size: 'large', type: 'public', location: 'Redmond, USA' },
  { name: 'Amazon', industry: 'E-commerce', size: 'large', type: 'public', location: 'Seattle, USA' },
  { name: 'Apple', industry: 'SaaS', size: 'large', type: 'public', location: 'Cupertino, USA' },
  { name: 'Meta', industry: 'SaaS', size: 'large', type: 'public', location: 'Menlo Park, USA' },
  { name: 'Tesla', industry: 'Automotive', size: 'large', type: 'public', location: 'Austin, USA' },
  { name: 'NHS', industry: 'Healthcare', size: 'large', type: 'public', location: 'London, UK' },
  { name: 'Babylon Health', industry: 'Healthtech', size: 'mid', type: 'private', location: 'London, UK' },
  { name: 'Ocado', industry: 'E-commerce', size: 'large', type: 'public', location: 'Hatfield, UK' },
  { name: 'Wise', industry: 'Fintech', size: 'large', type: 'public', location: 'London, UK' },
  { name: 'Checkout.com', industry: 'Fintech', size: 'mid', type: 'private', location: 'London, UK' },
  { name: 'Bloomberg', industry: 'Media & Entertainment', size: 'large', type: 'private', location: 'New York, USA' },
  { name: 'Palantir', industry: 'SaaS', size: 'large', type: 'public', location: 'Denver, USA' },
  { name: 'Shopify', industry: 'E-commerce', size: 'large', type: 'public', location: 'Ottawa, Canada' },
  { name: 'Spotify', industry: 'Media & Entertainment', size: 'large', type: 'public', location: 'Stockholm, Sweden' },
  { name: 'Airbnb', industry: 'Travel & Hospitality', size: 'large', type: 'public', location: 'San Francisco, USA' },
  { name: 'Uber', industry: 'Transportation', size: 'large', type: 'public', location: 'San Francisco, USA' },
  { name: 'Netflix', industry: 'Media & Entertainment', size: 'large', type: 'public', location: 'Los Gatos, USA' }
];

// Initialize journey
document.addEventListener('DOMContentLoaded', function() {
  initializeStep1();
  setupFileUpload();
});

function initializeStep1() {
  const rolesGrid = document.getElementById('rolesGrid');
  rolesGrid.innerHTML = '';
  
  Object.keys(roles).forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'role-category';
    categoryDiv.innerHTML = `<h3>${category}</h3>`;
    
    const rolesContainer = document.createElement('div');
    rolesContainer.className = 'roles-container';
    
    roles[category].forEach(role => {
      const roleBtn = document.createElement('button');
      roleBtn.className = 'role-chip';
      roleBtn.textContent = role;
      roleBtn.onclick = () => toggleRole(role, roleBtn);
      rolesContainer.appendChild(roleBtn);
    });
    
    categoryDiv.appendChild(rolesContainer);
    rolesGrid.appendChild(categoryDiv);
  });
}

function initializeStep2() {
  const industriesGrid = document.getElementById('industriesGrid');
  industriesGrid.innerHTML = '';
  
  industries.forEach(industry => {
    const industryBtn = document.createElement('button');
    industryBtn.className = 'industry-chip';
    industryBtn.textContent = industry;
    industryBtn.onclick = () => toggleIndustry(industry, industryBtn);
    industriesGrid.appendChild(industryBtn);
  });
}

function initializeStep3() {
  const companiesGrid = document.getElementById('companiesGrid');
  companiesGrid.innerHTML = '';
  
  companies.forEach(company => {
    const companyCard = document.createElement('div');
    companyCard.className = 'company-card';
    companyCard.innerHTML = `
      <div class="company-info">
        <h3>${company.name}</h3>
        <p>${company.industry} • ${company.location}</p>
        <span class="company-badge ${company.size}">${company.size}</span>
        <span class="company-badge ${company.type}">${company.type}</span>
      </div>
      <button class="company-select-btn" onclick="toggleCompany('${company.name}', this)">
        Select
      </button>
    `;
    companiesGrid.appendChild(companyCard);
  });
  
  // Setup filters
  setupFilters();
}

function setupFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      this.classList.toggle('active');
      filterCompanies();
    });
  });
  
  document.getElementById('locationFilter').addEventListener('input', filterCompanies);
}

function filterCompanies() {
  const activeFilters = {
    size: Array.from(document.querySelectorAll('.filter-btn[data-filter="size"].active')).map(b => b.dataset.value),
    type: Array.from(document.querySelectorAll('.filter-btn[data-filter="type"].active')).map(b => b.dataset.value),
    location: document.getElementById('locationFilter').value.toLowerCase()
  };
  
  const companyCards = document.querySelectorAll('.company-card');
  companyCards.forEach(card => {
    const companyName = card.querySelector('h3').textContent;
    const company = companies.find(c => c.name === companyName);
    
    let show = true;
    
    if (activeFilters.size.length > 0 && !activeFilters.size.includes(company.size)) {
      show = false;
    }
    if (activeFilters.type.length > 0 && !activeFilters.type.includes(company.type)) {
      show = false;
    }
    if (activeFilters.location && !company.location.toLowerCase().includes(activeFilters.location)) {
      show = false;
    }
    
    card.style.display = show ? 'flex' : 'none';
  });
}

function toggleRole(role, element) {
  if (selectedRoles.includes(role)) {
    selectedRoles = selectedRoles.filter(r => r !== role);
    element.classList.remove('selected');
  } else {
    selectedRoles.push(role);
    element.classList.add('selected');
  }
}

function toggleIndustry(industry, element) {
  if (selectedIndustries.includes(industry)) {
    selectedIndustries = selectedIndustries.filter(i => i !== industry);
    element.classList.remove('selected');
  } else {
    selectedIndustries.push(industry);
    element.classList.add('selected');
  }
}

function toggleCompany(companyName, element) {
  if (selectedCompanies.includes(companyName)) {
    selectedCompanies = selectedCompanies.filter(c => c !== companyName);
    element.textContent = 'Select';
    element.classList.remove('selected');
  } else {
    selectedCompanies.push(companyName);
    element.textContent = 'Selected ✓';
    element.classList.add('selected');
  }
}

function setupFileUpload() {
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('cvUpload');
  
  uploadArea.addEventListener('click', () => fileInput.click());
  
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  });
  
  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
  });
  
  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  });
  
  fileInput.addEventListener('change', (e) => {
    if (e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  });
}

function handleFileUpload(file) {
  const uploadArea = document.getElementById('uploadArea');
  const uploadProgress = document.getElementById('uploadProgress');
  const uploadSuccess = document.getElementById('uploadSuccess');
  const continueBtn = document.getElementById('continueBtn');
  
  uploadArea.style.display = 'none';
  uploadProgress.style.display = 'block';
  
  // Simulate upload progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    const progressCircle = document.querySelector('.progress-ring-progress');
    const percentage = document.querySelector('.progress-percentage');
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (progress / 100) * circumference;
    
    progressCircle.style.strokeDashoffset = offset;
    percentage.textContent = progress + '%';
    
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        uploadProgress.style.display = 'none';
        uploadSuccess.style.display = 'block';
        continueBtn.style.display = 'block';
      }, 500);
    }
  }, 200);
}

function nextStep() {
  // Validation
  if (currentStep === 1 && selectedRoles.length === 0) {
    alert('Please select at least one role');
    return;
  }
  if (currentStep === 2 && selectedIndustries.length === 0) {
    alert('Please select at least one industry');
    return;
  }
  if (currentStep === 3 && selectedCompanies.length === 0) {
    alert('Please select at least one company');
    return;
  }
  
  // Hide current step
  document.getElementById(`step${currentStep}`).classList.remove('active');
  
  // Move to next step
  currentStep++;
  updateProgress();
  
  // Initialize next step
  if (currentStep === 2) {
    initializeStep2();
  } else if (currentStep === 3) {
    initializeStep3();
  } else if (currentStep === 5) {
    startMagicAnimation();
  }
  
  // Show next step
  document.getElementById(`step${currentStep}`).classList.add('active');
}

function prevStep() {
  document.getElementById(`step${currentStep}`).classList.remove('active');
  currentStep--;
  updateProgress();
  document.getElementById(`step${currentStep}`).classList.add('active');
}

function updateProgress() {
  const progress = (currentStep / totalSteps) * 100;
  document.getElementById('progressBar').style.width = progress + '%';
}

function startMagicAnimation() {
  const steps = document.querySelectorAll('.magic-step');
  let stepIndex = 0;
  
  const animateSteps = setInterval(() => {
    if (stepIndex > 0) {
      steps[stepIndex - 1].classList.remove('active');
      steps[stepIndex - 1].querySelector('.magic-step-icon').textContent = '✓';
    }
    
    if (stepIndex < steps.length) {
      steps[stepIndex].classList.add('active');
      stepIndex++;
    } else {
      clearInterval(animateSteps);
      setTimeout(() => {
        nextStep();
      }, 1000);
    }
  }, 1500);
}

function completeOnboarding() {
  // Save user preferences
  localStorage.setItem('selectedRoles', JSON.stringify(selectedRoles));
  localStorage.setItem('selectedIndustries', JSON.stringify(selectedIndustries));
  localStorage.setItem('selectedCompanies', JSON.stringify(selectedCompanies));
  localStorage.setItem('onboardingComplete', 'true');
  
  window.location.href = 'dashboard.html';
}
