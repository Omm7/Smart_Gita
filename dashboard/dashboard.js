
let currentEditingNotice = null;
let currentEditingAcademic = null;


let notices = JSON.parse(localStorage.getItem('notices')) || [
    {
        id: 1,
        title: "Semester Examination Schedule",
        description: "The schedule for the upcoming semester examinations has been published. All students are requested to check the dates and prepare accordingly.",
        pdfUrl: "https://drive.google.com/uc?export=download&id=1c4h1Hv4a4y8X4h8J4k4L4p4N4r4t4V4w",
        date: "2024-01-15",
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        title: "Hackathon 2024 Registration",
        description: "Annual technical hackathon is scheduled for next month. Teams of 2-4 members can participate. Registration starts from next week.",
        pdfUrl: "https://drive.google.com/uc?export=download&id=1c4h1Hv4a4y8X4h8J4k4L4p4N4r4t4V4w",
        date: "2024-01-20",
        createdAt: new Date().toISOString()
    }
];

let academicResources = JSON.parse(localStorage.getItem('academicResources')) || [
    {
        id: 1,
        title: "Computer Science Syllabus",
        description: "Complete syllabus for Computer Science Engineering program for all semesters.",
        type: "syllabus",
        pdfUrl: "https://drive.google.com/uc?export=download&id=1c4h1Hv4a4y8X4h8J4k4L4p4N4r4t4V4w",
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        title: "Previous Year Question Papers",
        description: "Collection of previous year question papers for all subjects.",
        type: "question",
        pdfUrl: "https://drive.google.com/uc?export=download&id=1c4h1Hv4a4y8X4h8J4k4L4p4N4r4t4V4w",
        createdAt: new Date().toISOString()
    }
];


const appHeader = document.querySelector('.app-header');
const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');
const userWelcome = document.getElementById('userWelcome');
const userMenuBtn = document.getElementById('userMenuBtn');
const userDropdown = document.getElementById('userDropdown');
const logoutBtn = document.getElementById('logoutBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.querySelector('.nav-menu');
const globalSearch = document.getElementById('globalSearch');


const noticeAdminControls = document.getElementById('noticeAdminControls');
const addNoticeBtn = document.getElementById('addNoticeBtn');
const noticesContainer = document.getElementById('noticesContainer');


const academicAdminControls = document.getElementById('academicAdminControls');
const addAcademicBtn = document.getElementById('addAcademicBtn');
const academicGrid = document.getElementById('academicGrid');


const contactForm = document.getElementById('contactForm');


const noticeModal = document.getElementById('noticeModal');
const academicModal = document.getElementById('academicModal');


const closeNoticeModal = document.getElementById('closeNoticeModal');
const closeAcademicModal = document.getElementById('closeAcademicModal');
const cancelNotice = document.getElementById('cancelNotice');
const cancelAcademic = document.getElementById('cancelAcademic');
const noticeForm = document.getElementById('noticeForm');
const academicForm = document.getElementById('academicForm');
const noticeModalTitle = document.getElementById('noticeModalTitle');
const academicModalTitle = document.getElementById('academicModalTitle');


const notificationContainer = document.getElementById('notificationContainer');


function init() {
    if (!checkAuthentication()) return;
    
    loadEventListeners();
    renderNotices();
    renderAcademicResources();
    setupHeaderScroll();
    updateUIForUser();
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
    
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    
    userMenuBtn.addEventListener('click', toggleUserDropdown);
    logoutBtn.addEventListener('click', handleLogout);
    document.addEventListener('click', closeUserDropdown);

    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    
    globalSearch.addEventListener('input', handleGlobalSearch);

    
    addNoticeBtn.addEventListener('click', () => openNoticeModal());

    
    addAcademicBtn.addEventListener('click', () => openAcademicModal());

    
    contactForm.addEventListener('submit', handleContactSubmit);

    
    closeNoticeModal.addEventListener('click', () => closeModal(noticeModal));
    closeAcademicModal.addEventListener('click', () => closeModal(academicModal));
    cancelNotice.addEventListener('click', () => closeModal(noticeModal));
    cancelAcademic.addEventListener('click', () => closeModal(academicModal));
    noticeForm.addEventListener('submit', handleNoticeSubmit);
    academicForm.addEventListener('submit', handleAcademicSubmit);

    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
}


function setupHeaderScroll() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            appHeader.classList.add('scrolled');
        } else {
            appHeader.classList.remove('scrolled');
        }
    });
}


function updateUIForUser() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        userWelcome.textContent = currentUser.name;
        
        if (currentUser.role === 'admin') {
            noticeAdminControls.style.display = 'block';
            academicAdminControls.style.display = 'block';
        } else {
            noticeAdminControls.style.display = 'none';
            academicAdminControls.style.display = 'none';
        }
    }
}


function handleNavigation(e) {
    e.preventDefault();
    
    if (!checkAuthentication()) return;
    
    const section = e.currentTarget.getAttribute('data-section');
    
    
    if (section === 'courses') {
        window.location.href = '../index.html';
        return;
    }
    
    navLinks.forEach(link => link.classList.remove('active'));
    e.currentTarget.classList.add('active');
    
    contentSections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(`${section}Section`).classList.add('active');
    
    navMenu.classList.remove('active');
}

function toggleUserDropdown() {
    userDropdown.classList.toggle('show');
}

function closeUserDropdown(e) {
    if (!e.target.closest('.user-menu')) {
        userDropdown.classList.remove('show');
    }
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
}

function handleGlobalSearch() {
    const term = globalSearch.value.toLowerCase();
    
    if (term.length > 2) {
        filterNotices(term);
        filterAcademicResources(term);
    } else {
        renderNotices();
        renderAcademicResources();
    }
}

function filterNotices(term) {
    const filteredNotices = notices.filter(notice => 
        notice.title.toLowerCase().includes(term) || 
        notice.description.toLowerCase().includes(term)
    );
    renderNotices(filteredNotices);
}

function filterAcademicResources(term) {
    const filteredResources = academicResources.filter(resource => 
        resource.title.toLowerCase().includes(term) || 
        resource.description.toLowerCase().includes(term)
    );
    renderAcademicResources(filteredResources);
}


function renderNotices(noticesToRender = notices) {
    const sortedNotices = [...noticesToRender].sort((a, b) => new Date(b.date) - new Date(a.date));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isAdmin = currentUser && currentUser.role === 'admin';
    
    noticesContainer.innerHTML = sortedNotices.map(notice => `
        <div class="notice-card">
            <div class="notice-header">
                <div>
                    <h3 class="notice-title">${notice.title}</h3>
                    <span class="notice-date">${formatDate(notice.date)}</span>
                </div>
                ${isAdmin ? `
                    <div class="notice-actions">
                        <button class="action-btn btn-edit" onclick="editNotice(${notice.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="action-btn btn-delete" onclick="deleteNotice(${notice.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                ` : ''}
            </div>
            <p class="notice-description">${notice.description}</p>
            ${notice.pdfUrl ? `
                <div class="pdf-download-section">
                    <a href="${notice.pdfUrl}" class="pdf-download-btn" download target="_blank" onclick="trackDownload('${notice.title}', 'notice')">
                        <i class="fas fa-download"></i> Download PDF
                    </a>
                    <span class="file-size">PDF Document</span>
                </div>
            ` : ''}
        </div>
    `).join('');
}

function openNoticeModal(notice = null) {
    currentEditingNotice = notice;
    
    if (notice) {
        noticeModalTitle.textContent = 'Edit Notice';
        document.getElementById('noticeTitle').value = notice.title;
        document.getElementById('noticeDescription').value = notice.description;
        document.getElementById('noticePdf').value = notice.pdfUrl || '';
        document.getElementById('noticeDate').value = notice.date;
    } else {
        noticeModalTitle.textContent = 'Add New Notice';
        noticeForm.reset();
        document.getElementById('noticeDate').value = new Date().toISOString().split('T')[0];
    }
    
    noticeModal.classList.add('active');
}

function handleNoticeSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('noticeTitle').value;
    const description = document.getElementById('noticeDescription').value;
    const pdfUrl = document.getElementById('noticePdf').value;
    const date = document.getElementById('noticeDate').value;
    
    
    const processedPdfUrl = processGoogleDriveLink(pdfUrl);
    
    if (currentEditingNotice) {
        const index = notices.findIndex(n => n.id === currentEditingNotice.id);
        if (index !== -1) {
            notices[index] = {
                ...currentEditingNotice,
                title,
                description,
                pdfUrl: processedPdfUrl,
                date
            };
        }
    } else {
        const newNotice = {
            id: notices.length > 0 ? Math.max(...notices.map(n => n.id)) + 1 : 1,
            title,
            description,
            pdfUrl: processedPdfUrl,
            date,
            createdAt: new Date().toISOString()
        };
        notices.push(newNotice);
    }
    
    localStorage.setItem('notices', JSON.stringify(notices));
    renderNotices();
    closeModal(noticeModal);
    currentEditingNotice = null;
    
    showNotification(`Notice "${title}" has been ${currentEditingNotice ? 'updated' : 'added'} successfully!`, 'success');
}

function editNotice(noticeId) {
    const notice = notices.find(n => n.id === noticeId);
    if (notice) {
        openNoticeModal(notice);
    }
}

function deleteNotice(noticeId) {
    if (confirm('Are you sure you want to delete this notice?')) {
        notices = notices.filter(notice => notice.id !== noticeId);
        localStorage.setItem('notices', JSON.stringify(notices));
        renderNotices();
        showNotification('Notice deleted successfully!', 'success');
    }
}


function renderAcademicResources(resourcesToRender = academicResources) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isAdmin = currentUser && currentUser.role === 'admin';
    
    academicGrid.innerHTML = resourcesToRender.map(resource => `
        <div class="academic-card">
            <div class="academic-icon">
                <i class="fas fa-file-pdf"></i>
            </div>
            <span class="academic-type">${getResourceTypeLabel(resource.type)}</span>
            <h3 class="academic-title">${resource.title}</h3>
            <p class="academic-description">${resource.description}</p>
            <div class="pdf-download-section">
                <a href="${resource.pdfUrl}" class="pdf-download-btn" download target="_blank" onclick="trackDownload('${resource.title}', '${resource.type}')">
                    <i class="fas fa-download"></i> Download PDF
                </a>
                <span class="file-size">${getResourceTypeLabel(resource.type)} Document</span>
            </div>
            ${isAdmin ? `
                <div class="notice-actions" style="margin-top: 15px;">
                    <button class="action-btn btn-edit" onclick="editAcademicResource(${resource.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn btn-delete" onclick="deleteAcademicResource(${resource.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            ` : ''}
        </div>
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

function openAcademicModal(resource = null) {
    currentEditingAcademic = resource;
    
    if (resource) {
        academicModalTitle.textContent = 'Edit Academic Resource';
        document.getElementById('academicTitle').value = resource.title;
        document.getElementById('academicDescription').value = resource.description;
        document.getElementById('academicType').value = resource.type;
        document.getElementById('academicPdf').value = resource.pdfUrl;
    } else {
        academicModalTitle.textContent = 'Add Academic Resource';
        academicForm.reset();
    }
    
    academicModal.classList.add('active');
}

function handleAcademicSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('academicTitle').value;
    const description = document.getElementById('academicDescription').value;
    const type = document.getElementById('academicType').value;
    const pdfUrl = document.getElementById('academicPdf').value;
    
    
    const processedPdfUrl = processGoogleDriveLink(pdfUrl);
    
    if (currentEditingAcademic) {
        const index = academicResources.findIndex(r => r.id === currentEditingAcademic.id);
        if (index !== -1) {
            academicResources[index] = {
                ...currentEditingAcademic,
                title,
                description,
                type,
                pdfUrl: processedPdfUrl
            };
        }
    } else {
        const newResource = {
            id: academicResources.length > 0 ? Math.max(...academicResources.map(r => r.id)) + 1 : 1,
            title,
            description,
            type,
            pdfUrl: processedPdfUrl,
            createdAt: new Date().toISOString()
        };
        academicResources.push(newResource);
    }
    
    localStorage.setItem('academicResources', JSON.stringify(academicResources));
    renderAcademicResources();
    closeModal(academicModal);
    currentEditingAcademic = null;
    
    showNotification(`Academic resource "${title}" has been ${currentEditingAcademic ? 'updated' : 'added'} successfully!`, 'success');
}

function editAcademicResource(resourceId) {
    const resource = academicResources.find(r => r.id === resourceId);
    if (resource) {
        openAcademicModal(resource);
    }
}

function deleteAcademicResource(resourceId) {
    if (confirm('Are you sure you want to delete this academic resource?')) {
        academicResources = academicResources.filter(resource => resource.id !== resourceId);
        localStorage.setItem('academicResources', JSON.stringify(academicResources));
        renderAcademicResources();
        showNotification('Academic resource deleted successfully!', 'success');
    }
}


function processGoogleDriveLink(url) {
    if (!url) return '';
    
    
    if (url.includes('/uc?export=download')) {
        return url;
    }
    
    
    if (url.includes('drive.google.com/file/d/')) {
        const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
            return `https://drive.google.com/uc?export=download&id=${match[1]}`;
        }
    }
    
    
    if (url.toLowerCase().endsWith('.pdf')) {
        return url;
    }
    
    return url;
}


function trackDownload(fileName, type) {
    console.log(`Download tracked: ${fileName} (${type})`);
    
    
    const downloads = JSON.parse(localStorage.getItem('downloads')) || [];
    downloads.push({
        fileName,
        type,
        timestamp: new Date().toISOString(),
        user: JSON.parse(localStorage.getItem('currentUser'))?.name || 'Unknown'
    });
    localStorage.setItem('downloads', JSON.stringify(downloads));
    
    showNotification(`Downloading ${fileName}...`, 'success');
}


function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    
    const formspreeEndpoint = 'https://formspree.io/f/mwpqnbbe';
    
    
    fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: data.name,
            branch: data.branch,
            roll: data.roll,
            email: data.email,
            message: data.message,
            _subject: `New Contact Message from ${data.name} - LearnHub AI`,
            _replyto: data.email
        })
    })
    .then(response => {
        if (response.ok) {
            
            const contactMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];
            contactMessages.push({
                ...data,
                id: Date.now(),
                timestamp: new Date().toISOString(),
                submittedToFormspree: true
            });
            localStorage.setItem('contactMessages', JSON.stringify(contactMessages));
            
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Formspree error:', error);
        
        const contactMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        contactMessages.push({
            ...data,
            id: Date.now(),
            timestamp: new Date().toISOString(),
            submittedToFormspree: false
        });
        localStorage.setItem('contactMessages', JSON.stringify(contactMessages));
        
        showNotification('Message saved! We will get back to you soon.', 'success');
        contactForm.reset();
    })
    .finally(() => {
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}


function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = '../auth/login.html';
}


function closeModal(modal) {
    modal.classList.remove('active');
}


function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
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


window.editNotice = editNotice;
window.deleteNotice = deleteNotice;
window.editAcademicResource = editAcademicResource;
window.deleteAcademicResource = deleteAcademicResource;
window.trackDownload = trackDownload;
