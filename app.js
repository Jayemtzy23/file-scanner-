// Document Scanner Management System
let scannedImages = [];
let documents = JSON.parse(localStorage.getItem('govDocuments')) || [];
let stream = null;

// DOM Elements
const fileInput = document.getElementById('fileInput');
const uploadArea = document.getElementById('uploadArea');
const previewArea = document.getElementById('previewArea');
const docTitle = document.getElementById('docTitle');
const docCategory = document.getElementById('docCategory');
const docReference = document.getElementById('docReference');
const generatePdfBtn = document.getElementById('generatePdfBtn');
const documentsList = document.getElementById('documentsList');
const searchInput = document.getElementById('searchInput');
const filterCategory = document.getElementById('filterCategory');

// Camera Elements
const openCameraBtn = document.getElementById('openCameraBtn');
const uploadFileBtn = document.getElementById('uploadFileBtn');
const cameraView = document.getElementById('cameraView');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('captureBtn');
const closeCameraBtn = document.getElementById('closeCameraBtn');
const pageCount = document.getElementById('pageCount');
const captureFlash = document.getElementById('captureFlash');

// Camera Functions
openCameraBtn.addEventListener('click', async () => {
    openCameraBtn.disabled = true;
    openCameraBtn.innerHTML = '<span class="loading-spinner"></span> Opening...';
    
    try {
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: 'environment',
                width: { ideal: 1920 },
                height: { ideal: 1080 }
            } 
        });
        video.srcObject = stream;
        cameraView.style.display = 'flex';
        uploadArea.style.display = 'none';
        updatePageCount();
    } catch (error) {
        console.error('Camera error:', error);
        alert('Cannot access camera. Please check permissions or use file upload instead.');
    } finally {
        openCameraBtn.disabled = false;
        openCameraBtn.innerHTML = '📷 Open Camera';
    }
});

captureBtn.addEventListener('click', () => {
    // Flash effect
    captureFlash.classList.add('active');
    setTimeout(() => captureFlash.classList.remove('active'), 100);
    
    // Capture image
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);
    const imageData = canvas.toDataURL('image/jpeg', 0.9);
    scannedImages.push(imageData);
    displayPreview();
    updatePageCount();
    
    // Visual feedback
    const originalText = captureBtn.innerHTML;
    captureBtn.innerHTML = '✓ Captured!';
    captureBtn.style.background = '#45a049';
    setTimeout(() => {
        captureBtn.innerHTML = originalText;
        captureBtn.style.background = '#4caf50';
    }, 800);
});

closeCameraBtn.addEventListener('click', () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
    cameraView.style.display = 'none';
    video.srcObject = null;
});

function updatePageCount() {
    const count = scannedImages.length;
    pageCount.textContent = count === 0 ? 'Page 1' : `${count} page${count > 1 ? 's' : ''} captured`;
}

uploadFileBtn.addEventListener('click', () => {
    fileInput.click();
});

// File Upload Handler
fileInput.addEventListener('change', handleFileSelect);

uploadArea.addEventListener('click', () => {
    fileInput.click();
});

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#2a5298';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#667eea';
    const files = e.dataTransfer.files;
    handleFiles(files);
});

function handleFileSelect(e) {
    handleFiles(e.target.files);
}

function handleFiles(files) {
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                scannedImages.push(e.target.result);
                displayPreview();
            };
            reader.readAsDataURL(file);
        }
    });
}

function displayPreview() {
    previewArea.innerHTML = '';
    scannedImages.forEach((img, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        previewItem.innerHTML = `
            <img src="${img}" alt="Page ${index + 1}">
            <div class="page-number">Page ${index + 1}</div>
            <button class="remove-btn" onclick="removeImage(${index})">×</button>
        `;
        previewArea.appendChild(previewItem);
    });
    updatePageCount();
}

function removeImage(index) {
    if (confirm('Remove this page?')) {
        scannedImages.splice(index, 1);
        displayPreview();
    }
}

// Generate PDF
generatePdfBtn.addEventListener('click', async () => {
    if (scannedImages.length === 0) {
        alert('⚠️ Please scan or upload at least one image');
        return;
    }
    
    if (!docTitle.value.trim()) {
        alert('⚠️ Please enter a document title');
        docTitle.focus();
        return;
    }
    
    if (!docCategory.value) {
        alert('⚠️ Please select a category');
        docCategory.focus();
        return;
    }

    generatePdfBtn.disabled = true;
    generatePdfBtn.innerHTML = '<span class="loading-spinner"></span> Generating PDF...';

    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        
        for (let i = 0; i < scannedImages.length; i++) {
            if (i > 0) pdf.addPage();
            
            const img = new Image();
            img.src = scannedImages[i];
            await img.decode();
            
            const imgWidth = 210;
            const imgHeight = (img.height * imgWidth) / img.width;
            
            pdf.addImage(scannedImages[i], 'JPEG', 0, 0, imgWidth, imgHeight);
        }
        
        const pdfBlob = pdf.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        
        const document = {
            id: Date.now(),
            title: docTitle.value.trim(),
            category: docCategory.value,
            reference: docReference.value.trim() || 'N/A',
            date: new Date().toLocaleString(),
            pages: scannedImages.length,
            pdfData: pdf.output('dataurlstring')
        };
        
        documents.unshift(document);
        localStorage.setItem('govDocuments', JSON.stringify(documents));
        
        // Reset form
        scannedImages = [];
        displayPreview();
        docTitle.value = '';
        docCategory.value = '';
        docReference.value = '';
        fileInput.value = '';
        
        displayDocuments();
        
        // Success feedback
        generatePdfBtn.innerHTML = '✓ PDF Created!';
        generatePdfBtn.style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
        setTimeout(() => {
            generatePdfBtn.innerHTML = 'Generate PDF';
            generatePdfBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }, 2000);
        
        // Scroll to documents
        documentsList.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('❌ Error generating PDF. Please try again.');
    } finally {
        generatePdfBtn.disabled = false;
    }
});

// Display Documents
function displayDocuments(filter = '') {
    const categoryFilter = filterCategory.value;
    const searchTerm = searchInput.value.toLowerCase();
    
    let filteredDocs = documents;
    
    if (categoryFilter) {
        filteredDocs = filteredDocs.filter(doc => doc.category === categoryFilter);
    }
    
    if (searchTerm) {
        filteredDocs = filteredDocs.filter(doc => 
            doc.title.toLowerCase().includes(searchTerm) ||
            doc.reference.toLowerCase().includes(searchTerm)
        );
    }
    
    if (filteredDocs.length === 0) {
        documentsList.innerHTML = `
            <div class="empty-state">
                <p>📭 No documents found</p>
            </div>
        `;
        return;
    }
    
    documentsList.innerHTML = filteredDocs.map(doc => `
        <div class="document-card">
            <div class="doc-icon">📄</div>
            <div class="doc-info">
                <h3>${doc.title}</h3>
                <div class="doc-meta">
                    <div>Reference: ${doc.reference}</div>
                    <div>Date: ${doc.date}</div>
                    <div>Pages: ${doc.pages}</div>
                </div>
                <span class="doc-category category-${doc.category}">${doc.category.toUpperCase()}</span>
            </div>
            <div class="doc-actions">
                <button class="btn-download" onclick="downloadDocument(${doc.id})">Download</button>
                <button class="btn-delete" onclick="deleteDocument(${doc.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function downloadDocument(id) {
    const doc = documents.find(d => d.id === id);
    if (doc) {
        const link = document.createElement('a');
        link.href = doc.pdfData;
        link.download = `${doc.title.replace(/[^a-z0-9]/gi, '_')}.pdf`;
        link.click();
    }
}

function deleteDocument(id) {
    if (confirm('Are you sure you want to delete this document?')) {
        documents = documents.filter(d => d.id !== id);
        localStorage.setItem('govDocuments', JSON.stringify(documents));
        displayDocuments();
    }
}

// Search and Filter
searchInput.addEventListener('input', displayDocuments);
filterCategory.addEventListener('change', displayDocuments);

// Initialize
displayDocuments();
