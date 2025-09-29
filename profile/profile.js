
let users = JSON.parse(localStorage.getItem('users')) || [];


const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const profileRole = document.getElementById('profileRole');
const profileForm = document.getElementById('profileForm');
const cancelBtn = document.getElementById('cancelBtn');
const userWelcome = document.getElementById('userWelcome');
const logoutBtn = document.getElementById('logoutBtn');
const notificationContainer = document.getElementById('notificationContainer');


function init() {
    if (!checkAuthentication()) return;
    
    loadEventListeners();
    loadUserData();
}


function checkAuthentication() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = '../auth/login.html';
        return false;
    }
    
    return true;
}


function loadEventListeners() {
    profileForm.addEventListener('submit', handleProfileUpdate);
    cancelBtn.addEventListener('click', handleCancel);
    logoutBtn.addEventListener('click', handleLogout);
}


function loadUserData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        userWelcome.textContent = currentUser.name;
        
        const userData = users.find(user => user.email === currentUser.email);
        
        if (userData) {
            document.getElementById('profileFirstName').value = userData.firstName || '';
            document.getElementById('profileLastName').value = userData.lastName || '';
            document.getElementById('profileEmailInput').value = userData.email || '';
            document.getElementById('profilePhone').value = userData.phone || '';
            document.getElementById('profileRollNumber').value = userData.rollNumber || '';
            document.getElementById('profileBranch').value = userData.branch || '';
            document.getElementById('profileSemester').value = userData.semester || '';
            
            profileName.textContent = `${userData.firstName} ${userData.lastName}`;
            profileEmail.textContent = userData.email;
            profileRole.textContent = userData.role === 'admin' ? 'Administrator' : 'Student';
        }
    }
}


function handleProfileUpdate(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('profileFirstName').value;
    const lastName = document.getElementById('profileLastName').value;
    const email = document.getElementById('profileEmailInput').value;
    const phone = document.getElementById('profilePhone').value;
    const rollNumber = document.getElementById('profileRollNumber').value;
    const branch = document.getElementById('profileBranch').value;
    const semester = document.getElementById('profileSemester').value;
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;
    
    const userIndex = users.findIndex(user => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return user.email === currentUser.email;
    });
    
    if (userIndex === -1) {
        showNotification('User not found', 'error');
        return;
    }
    
    if (email !== users[userIndex].email) {
        const emailExists = users.some(user => user.email === email && user.email !== users[userIndex].email);
        if (emailExists) {
            showNotification('Email already exists. Please use a different email.', 'error');
            return;
        }
    }
    
    if (currentPassword || newPassword || confirmNewPassword) {
        if (!currentPassword) {
            showNotification('Please enter your current password to change password', 'error');
            return;
        }
        
        if (currentPassword !== users[userIndex].password) {
            showNotification('Current password is incorrect', 'error');
            return;
        }
        
        if (newPassword.length < 6) {
            showNotification('New password must be at least 6 characters', 'error');
            return;
        }
        
        if (newPassword !== confirmNewPassword) {
            showNotification('New passwords do not match', 'error');
            return;
        }
        
        users[userIndex].password = newPassword;
    }
    
    users[userIndex] = {
        ...users[userIndex],
        firstName,
        lastName,
        email,
        phone: phone || '',
        rollNumber,
        branch,
        semester
    };
    
    const currentUser = {
        email: users[userIndex].email,
        name: `${users[userIndex].firstName} ${users[userIndex].lastName}`,
        role: users[userIndex].role
    };
    
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    profileName.textContent = currentUser.name;
    profileEmail.textContent = currentUser.email;
    userWelcome.textContent = currentUser.name;
    
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmNewPassword').value = '';
    
    showNotification('Profile updated successfully!', 'success');
}


function handleCancel() {
    loadUserData();
    showNotification('Changes discarded', 'error');
}


function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = '../auth/login.html';
}


function showNotification(message, type) {
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
