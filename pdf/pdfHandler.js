
let currentPdf = null;
let currentPage = 1;
let totalPages = 0;
let scale = 1.0;
let pdfDoc = null;


const pdfTitle = document.getElementById('pdfTitle');
const pdfFrame = document.getElementById('pdfFrame');
const loadingSpinner = document.getElementById('loadingSpinner');
const thumbnailsContainer = document.getElementById('thumbnailsContainer');
const currentPageElement = document.getElementById('currentPage');
const totalPagesElement = document.getElementById('totalPages');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const zoomInButton = document.getElementById('zoomIn');
const zoomOutButton = document.getElementById('zoomOut');
const zoomLevelElement = document.getElementById('zoomLevel');
const downloadPdfButton = document.getElementById('downloadPdf');
const printPdfButton = document.getElementById('printPdf');
const sidebarToggle = document.getElementById('sidebarToggle');
const pdfSidebar = document.getElementById('pdfSidebar');
const notificationContainer = document.getElementById('notificationContainer');


const urlParams = new URLSearchParams(window.location.search);
const pdfUrl = urlParams.get('url');
const title = urlParams.get('title') || 'PDF Document';


function init() {
    if (!checkAuthentication()) return;
    
    loadEventListeners();
    loadPdfDocument();
    updateUI();
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
    
    prevPageButton.addEventListener('click', goToPreviousPage);
    nextPageButton.addEventListener('click', goToNextPage);
    
    
    zoomInButton.addEventListener('click', zoomIn);
    zoomOutButton.addEventListener('click', zoomOut);
    
    
    downloadPdfButton.addEventListener('click', downloadPdf);
    printPdfButton.addEventListener('click', printPdf);
    
    
    sidebarToggle.addEventListener('click', toggleSidebar);
    
    
    document.addEventListener('keydown', handleKeyboardNavigation);
}


async function loadPdfDocument() {
    if (!pdfUrl) {
        showNotification('No PDF URL provided', 'error');
        return;
    }
    
    try {
        pdfTitle.textContent = title;
        
        
        pdfFrame.src = pdfUrl;
        pdfFrame.style.display = 'block';
        loadingSpinner.style.display = 'none';
        
        
        try {
            const loadingTask = pdfjsLib.getDocument(pdfUrl);
            pdfDoc = await loadingTask.promise;
            totalPages = pdfDoc.numPages;
            totalPagesElement.textContent = totalPages;
            generateThumbnails();
        } catch (error) {
            console.log('PDF.js loading failed, using iframe only');
            totalPagesElement.textContent = 'N/A';
        }
        
    } catch (error) {
        console.error('Error loading PDF:', error);
        showNotification('Error loading PDF document', 'error');
        loadingSpinner.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <p>Failed to load PDF document</p>
            <button class="btn btn-premium" onclick="location.reload()">Retry</button>
        `;
    }
}


async function generateThumbnails() {
    if (!pdfDoc) return;
    
    thumbnailsContainer.innerHTML = '';
    
    for (let i = 1; i <= Math.min(totalPages, 10); i++) {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 0.2 });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        
        await page.render(renderContext).promise;
        
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        thumbnail.innerHTML = `
            <canvas></canvas>
            <div class="thumbnail-page">Page ${i}</div>
        `;
        
        thumbnail.querySelector('canvas').getContext('2d').drawImage(canvas, 0, 0);
        thumbnail.addEventListener('click', () => goToPage(i));
        
        thumbnailsContainer.appendChild(thumbnail);
    }
}


function goToPreviousPage() {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
}

function goToNextPage() {
    if (currentPage < totalPages) {
        goToPage(currentPage + 1);
    }
}

function goToPage(pageNumber) {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
        currentPage = pageNumber;
        currentPageElement.textContent = currentPage;
        
        if (pdfFrame.src.includes('#')) {
            pdfFrame.src = pdfFrame.src.split('#')[0] + `#page=${pageNumber}`;
        } else {
            pdfFrame.src += `#page=${pageNumber}`;
        }
        
        updateThumbnails();
        updateUI();
    }
}

function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index + 1 === currentPage);
    });
}


function zoomIn() {
    scale = Math.min(scale + 0.25, 3.0);
    updateZoom();
}

function zoomOut() {
    scale = Math.max(scale - 0.25, 0.5);
    updateZoom();
}

function updateZoom() {
    zoomLevelElement.textContent = `${Math.round(scale * 100)}%`;
    pdfFrame.style.transform = `scale(${scale})`;
    pdfFrame.style.transformOrigin = 'center center';
}


function downloadPdf() {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title + '.pdf';
    link.click();
}

function printPdf() {
    pdfFrame.contentWindow.focus();
    pdfFrame.contentWindow.print();
}


function toggleSidebar() {
    pdfSidebar.classList.toggle('collapsed');
    const icon = sidebarToggle.querySelector('i');
    if (pdfSidebar.classList.contains('collapsed')) {
        icon.className = 'fas fa-chevron-right';
    } else {
        icon.className = 'fas fa-chevron-left';
    }
}


function handleKeyboardNavigation(e) {
    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            goToPreviousPage();
            break;
        case 'ArrowRight':
            e.preventDefault();
            goToNextPage();
            break;
        case '+':
        case '=':
            e.preventDefault();
            zoomIn();
            break;
        case '-':
            e.preventDefault();
            zoomOut();
            break;
        case ' ':
            e.preventDefault();
            if (e.shiftKey) {
                goToPreviousPage();
            } else {
                goToNextPage();
            }
            break;
    }
}


function updateUI() {
    prevPageButton.disabled = currentPage <= 1;
    nextPageButton.disabled = currentPage >= totalPages;
    
    zoomOutButton.disabled = scale <= 0.5;
    zoomInButton.disabled = scale >= 3.0;
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
