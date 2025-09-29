
let users = JSON.parse(localStorage.getItem('users')) || [];
let notices = JSON.parse(localStorage.getItem('notices')) || [];
let academicResources = JSON.parse(localStorage.getItem('academicResources')) || [];


const userWelcome = document.getElementById('userWelcome');
const logoutBtn = document.getElementById('logoutBtn');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');


const totalUsers = document.getElementById('totalUsers');
const totalNotices = document.getElementById('totalNotices');
const totalResources = document.getElementById('totalResources');
const activeSessions = document.getElementById('activeSessions');


const usersTableBody = document.getElementById('usersTableBody');
const noticesTableBody = document.getElementById('noticesTableBody');
const resourcesTableBody = document.getElementById('resourcesTableBody');


const addUserBtn = document.getElementById('addUserBtn');
const addNoticeBtn = document.getElementById('addNoticeBtn');
const addResourceBtn = document.getElementById('addResourceBtn');
const refreshAnalytics = document.getElementById('refreshAnalytics');


const notificationContainer = document.getElementById('notificationContainer');


function init() {
    console.log('Admin dashboard initializing...');
    
    if (!checkAuthentication()) {
        console.log('Authentication failed');
        return;
    }
    
    if (!checkAdminAccess()) {
        console.log('Admin access check failed');
        return;
    }
    
    loadEventListeners();
    loadStats();
    loadUsersTable();
    loadNoticesTable();
    loadResourcesTable();
    
    console.log('Admin dashboard initialized successfully');
}


function checkAuthentication() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    console.log('Authentication check - currentUser:', currentUser);
    
    if (!currentUser) {
        console.log('No user found, redirecting to login');
        showNotification('Please login to access admin panel', 'error');
        setTimeout(() => {
            window.location.href = '../auth/login.html';
        }, 1500);
        return false;
    }
    
    return true;
}


function checkAdminAccess() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    console.log('Admin access check - currentUser:', currentUser);
    
    if (!currentUser || currentUser.role !== 'admin') {
        console.log('User is not admin, redirecting to dashboard');
        showNotification('Access denied. Admin privileges required.', 'error');
        setTimeout(() => {
            window.location.href = '../dashboard/dashboard.html';
        }, 2000);
        return false;
    }
    
    if (userWelcome) {
        userWelcome.textContent = currentUser.name || 'Administrator';
    }
    
    console.log('Admin access granted');
    return true;
}


function loadEventListeners() {
    
    tabButtons.forEach(button => {
        button.addEventListener('click', switchTab);
    });

    
    addUserBtn.addEventListener('click', () => openUserModal());
    addNoticeBtn.addEventListener('click', () => openNoticeModal());
    addResourceBtn.addEventListener('click', () => openResourceModal());
    refreshAnalytics.addEventListener('click', refreshStats);
    
    
    logoutBtn.addEventListener('click', handleLogout);
}


function switchTab(e) {
    const tabId = e.currentTarget.getAttribute('data-tab');
    
    tabButtons.forEach(button => button.classList.remove('active'));
    e.currentTarget.classList.add('active');
    
    tabPanes.forEach(pane => pane.classList.remove('active'));
    document.getElementById(`${tabId}Tab`).classList.add('active');
}


function loadStats() {
    totalUsers.textContent = users.length;
    totalNotices.textContent = notices.length;
    totalResources.textContent = academicResources.length;
    activeSessions.textContent = Math.floor(Math.random() * 50) + 10;
}

function refreshStats() {
    loadStats();
    showNotification('Statistics refreshed successfully!', 'success');
}


function loadUsersTable() {
    
    if (users.length === 0) {
        users = [
            {
                id: 'admin-001',
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin@gita.edu.in',
                role: 'admin',
                branch: 'cse',
                rollNumber: 'ADMIN001',
                semester: '1',
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    usersTableBody.innerHTML = users.map(user => `
        <tr>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.role === 'admin' ? 'Administrator' : 'Student'}</td>
            <td>${getBranchName(user.branch)}</td>
            <td><span class="status-badge status-active">Active</span></td>
            <td>
                <div class="table-actions">
                    <button class="table-btn btn-view" onclick="viewUser(${user.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="table-btn btn-edit" onclick="editUser(${user.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="table-btn btn-delete" onclick="deleteUser(${user.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function getBranchName(branchCode) {
    const branches = {
        'cse': 'CSE',
        'it': 'IT',
        'ece': 'ECE',
        'eee': 'EEE',
        'mech': 'Mechanical',
        'civil': 'Civil'
    };
    return branches[branchCode] || 'N/A';
}

function viewUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        showNotification(`Viewing user: ${user.firstName} ${user.lastName}`, 'success');
    }
}

function editUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        showNotification(`Editing user: ${user.firstName} ${user.lastName}`, 'success');
    }
}

function deleteUser(userId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (userId === currentUser.id) {
        showNotification('You cannot delete your own account', 'error');
        return;
    }
    
    if (confirm('Are you sure you want to delete this user?')) {
        users = users.filter(user => user.id !== userId);
        localStorage.setItem('users', JSON.stringify(users));
        loadUsersTable();
        loadStats();
        showNotification('User deleted successfully!', 'success');
    }
}

function openUserModal() {
    showNotification('Add User functionality would open here', 'success');
}


function loadNoticesTable() {
    
    if (notices.length === 0) {
        notices = [
            {
                id: 1,
                title: "Semester Examination Schedule",
                description: "The schedule for the upcoming semester examinations has been published. All students are requested to check the dates and prepare accordingly.",
                pdfUrl: "",
                date: "2024-01-15",
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                title: "Hackathon 2024 Registration",
                description: "Annual technical hackathon is scheduled for next month. Teams of 2-4 members can participate. Registration starts from next week.",
                pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                date: "2024-01-20",
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('notices', JSON.stringify(notices));
    }
    
    noticesTableBody.innerHTML = notices.map(notice => `
        <tr>
            <td>${notice.title}</td>
            <td>${formatDate(notice.date)}</td>
            <td><span class="status-badge status-active">Active</span></td>
            <td>${Math.floor(Math.random() * 1000)}</td>
            <td>
                <div class="table-actions">
                    <button class="table-btn btn-view" onclick="viewNotice(${notice.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="table-btn btn-edit" onclick="editNotice(${notice.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="table-btn btn-delete" onclick="deleteNotice(${notice.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function viewNotice(noticeId) {
    const notice = notices.find(n => n.id === noticeId);
    if (notice) {
        showNotification(`Viewing notice: ${notice.title}`, 'success');
    }
}

function editNotice(noticeId) {
    const notice = notices.find(n => n.id === noticeId);
    if (notice) {
        showNotification(`Editing notice: ${notice.title}`, 'success');
    }
}

function deleteNotice(noticeId) {
    if (confirm('Are you sure you want to delete this notice?')) {
        notices = notices.filter(notice => notice.id !== noticeId);
        localStorage.setItem('notices', JSON.stringify(notices));
        loadNoticesTable();
        loadStats();
        showNotification('Notice deleted successfully!', 'success');
    }
}

function openNoticeModal() {
    showNotification('Add Notice functionality would open here', 'success');
}


function loadResourcesTable() {
    
    if (academicResources.length === 0) {
        academicResources = [
            {
                id: 1,
                title: "Computer Science Syllabus",
                description: "Complete syllabus for Computer Science Engineering program for all semesters.",
                type: "syllabus",
                pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                title: "Previous Year Question Papers",
                description: "Collection of previous year question papers for all subjects.",
                type: "question",
                pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('academicResources', JSON.stringify(academicResources));
    }
    
    resourcesTableBody.innerHTML = academicResources.map(resource => `
        <tr>
            <td>${resource.title}</td>
            <td>${getResourceTypeLabel(resource.type)}</td>
            <td>${formatDate(resource.createdAt)}</td>
            <td>${Math.floor(Math.random() * 500)}</td>
            <td>
                <div class="table-actions">
                    <button class="table-btn btn-view" onclick="viewResource(${resource.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="table-btn btn-edit" onclick="editResource(${resource.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="table-btn btn-delete" onclick="deleteResource(${resource.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function getResourceTypeLabel(type) {
    const labels = {
        'syllabus': 'Syllabus',
        'notes': 'Study Notes',
        'question': 'Question Papers',
        'timetable': 'Timetable',
        'other': 'Other'
    };
    return labels[type] || 'Document';
}

function viewResource(resourceId) {
    const resource = academicResources.find(r => r.id === resourceId);
    if (resource) {
        window.open(resource.pdfUrl, '_blank');
    }
}

function editResource(resourceId) {
    const resource = academicResources.find(r => r.id === resourceId);
    if (resource) {
        showNotification(`Editing resource: ${resource.title}`, 'success');
    }
}

function deleteResource(resourceId) {
    if (confirm('Are you sure you want to delete this resource?')) {
        academicResources = academicResources.filter(resource => resource.id !== resourceId);
        localStorage.setItem('academicResources', JSON.stringify(academicResources));
        loadResourcesTable();
        loadStats();
        showNotification('Resource deleted successfully!', 'success');
    }
}

function openResourceModal() {
    showNotification('Add Resource functionality would open here', 'success');
}


function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = '../auth/login.html';
}


function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
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


window.viewUser = viewUser;
window.editUser = editUser;
window.deleteUser = deleteUser;
window.viewNotice = viewNotice;
window.editNotice = editNotice;
window.deleteNotice = deleteNotice;
window.viewResource = viewResource;
window.editResource = editResource;
window.deleteResource = deleteResource;
