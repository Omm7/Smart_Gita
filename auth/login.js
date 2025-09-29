
const roleTabs = document.querySelectorAll('.role-tab');
const loginForms = document.querySelectorAll('.login-form');
const userForm = document.getElementById('userForm');
const resetPasswordForm = document.getElementById('resetPasswordForm');
const adminForm = document.getElementById('adminForm');
const forgotPassword = document.getElementById('forgotPassword');
const backToLogin = document.getElementById('backToLogin');


function init() {
    checkIfAlreadyLoggedIn();
    loadEventListeners();
}


function checkIfAlreadyLoggedIn() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        if (currentUser.role === 'admin') {
            window.location.href = '../admin/admin.html';
        } else {
            window.location.href = '../index.html';
        }
    }
}


function loadEventListeners() {
    
    roleTabs.forEach(tab => {
        tab.addEventListener('click', switchRoleTab);
    });

    
    userForm.addEventListener('submit', handleUserLogin);
    resetPasswordForm.addEventListener('submit', handlePasswordReset);
    adminForm.addEventListener('submit', handleAdminLogin);
    
    
    forgotPassword.addEventListener('click', showForgotPasswordForm);
    backToLogin.addEventListener('click', showLoginForm);
}


function switchRoleTab(e) {
    const role = e.currentTarget.getAttribute('data-role');
    
    roleTabs.forEach(tab => tab.classList.remove('active'));
    e.currentTarget.classList.add('active');
    
    loginForms.forEach(form => form.classList.remove('active'));
    
    if (role === 'user') {
        document.getElementById('userLoginForm').classList.add('active');
    } else {
        document.getElementById('adminLoginForm').classList.add('active');
    }
}


function showLoginForm(e) {
    if (e) e.preventDefault();
    loginForms.forEach(form => form.classList.remove('active'));
    document.getElementById('userLoginForm').classList.add('active');
    
    
    roleTabs.forEach(tab => tab.classList.remove('active'));
    document.querySelector('.role-tab[data-role="user"]').classList.add('active');
}

function showForgotPasswordForm(e) {
    e.preventDefault();
    loginForms.forEach(form => form.classList.remove('active'));
    document.getElementById('forgotPasswordForm').classList.add('active');
}


function handleUserLogin(e) {
    e.preventDefault();
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        const currentUser = {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            role: user.role || 'student'
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        window.location.href = '../index.html';
    } else {
        showNotification('Invalid email or password', 'error');
    }
}

function handleAdminLogin(e) {
    e.preventDefault();
    const adminId = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    
    console.log('Admin login attempt:', { adminId, password });
    
    if (adminId === 'admin' && password === 'admin123') {
        const currentUser = {
            id: 'admin-001',
            email: 'admin@gita.edu.in',
            name: 'Administrator',
            role: 'admin'
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        console.log('Admin login successful, redirecting to admin dashboard...');
        
        
        setTimeout(() => {
            window.location.href = '../admin/admin.html';
        }, 100);
    } else {
        console.log('Admin login failed - invalid credentials');
        showNotification('Invalid admin credentials', 'error');
    }
}

function handlePasswordReset(e) {
    e.preventDefault();
    showNotification('Password reset link has been sent to your email', 'success');
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
