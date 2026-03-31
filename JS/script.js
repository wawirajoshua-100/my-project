// ===== Data Store (Using LocalStorage for persistence) =====
const portfolioData = {
    student: {
        name: 'MILDRED CHEROTICH',
        admissionNo: 'TDC113-C002-0004/2025',
        programme: 'Computer Science',
        level: 'KNQF Level 6',
        cycle: 'Cycle 3'
    },
    units: {
        'CR01': { name: 'Computer Organisation and Architecture', code: 'ICT/CU/CS/CR/01/6/MA', type: 'core', hours: 180, credits: 18 },
        'CR02': { name: 'Operating Systems Configuration', code: 'ICT/CU/CS/CR/02/6/MA', type: 'core', hours: 240, credits: 24 },
        'CR03': { name: 'Networking and Distributed Systems', code: 'ICT/CU/CS/CR/03/6/MA', type: 'core', hours: 220, credits: 22 },
        'CR04': { name: 'Graphics Design', code: 'ICT/CU/CS/CR/04/6/MA', type: 'core', hours: 190, credits: 19 },
        'CR05': { name: 'Database Management', code: 'ICT/CU/CS/CR/05/6/MA', type: 'core', hours: 210, credits: 21 },
        'CR06': { name: 'Web Designing', code: 'ICT/CU/CS/CR/06/6/MA', type: 'core', hours: 220, credits: 22 },
        'CR07': { name: 'Algorithms and Data Structures', code: 'ICT/CU/CS/CR/07/6/MA', type: 'core', hours: 190, credits: 19 },
        'CR08': { name: 'Information Systems Development', code: 'ICT/CU/CS/CR/08/6/MA', type: 'core', hours: 200, credits: 20 },
        'CR09': { name: 'Industry Training', code: 'ICT/CU/CS/CR/09/6/MA', type: 'core', hours: 480, credits: 48 },
        'CC01': { name: 'Basic Electronics Skills', code: 'ICT/CU/CS/CC/01/6/MA', type: 'common', hours: 180, credits: 18 },
        'CC02': { name: 'Fundamentals of Programming', code: 'ICT/CU/CS/CC/02/6/MA', type: 'common', hours: 200, credits: 20 },
        'CC03': { name: 'Mathematics for Computer Science', code: 'ICT/CU/CS/CC/03/6/MA', type: 'common', hours: 170, credits: 17 },
        'CC04': { name: 'Artificial Intelligence Concepts', code: 'ICT/CU/CS/CC/04/6/MA', type: 'common', hours: 180, credits: 18 },
        'BC01': { name: 'Communication Skills', code: 'ICT/CU/CS/BC/01/6/MA', type: 'basic', hours: 40, credits: 4 },
        'BC02': { name: 'Work Ethics and Practices', code: 'ICT/CU/CS/BC/02/6/MA', type: 'basic', hours: 40, credits: 4 },
        'BC03': { name: 'Entrepreneurial Skills', code: 'ICT/CU/CS/BC/03/6/MA', type: 'basic', hours: 40, credits: 4 }
    },
    evidence: [] // This will be loaded from localStorage
};

let currentUnit = null;
let currentUploads = { exam: [], video: [], photo: [], certificate: [] };

// ===== Load Data from LocalStorage =====
function loadData() {
    const storedData = localStorage.getItem('portfolioEvidence');
    if (storedData) {
        portfolioData.evidence = JSON.parse(storedData);
    }
}

function saveData() {
    localStorage.setItem('portfolioEvidence', JSON.stringify(portfolioData.evidence));
}

// ===== Particle Animation =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.hue = Math.random() > 0.8 ? 45 : 280;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.1, this.size), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 60%, 50%, ${this.opacity})`;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
            const dx = p1.x - p2.x, dy = p1.y - p2.y, distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 * (1 - distance / 100)})`;
                ctx.lineWidth = 0.5; ctx.stroke();
            }
        });
    });
    requestAnimationFrame(animateParticles);
}

// ===== Navigation & Tabs =====
const navbar = document.getElementById('navbar'), navToggle = document.getElementById('navToggle'), navLinks = document.querySelector('.nav-links'), navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    let current = '';
    document.querySelectorAll('section[id]').forEach(section => { if (window.scrollY >= section.offsetTop - 200) current = section.getAttribute('id'); });
    navItems.forEach(link => { link.classList.remove('active'); if (link.getAttribute('href') === `#${current}`) link.classList.add('active'); });
});
navToggle.addEventListener('click', () => { navToggle.classList.toggle('active'); navLinks.classList.toggle('active'); });
navItems.forEach(link => link.addEventListener('click', () => { navToggle.classList.remove('active'); navLinks.classList.remove('active'); }));

const tabBtns = document.querySelectorAll('.tab-btn'), tabPanels = document.querySelectorAll('.tab-panel');
tabBtns.forEach(btn => btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active')); tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active'); document.getElementById(btn.dataset.tab).classList.add('active');
}));

// ===== Counter Animation =====
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.dataset.count), duration = 2000, startTime = performance.now();
        function update(currentTime) {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            counter.textContent = Math.floor((1 - Math.pow(1 - progress, 3)) * target).toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stats-bar')) animateCounters();
        }
    });
}, { threshold: 0.2 });
document.querySelectorAll('.about-section, .modules-section, .evidence-section, .contact-section, .stats-bar').forEach(el => sectionObserver.observe(el));

// ===== Upload Modal Functions =====
function openUploadModal(unitId, unitName, isCore) {
    currentUnit = unitId;
    currentUploads = { exam: [], video: [], photo: [], certificate: [] };

    document.getElementById('modalTitle').textContent = 'Upload Evidence';
    document.getElementById('modalUnitInfo').textContent = `${unitName} (${portfolioData.units[unitId].code})`;
    document.getElementById('certificateTab').style.display = isCore ? 'flex' : 'none';

    ['exam', 'video', 'photo', 'certificate'].forEach(type => document.getElementById(`${type}Files`).innerHTML = '');

    document.querySelectorAll('.upload-tab').forEach((tab, i) => tab.classList.toggle('active', i === 0));
    document.querySelectorAll('.upload-panel').forEach((panel, i) => panel.classList.toggle('active', i === 0));

    document.getElementById('uploadModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeUploadModal() {
    document.getElementById('uploadModal').classList.remove('active');
    document.body.style.overflow = '';
    currentUnit = null;
}

// ===== Tab Navigation (Modal) =====
document.querySelectorAll('.upload-tab').forEach(tab => tab.addEventListener('click', () => {
    document.querySelectorAll('.upload-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.upload-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(`${tab.dataset.upload}Panel`).classList.add('active');
}));

// ===== File Upload Handling =====
function setupUploadZone(zoneId, inputId, type) {
    const zone = document.getElementById(zoneId), input = document.getElementById(inputId);
    zone.addEventListener('click', () => input.click());
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone.addEventListener('drop', e => { e.preventDefault(); zone.classList.remove('dragover'); handleFiles(e.dataTransfer.files, type); });
    input.addEventListener('change', () => { handleFiles(input.files, type); input.value = ''; });
}

function handleFiles(files, type) {
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            currentUploads[type].push({ name: file.name, data: e.target.result }); // Store base64 data
            displayUploadedFile(file, type);
        };
        reader.readAsDataURL(file); // Convert file to base64 string
    });
}

function displayUploadedFile(file, type) {
    const container = document.getElementById(`${type}Files`);
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg><span>${file.name}</span><button onclick="this.parentElement.remove()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>`;
    container.appendChild(fileItem);
}

setupUploadZone('examUploadZone', 'examFileInput', 'exam');
setupUploadZone('videoUploadZone', 'videoFileInput', 'video');
setupUploadZone('photoUploadZone', 'photoFileInput', 'photo');
setupUploadZone('certificateUploadZone', 'certificateFileInput', 'certificate');

// ===== Save Evidence to LocalStorage =====
function saveEvidence() {
    if (!currentUnit) return;
    const hasFiles = Object.values(currentUploads).some(arr => arr.length > 0);
    if (!hasFiles) { showToast('Please upload at least one file'); return; }

    try {
        // Find existing evidence index for this unit
        const existingIndex = portfolioData.evidence.findIndex(e => e.unitId === currentUnit);

        const evidenceItem = {
            unitId: currentUnit,
            unitName: portfolioData.units[currentUnit].name,
            uploadedAt: new Date().toISOString(),
            files: currentUploads
        };

        if (existingIndex > -1) {
            portfolioData.evidence[existingIndex] = evidenceItem;
        } else {
            portfolioData.evidence.push(evidenceItem);
        }

        saveData(); // Save to localStorage
        showToast('Evidence saved successfully!');
        renderEvidenceGrid();
        closeUploadModal();
    } catch (error) {
        console.error("Error saving evidence: ", error);
        showToast('Error saving files. Check console.');
    }
}

// ===== Render Evidence Grid =====
function renderEvidenceGrid(filter = 'all') {
    const grid = document.getElementById('evidenceGrid');

    // Filter evidence based on unit type
    const filteredEvidence = portfolioData.evidence.filter(e => {
        const unit = portfolioData.units[e.unitId];
        if (!unit) return false;
        if (filter === 'all') return true;
        return unit.type === filter;
    });

    if (filteredEvidence.length === 0) {
        grid.innerHTML = `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg><h4>No Evidence Uploaded</h4><p>Upload your exam results, certificates, and media files for each unit to build your portfolio.</p></div>`;
        return;
    }

    grid.innerHTML = filteredEvidence.map(e => {
        const unit = portfolioData.units[e.unitId];
        const badgeClass = unit.type === 'core' ? 'core' : unit.type === 'common' ? 'common' : 'basic';
        const items = [];

        if (e.files.exam.length) items.push(`<span class="evidence-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg> Exam (${e.files.exam.length})</span>`);
        if (e.files.video.length) items.push(`<span class="evidence-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg> Video (${e.files.video.length})</span>`);
        if (e.files.photo.length) items.push(`<span class="evidence-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/></svg> Photo (${e.files.photo.length})</span>`);
        if (e.files.certificate.length) items.push(`<span class="evidence-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg> Certificate (${e.files.certificate.length})</span>`);

        return `<div class="evidence-card" data-type="${unit.type}"><div class="evidence-card-header"><div><h4 class="evidence-card-title">${unit.name}</h4><span class="evidence-card-code">${unit.code}</span></div><span class="unit-badge ${badgeClass}">${unit.type}</span></div><div class="evidence-card-body"><div class="evidence-items">${items.join('')}</div></div></div>`;
    }).join('');
}

// ===== Filter Buttons =====
document.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderEvidenceGrid(btn.dataset.filter);
}));

// ===== Toast Notification =====
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.querySelector('.toast-message').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== Contact Form =====
document.getElementById('contactForm').addEventListener('submit', e => { e.preventDefault(); showToast('Message sent successfully!'); e.target.reset(); });

// ===== Modal Close Listeners =====
document.getElementById('uploadModal').addEventListener('click', e => { if (e.target.classList.contains('modal-overlay')) closeUploadModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeUploadModal(); });

// ===== Initialize =====
function init() {
    resizeCanvas(); initParticles();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) animateParticles();
    loadData(); // Load saved data
    renderEvidenceGrid();
}
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
window.addEventListener('load', init);
document.querySelectorAll('a[href^="#"]').forEach(anchor => anchor.addEventListener('click', function (e) { e.preventDefault(); document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' }); }));