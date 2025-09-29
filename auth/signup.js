
const signupForm = document.getElementById('signupForm');


function init() {
    checkIfAlreadyLoggedIn();
    loadEventListeners();
}


function checkIfAlreadyLoggedIn() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        window.location.href = '../index.html';
    }
}


function loadEventListeners() {
    signupForm.addEventListener('submit', handleSignup);
    
    document.getElementById('confirmPassword').addEventListener('input', validatePasswordMatch);
}


function validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    if (confirmPassword && password !== confirmPassword) {
        confirmPasswordInput.style.borderColor = 'var(--premium-red)';
    } else {
        confirmPasswordInput.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    }
}


function handleSignup(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const branch = document.getElementById('branch').value;
    const rollNumber = document.getElementById('rollNumber').value;
    const semester = document.getElementById('semester').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    if (!firstName || !lastName || !email || !branch || !rollNumber || !semester || !password || !confirmPassword) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }
    
    if (!agreeTerms) {
        showNotification('Please agree to the terms and conditions', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === email);
    
    if (existingUser) {
        showNotification('Email already registered. Please use a different email.', 'error');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        phone: phone || '',
        branch,
        rollNumber,
        semester,
        password,
        createdAt: new Date().toISOString(),
        role: 'student'
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    const currentUser = {
        email: newUser.email,
        name: `${newUser.firstName} ${newUser.lastName}`,
        role: 'student'
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    showNotification('Account created successfully! Redirecting...', 'success');
    
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 2000);
}


function showNotification(message, type) {
    const notificationContainer = document.getElementById('notificationContainer');
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    notificationContainer.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}


document.addEventListener('DOMContentLoaded', init);
