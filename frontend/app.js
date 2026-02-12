// Authentication
const DUMMY_CREDENTIALS = {
  email: 'admin@applywise.co.uk',
  password: 'admin@123'
};

function login() {
  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelector('input[type="password"]').value;
  
  if (email === DUMMY_CREDENTIALS.email && password === DUMMY_CREDENTIALS.password) {
    // Check if user has completed onboarding
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    
    if (!onboardingComplete) {
      window.location.href = 'journey.html';
    } else {
      window.location.href = 'dashboard.html';
    }
  } else {
    showError('Invalid credentials. Use: admin@applywise.co.uk / admin@123');
  }
}

function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  errorDiv.style.cssText = 'background: #fee2e2; color: #dc2626; padding: 12px; border-radius: 8px; margin-top: 16px; text-align: center;';
  
  const authCard = document.querySelector('.auth-card');
  const existingError = authCard.querySelector('.error-message');
  if (existingError) existingError.remove();
  
  authCard.appendChild(errorDiv);
  setTimeout(() => errorDiv.remove(), 5000);
}

// Handle Enter key on login
document.addEventListener('DOMContentLoaded', function() {
  const passwordInput = document.querySelector('input[type="password"]');
  if (passwordInput) {
    passwordInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        login();
      }
    });
  }
});
