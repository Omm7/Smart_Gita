
let currentPlaylist = null;
let currentVideoIndex = 0;


const semesterCourses = {
    "1st Semester": [
        {
            id: 1,
            title: "Engineering Chemistry",
            description: "Fundamental concepts of chemistry for engineering applications",
            playlistId: "PLWPirh4EWFpGmuF8j7u2lVvvaJcBwvC1T",
            thumbnail: "https://img.youtube.com/vi/viD4imLqE1k/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-flask",
            videos: 40,
            duration: "25h 30m"
        },
        {
            id: 2,
            title: "Engineering Mathematics–I",
            description: "Advanced mathematical concepts for engineering students",
            playlistId: "PLU6SqdYcYsfJ27O0dvuMwafS3N4t58uKb",
            thumbnail: "https://img.youtube.com/vi/LP9_4-l1v5c/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-calculator",
            videos: 85,
            duration: "60h 15m"
        },
        {
            id: 3,
            title: "Basic Electronics",
            description: "Introduction to electronic components and circuits",
            playlistId: "PLBlnK6fEyqRiw-GZRqfnlVIBz9dxrqHJS",
            thumbnail: "https://img.youtube.com/vi/VqeMjHmL-9g/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-microchip",
            videos: 189,
            duration: "95h 20m"
        },
        {
            id: 4,
            title: "C Programming",
            description: "Fundamentals of C programming language",
            playlistId: "PLBlnK6fEyqRggZZgYpPMUxdY1CYkZtARR",
            thumbnail: "https://img.youtube.com/vi/irqbmMNs2Bo/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-code",
            videos: 111,
            duration: "45h 10m"
        }
    ],
    "2nd Semester": [
        {
            id: 5,
            title: "Engineering Physics",
            description: "Physics principles applied to engineering",
            playlistId: "PLWPirh4EWFpEemrHzo2cpFGak0VfRHrIi",
            thumbnail: "https://img.youtube.com/vi/b_Dr_wnQo2Q/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-atom",
            videos: 35,
            duration: "22h 45m"
        },
        {
            id: 6,
            title: "Engineering Mathematics–II",
            description: "Advanced engineering mathematics topics",
            playlistId: "PLU6SqdYcYsfJ27O0dvuMwafS3N4t58uKb",
            thumbnail: "https://img.youtube.com/vi/KTQFq86Xw_s/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-calculator",
            videos: 92,
            duration: "65h 30m"
        },
        {
            id: 7,
            title: "Basic Electrical Engineering (BEE)",
            description: "Fundamentals of electrical engineering",
            playlistId: "PLBlnK6fEyqRgP3FU3oK9I1MZR1_JVckUo",
            thumbnail: "https://img.youtube.com/vi/yS9s2Rw2_3w/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-bolt",
            videos: 145,
            duration: "78h 15m"
        },
        {
            id: 8,
            title: "Web Programming (WP)",
            description: "Introduction to web development technologies",
            playlistId: "PLWPirh4EWFpG1oZFQmiyDm1qg9VgFjW4M",
            thumbnail: "https://img.youtube.com/vi/Q33KBiDriJY/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-globe",
            videos: 67,
            duration: "42h 20m"
        },
        {
            id: 9,
            title: "Python Programming",
            description: "Python programming fundamentals and applications",
            playlistId: "PLWPirh4EWFpG1oZFQmiyDm1qg9VgFjW4M",
            thumbnail: "https://img.youtube.com/vi/_uQrJ0TkZlc/maxresdefault.jpg",
            syllabus: "#",
            icon: "fab fa-python",
            videos: 123,
            duration: "52h 45m"
        }
    ],
    "3rd Semester": [
        {
            id: 10,
            title: "Engineering Mathematics–III",
            description: "Advanced mathematical methods for engineering",
            playlistId: "PLU6SqdYcYsfJ27O0dvuMwafS3N4t58uKb",
            thumbnail: "https://img.youtube.com/vi/KpR0k1jQb_c/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-calculator",
            videos: 78,
            duration: "55h 20m"
        },
        {
            id: 11,
            title: "Java Programming",
            description: "Object-oriented programming with Java",
            playlistId: "PL9DF6E4B45C6D6D4C",
            thumbnail: "https://img.youtube.com/vi/eIrMbAQSU34/maxresdefault.jpg",
            syllabus: "#",
            icon: "fab fa-java",
            videos: 96,
            duration: "48h 30m"
        },
        {
            id: 12,
            title: "Computer Organization and Architecture (COA)",
            description: "Computer system organization and architecture",
            playlistId: "PLBlnK6fEyqRgLL0zdGfR2t0UJp6U7dp7_",
            thumbnail: "https://img.youtube.com/vi/GRInNLx3Tug/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-desktop",
            videos: 112,
            duration: "60h 15m"
        },
        {
            id: 13,
            title: "Environmental Engineering and Chemistry (EEC)",
            description: "Environmental science and engineering principles",
            playlistId: "PLWPirh4EWFpGmuF8j7u2lVvvaJcBwvC1T",
            thumbnail: "https://img.youtube.com/vi/T4vVY4cDe1s/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-leaf",
            videos: 45,
            duration: "28h 40m"
        },
        {
            id: 14,
            title: "Humanities and Value Education (HUV)",
            description: "Humanities and ethical values in engineering",
            playlistId: "PLWPirh4EWFpG1oZFQmiyDm1qg9VgFjW4M",
            thumbnail: "https://img.youtube.com/vi/9b6kfcDEdGk/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-users",
            videos: 32,
            duration: "18h 15m"
        },
        {
            id: 15,
            title: "Data Structures (DS)",
            description: "Fundamental data structures and algorithms",
            playlistId: "PLBlnK6fEyqRggZZgYpPMUxdY1CYkZtARR",
            thumbnail: "https://img.youtube.com/vi/RBSGKlAvoiM/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-sitemap",
            videos: 134,
            duration: "72h 30m"
        }
    ],
    "4th Semester": [
        {
            id: 16,
            title: "Advanced Computer Organization and Architecture",
            description: "Advanced computer architecture concepts",
            playlistId: "PLBlnK6fEyqRgLL0zdGfR2t0UJp6U7dp7_",
            thumbnail: "https://img.youtube.com/vi/4TzMyXp1p2o/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-microchip",
            videos: 88,
            duration: "50h 25m"
        },
        {
            id: 17,
            title: "Database Management Systems (DBMS)",
            description: "Database design and management systems",
            playlistId: "PLBlnK6fEyqRj5e6wN13lM2-_1F4wR4rXo",
            thumbnail: "https://img.youtube.com/vi/6Iu45VZGQDk/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-database",
            videos: 76,
            duration: "42h 15m"
        },
        {
            id: 18,
            title: "Design and Analysis of Algorithms (DAA)",
            description: "Algorithm design and complexity analysis",
            playlistId: "PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O",
            thumbnail: "https://img.youtube.com/vi/0IAPZzGSbME/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-project-diagram",
            videos: 67,
            duration: "38h 45m"
        },
        {
            id: 19,
            title: "Data Communication and Computer Networks (DCCN)",
            description: "Computer networks and data communication",
            playlistId: "PLBlnK6fEyqRgMCcAGe7K7t7gN-0H_jq6_",
            thumbnail: "https://img.youtube.com/vi/JFF2vJaN0Cw/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-network-wired",
            videos: 123,
            duration: "68h 20m"
        },
        {
            id: 20,
            title: "Organizational Behaviour (OB)",
            description: "Organizational behavior and management",
            playlistId: "PLWPirh4EWFpG1oZFQmiyDm1qg9VgFjW4M",
            thumbnail: "https://img.youtube.com/vi/4f9pJZ3q_OA/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-building",
            videos: 41,
            duration: "24h 30m"
        }
    ],
    "5th Semester": [
        {
            id: 21,
            title: "Machine Learning (ML)",
            description: "Machine learning algorithms and applications",
            playlistId: "PLWPirh4EWFpG1oZFQmiyDm1qg9VgFjW4M",
            thumbnail: "https://img.youtube.com/vi/GwIo3gDZCVQ/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-brain",
            videos: 145,
            duration: "85h 30m"
        },
        {
            id: 22,
            title: "Formal Languages and Automata Theory (FLAT)",
            description: "Formal languages and automata theory",
            playlistId: "PLBlnK6fEyqRj5e6wN13lM2-_1F4wR4rXo",
            thumbnail: "https://img.youtube.com/vi/6Z_6pY5T6C4/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-language",
            videos: 52,
            duration: "32h 15m"
        },
        {
            id: 23,
            title: "Advanced Java Programming",
            description: "Advanced Java programming concepts",
            playlistId: "PL9DF6E4B45C6D6D4C",
            thumbnail: "https://img.youtube.com/vi/8cm1x6bX3wY/maxresdefault.jpg",
            syllabus: "#",
            icon: "fab fa-java",
            videos: 78,
            duration: "45h 20m"
        },
        {
            id: 24,
            title: "Microprocessor and Microcontroller (MPMC)",
            description: "Microprocessor and microcontroller systems",
            playlistId: "PLBlnK6fEyqRgLL0zdGfR2t0UJp6U7dp7_",
            thumbnail: "https://img.youtube.com/vi/5C6eK-2q5V8/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-microchip",
            videos: 94,
            duration: "52h 45m"
        },
        {
            id: 25,
            title: "Internet and Web Technology (IWT)",
            description: "Advanced web technologies and internet protocols",
            playlistId: "PLWPirh4EWFpG1oZFQmiyDm1qg9VgFjW4M",
            thumbnail: "https://img.youtube.com/vi/6Z_6pY5T6C4/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-wifi",
            videos: 89,
            duration: "48h 30m"
        },
        {
            id: 26,
            title: "Operating Systems (OS)",
            description: "Operating system concepts and design",
            playlistId: "PLBlnK6fEyqRgLL0zdGfR2t0UJp6U7dp7_",
            thumbnail: "https://img.youtube.com/vi/vBURTt97EkA/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-laptop-code",
            videos: 112,
            duration: "65h 20m"
        }
    ],
    "6th Semester": [
        {
            id: 27,
            title: "Software Engineering (SE)",
            description: "Software development methodologies and practices",
            playlistId: "PLBlnK6fEyqRj5e6wN13lM2-_1F4wR4rXo",
            thumbnail: "https://img.youtube.com/vi/uJpQlyT_CK4/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-cogs",
            videos: 67,
            duration: "38h 45m"
        },
        {
            id: 28,
            title: "Internet of Things (IoT)",
            description: "IoT systems and applications",
            playlistId: "PLWPirh4EWFpG1oZFQmiyDm1qg9VgFjW4M",
            thumbnail: "https://img.youtube.com/vi/6Z_6pY5T6C4/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-satellite-dish",
            videos: 98,
            duration: "55h 30m"
        },
        {
            id: 29,
            title: "Deep Learning (DL)",
            description: "Deep learning algorithms and neural networks",
            playlistId: "PLWPirh4EWFpG1oZFQmiyDm1qg9VgFjW4M",
            thumbnail: "https://img.youtube.com/vi/GwIo3gDZCVQ/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-network-wired",
            videos: 134,
            duration: "78h 45m"
        },
        {
            id: 30,
            title: "Compiler Design (CD)",
            description: "Compiler design and construction",
            playlistId: "PLBlnK6fEyqRj5e6wN13lM2-_1F4wR4rXo",
            thumbnail: "https://img.youtube.com/vi/6Z_6pY5T6C4/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-code",
            videos: 58,
            duration: "35h 20m"
        },
        {
            id: 31,
            title: "Cloud Computing (CC)",
            description: "Cloud computing technologies and services",
            playlistId: "PLWPirh4EWFpG1oZFQmiyDm1qg9VgFjW4M",
            thumbnail: "https://img.youtube.com/vi/6Z_6pY5T6C4/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-cloud",
            videos: 76,
            duration: "42h 15m"
        },
        {
            id: 32,
            title: "Embedded Design (ED)",
            description: "Embedded system design and development",
            playlistId: "PLBlnK6fEyqRgLL0zdGfR2t0UJp6U7dp7_",
            thumbnail: "https://img.youtube.com/vi/5C6eK-2q5V8/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-microchip",
            videos: 82,
            duration: "46h 30m"
        },
        {
            id: 33,
            title: "Embedded Systems (ES)",
            description: "Embedded systems programming and applications",
            playlistId: "PLBlnK6fEyqRgLL0zdGfR2t0UJp6U7dp7_",
            thumbnail: "https://img.youtube.com/vi/5C6eK-2q5V8/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-microchip",
            videos: 91,
            duration: "51h 45m"
        }
    ],
    "7th Semester": [
        {
            id: 34,
            title: "Computer Graphics (CG)",
            description: "Computer graphics algorithms and rendering",
            playlistId: "PLBlnK6fEyqRj5e6wN13lM2-_1F4wR4rXo",
            thumbnail: "https://img.youtube.com/vi/6Z_6pY5T6C4/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-paint-brush",
            videos: 63,
            duration: "36h 20m"
        },
        {
            id: 35,
            title: "Real Time Systems (RTS)",
            description: "Real-time system design and implementation",
            playlistId: "PLBlnK6fEyqRgLL0zdGfR2t0UJp6U7dp7_",
            thumbnail: "https://img.youtube.com/vi/5C6eK-2q5V8/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-clock",
            videos: 45,
            duration: "28h 15m"
        },
        {
            id: 36,
            title: "Computer and Network Security (CNS)",
            description: "Computer and network security principles",
            playlistId: "PLBlnK6fEyqRj5e6wN13lM2-_1F4wR4rXo",
            thumbnail: "https://img.youtube.com/vi/6Z_6pY5T6C4/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-shield-alt",
            videos: 87,
            duration: "49h 30m"
        },
        {
            id: 37,
            title: "Artificial Intelligence (AI)",
            description: "Artificial intelligence concepts and applications",
            playlistId: "PLWPirh4EWFpG1oZFQmiyDm1qg9VgFjW4M",
            thumbnail: "https://img.youtube.com/vi/GwIo3gDZCVQ/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-robot",
            videos: 156,
            duration: "88h 45m"
        },
        {
            id: 38,
            title: "Data Analytics (DA)",
            description: "Data analysis techniques and tools",
            playlistId: "PLWPirh4EWFpG1oZFQmiyDm1qg9VgFjW4M",
            thumbnail: "https://img.youtube.com/vi/GwIo3gDZCVQ/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-chart-bar",
            videos: 94,
            duration: "52h 20m"
        }
    ],
    "8th Semester": [
        {
            id: 39,
            title: "Project / Seminar Preparation",
            description: "Final year project and seminar preparation",
            playlistId: "PLWPirh4EWFpG1oZFQmiyDm1qg9VgFjW4M",
            thumbnail: "https://img.youtube.com/vi/6Z_6pY5T6C4/maxresdefault.jpg",
            syllabus: "#",
            icon: "fas fa-graduation-cap",
            videos: 35,
            duration: "22h 30m"
        }
    ]
};


const samplePlaylists = {
    
    "": [
        { title: "Content Coming Soon", videoId: "", duration: "00:00" }
    ]
};


const landingPage = document.getElementById('landingPage');
const mainApp = document.getElementById('mainApp');
const appHeader = document.querySelector('.app-header');
const exploreBtn = document.getElementById('exploreBtn');
const landingLoginBtn = document.getElementById('landingLoginBtn');
const userMenuBtn = document.getElementById('userMenuBtn');
const userDropdown = document.getElementById('userDropdown');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.querySelector('.nav-menu');
const coursesContainer = document.getElementById('coursesContainer');
const videoPlayerSection = document.getElementById('videoPlayerSection');
const youtubePlayer = document.getElementById('youtubePlayer');
const playlistItems = document.getElementById('playlistItems');
const currentPlaylistTitle = document.getElementById('currentPlaylistTitle');
const exploreCoursesBtn = document.getElementById('exploreCoursesBtn');
const dashboardHero = document.getElementById('dashboardHero');
const globalSearch = document.getElementById('globalSearch');
const notificationContainer = document.getElementById('notificationContainer');


function init() {
    handlePageAccess();
    loadEventListeners();
    renderNetflixStyleCourses();
    setupHeaderScroll();
    updateUserMenu();
    checkUrlAndShowCourses();
}


function handlePageAccess() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        showMainApp();
        showCoursesHomepage();
    } else {
        showLandingPage();
    }
}


function loadEventListeners() {
    
    exploreBtn.addEventListener('click', () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (!currentUser) {
            window.location.href = 'auth/login.html';
        } else {
            showMainApp();
            showCoursesHomepage();
        }
    });
    
    landingLoginBtn.addEventListener('click', () => {
        window.location.href = 'auth/login.html';
    });

    
    userMenuBtn.addEventListener('click', toggleUserDropdown);
    document.addEventListener('click', closeUserDropdown);

    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    
    if (exploreCoursesBtn) {
        exploreCoursesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showCoursesHomepage();
        });
    }
    
    
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    
    if (globalSearch) {
        globalSearch.addEventListener('input', handleGlobalSearch);
    }
    
    
    setupProtectedNavigation();
    
    
    document.addEventListener('click', function(e) {
        if (e.target.closest('.logo') && !e.target.closest('.landing-header')) {
            e.preventDefault();
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                showCoursesHomepage();
            } else {
                window.location.href = 'index.html';
            }
        }
    });
    
    window.addEventListener('load', checkUrlAndShowCourses);
}


function handleNavigation(e) {
    e.preventDefault();
    
    if (!checkAuthentication()) return;
    
    const section = e.currentTarget.getAttribute('data-section');
    
    
    if (section === 'courses') {
        showCoursesHomepage();
        return;
    }
    
    
    navLinks.forEach(link => link.classList.remove('active'));
    e.currentTarget.classList.add('active');
    
    contentSections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(`${section}Section`).classList.add('active');
    
    navMenu.classList.remove('active');
}


function checkUrlAndShowCourses() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isIndexPage = window.location.pathname.endsWith('index.html') || 
                       window.location.pathname.endsWith('/') ||
                       window.location.pathname.includes('index.html');
    
    if (currentUser && isIndexPage) {
        showCoursesHomepage();
    }
}


function setupProtectedNavigation() {
    const protectedLinks = document.querySelectorAll('a[href*="dashboard"], a[href*="profile"], a[href*="admin"]');
    
    protectedLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            if (!currentUser) {
                e.preventDefault();
                showNotification('Please login to access this page', 'error');
                setTimeout(() => {
                    window.location.href = 'auth/login.html';
                }, 1500);
                return;
            }
            
            if (this.href.includes('admin') && currentUser.role !== 'admin') {
                e.preventDefault();
                showNotification('Admin access required', 'error');
                return;
            }
        });
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


function showMainApp() {
    landingPage.classList.remove('active');
    mainApp.classList.add('active');
    updateUIForUser();
}

function showLandingPage() {
    landingPage.classList.add('active');
    mainApp.classList.remove('active');
}


function showCoursesHomepage() {
    console.log('showCoursesHomepage called');
    
    
    if (dashboardHero) {
        dashboardHero.style.display = 'none';
    }
    
    
    resetToCoursesView();
    
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    
    const coursesNavLinks = document.querySelectorAll('.nav-link[data-section="courses"]');
    coursesNavLinks.forEach(link => link.classList.add('active'));
    
    
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(sec => {
        sec.classList.remove('active');
        sec.style.display = 'none';
        
        if (sec.id === 'coursesSection') {
            sec.classList.add('active');
            sec.style.display = 'block';
        }
    });
    
    
    if (coursesContainer) {
        coursesContainer.style.display = 'block';
    }
    if (videoPlayerSection) {
        videoPlayerSection.style.display = 'none';
    }
    
    
    renderNetflixStyleCourses();
    
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    console.log('Courses homepage shown - Netflix style');
}


function resetToCoursesView() {
    console.log('resetToCoursesView called');
    
    if (coursesContainer) {
        coursesContainer.style.display = 'block';
    }
    if (videoPlayerSection) {
        videoPlayerSection.style.display = 'none';
    }
    
    
    if (youtubePlayer) {
        youtubePlayer.src = '';
    }
    
    
    currentPlaylist = null;
    currentVideoIndex = 0;
    
    
    renderNetflixStyleCourses();
}


function updateUIForUser() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userWelcome = document.getElementById('userWelcome');
    
    if (currentUser && userWelcome) {
        userWelcome.textContent = currentUser.name;
        updateUserMenu();
    }
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
        filterCourses(term);
    } else {
        renderNetflixStyleCourses();
    }
}

function filterCourses(term) {
    let filteredCourses = {};
    
    for (const [category, courses] of Object.entries(semesterCourses)) {
        const filtered = courses.filter(course => 
            course.title.toLowerCase().includes(term) || 
            course.description.toLowerCase().includes(term)
        );
        
        if (filtered.length > 0) {
            filteredCourses[category] = filtered;
        }
    }
    
    renderFilteredCourses(filteredCourses);
}

function renderFilteredCourses(filteredCourses) {
    if (!coursesContainer) return;
    
    let html = '';
    
    for (const [category, courses] of Object.entries(filteredCourses)) {
        html += `
            <div class="netflix-row">
                <div class="row-header">
                    <h2 class="row-title">${category}</h2>
                </div>
                <div class="row-container">
                    <div class="row-content">
                        ${courses.map(course => `
                            <div class="netflix-item" data-course-id="${course.id}" data-playlist-id="${course.playlistId}">
                                <div class="item-image">
                                    <div class="course-icon-placeholder">
                                        <i class="${course.icon}"></i>
                                    </div>
                                    <div class="item-overlay">
                                        <div class="play-button">
                                            <i class="fas fa-play"></i>
                                        </div>
                                        <div class="item-info">
                                            <h3>${course.title}</h3>
                                            <p>${course.description}</p>
                                            <div class="item-meta">
                                                <span><i class="fas fa-play-circle"></i> ${course.videos} videos</span>
                                                <span><i class="fas fa-clock"></i> ${course.duration}</span>
                                            </div>
                                            <div class="item-actions">
                                                <button class="btn-watch" onclick="event.stopPropagation(); openVideoPlayer('${course.playlistId}', '${course.title}')">
                                                    <i class="fas fa-play"></i> Watch Now
                                                </button>
                                                <a href="${course.syllabus}" target="_blank" class="btn-syllabus" onclick="event.stopPropagation(); showComingSoon(event)">
                                                    <i class="fas fa-file-pdf"></i> Syllabus
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-title">${course.title}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    if (html === '') {
        html = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No courses found</h3>
                <p>Try different search terms</p>
            </div>
        `;
    }
    
    coursesContainer.innerHTML = html;
}


function updateUserMenu() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        userDropdown.innerHTML = `
            <a href="profile/profile.html"><i class="fas fa-user-circle"></i> Profile</a>
            <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Sign Out</a>
        `;
        
        document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    } else {
        userDropdown.innerHTML = `
            <a href="auth/login.html"><i class="fas fa-sign-in-alt"></i> Sign In</a>
            <a href="auth/signup.html"><i class="fas fa-user-plus"></i> Sign Up</a>
        `;
    }
}

function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}


function renderNetflixStyleCourses() {
    if (!coursesContainer) return;
    
    let html = '';
    
    for (const [category, courses] of Object.entries(semesterCourses)) {
        html += `
            <div class="netflix-row">
                <div class="row-header">
                    <h2 class="row-title">${category}</h2>
                </div>
                <div class="row-container">
                    <button class="row-arrow row-arrow-left" onclick="scrollRow(this, -1)">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <div class="row-content">
                        ${courses.map(course => `
                            <div class="netflix-item" data-course-id="${course.id}" data-playlist-id="${course.playlistId}">
                                <div class="item-image">
                                    <div class="course-icon-placeholder">
                                        <i class="${course.icon}"></i>
                                    </div>
                                    <div class="item-overlay">
                                        <div class="play-button">
                                            <i class="fas fa-play"></i>
                                        </div>
                                        <div class="item-info">
                                            <h3>${course.title}</h3>
                                            <p>${course.description}</p>
                                            <div class="item-meta">
                                                <span><i class="fas fa-play-circle"></i> ${course.videos} videos</span>
                                                <span><i class="fas fa-clock"></i> ${course.duration}</span>
                                            </div>
                                            <div class="item-actions">
                                                <button class="btn-watch" onclick="event.stopPropagation(); openVideoPlayer('${course.playlistId}', '${course.title}')">
                                                    <i class="fas fa-play"></i> Watch Now
                                                </button>
                                                <a href="${course.syllabus}" target="_blank" class="btn-syllabus" onclick="event.stopPropagation(); showComingSoon(event)">
                                                    <i class="fas fa-file-pdf"></i> Syllabus
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-title">${course.title}</div>
                            </div>
                        `).join('')}
                    </div>
                    <button class="row-arrow row-arrow-right" onclick="scrollRow(this, 1)">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        `;
    }
    
    coursesContainer.innerHTML = html;
    
    
    document.querySelectorAll('.netflix-item').forEach(item => {
        item.addEventListener('click', function(e) {
            
            if (e.target.closest('.btn-watch') || e.target.closest('.btn-syllabus')) {
                return;
            }
            
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            if (!currentUser) {
                window.location.href = 'auth/login.html';
                return;
            }
            
            const playlistId = this.getAttribute('data-playlist-id');
            const courseTitle = this.querySelector('.item-title').textContent;
            openVideoPlayer(playlistId, courseTitle);
        });
    });
}


function scrollRow(arrow, direction) {
    const rowContainer = arrow.closest('.row-container');
    const rowContent = rowContainer.querySelector('.row-content');
    const scrollAmount = 300;
    
    rowContent.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}


function openVideoPlayer(playlistId, courseTitle) {
    if (coursesContainer) {
        coursesContainer.style.display = 'none';
    }
    if (videoPlayerSection) {
        videoPlayerSection.style.display = 'block';
    }
    
    if (currentPlaylistTitle) {
        currentPlaylistTitle.textContent = courseTitle;
    }
    
    currentPlaylist = samplePlaylists[playlistId] || [{ title: "Content Coming Soon", videoId: "", duration: "00:00" }];
    currentVideoIndex = 0;
    
    renderPlaylistItems();
    loadVideo(currentPlaylist[0].videoId);
}

function renderPlaylistItems() {
    if (!playlistItems) return;
    
    playlistItems.innerHTML = currentPlaylist.map((video, index) => `
        <li class="playlist-item ${index === currentVideoIndex ? 'active' : ''}" data-video-index="${index}">
            <div class="video-title">${video.title}</div>
            <div class="video-duration">${video.duration}</div>
        </li>
    `).join('');
    
    document.querySelectorAll('.playlist-item').forEach(item => {
        item.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-video-index'));
            playVideo(index);
        });
    });
}

function playVideo(index) {
    currentVideoIndex = index;
    loadVideo(currentPlaylist[index].videoId);
    renderPlaylistItems();
}

function loadVideo(videoId) {
    if (youtubePlayer) {
        if (videoId) {
            youtubePlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        } else {
            youtubePlayer.src = "";
            youtubePlayer.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #000; color: white; font-size: 1.2rem;">
                    <div style="text-align: center;">
                        <i class="fas fa-video-slash" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                        <p>Video content coming soon</p>
                    </div>
                </div>
            `;
        }
    }
}


function showComingSoon(event) {
    event.preventDefault();
    showNotification('Syllabus coming soon!', 'info');
}


function checkAuthentication() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'auth/login.html';
        return false;
    }
    
    return true;
}


function showNotification(message, type) {
    if (!notificationContainer) return;
    
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


window.navigateToCourses = showCoursesHomepage;
window.showCoursesHomepage = showCoursesHomepage;
window.resetToCoursesView = resetToCoursesView;
window.scrollRow = scrollRow;
window.openVideoPlayer = openVideoPlayer;
window.showComingSoon = showComingSoon;


document.addEventListener('DOMContentLoaded', function() {
    init();
    
    setTimeout(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const isOnMainPage = window.location.pathname.endsWith('index.html') || 
                            window.location.pathname.endsWith('/');
        
        if (currentUser && isOnMainPage) {
            showCoursesHomepage();
        }
    }, 100);
});
