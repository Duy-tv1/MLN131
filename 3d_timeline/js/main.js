// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Start 3D Visuals immediately
    if (typeof initParticles === 'function') {
        initParticles();
    }

    // Start Controller (Video/Gestures) - From gestures.js
    const controller = new GestureController((gesture) => {
        handleGestureCommand(gesture);
    });
    
    // Auto-start or Button-start
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.onclick = () => {
            controller.start();
            startBtn.style.opacity = '0';
            startBtn.style.pointerEvents = 'none';
            
            // Auto-start Music
            const audio = document.getElementById('bg-music');
            if (audio && audio.paused) toggleMusic();
        };
    }
});

// Audio Control
function toggleMusic() {
    const audio = document.getElementById('bg-music');
    const onIcon = document.getElementById('icon-sound-on');
    const offIcon = document.getElementById('icon-sound-off');
    const text = document.getElementById('music-text');
    const container = document.querySelector('#music-control div');
    
    if (!audio) return;

    if (audio.paused) {
        audio.play().then(() => {
            if (onIcon) onIcon.classList.remove('hidden');
            if (offIcon) offIcon.classList.add('hidden');
            if (text) {
                text.innerText = 'Dừng Nhạc';
                text.classList.remove('text-white/50');
                text.classList.add('text-emerald-400');
            }
            if (container) container.classList.add('border-emerald-500/50', 'bg-black/80');
        }).catch(err => console.log("Audio autoplay prevented"));
    } else {
        audio.pause();
        if (onIcon) onIcon.classList.add('hidden');
        if (offIcon) offIcon.classList.remove('hidden');
        if (text) {
            text.innerText = 'Bật Nhạc';
            text.classList.add('text-white/50');
            text.classList.remove('text-emerald-400');
        }
        if (container) container.classList.remove('border-emerald-500/50', 'bg-black/80');
    }
}

function handleGestureCommand(gesture) {
    // Map gestures from gestures.js to Code2 visual states
    // gestures.js outputs: '1', '2', '3', '4', '5', '6', 'reset', 'chaos'
    
    const eraMap = {
        '1': 0, // Primitive
        '2': 1, // Slave
        '3': 2, // Feudal
        '4': 3, // Capitalist
        '5': 4, // Socialist
        '6': 5  // Communist
    };

    if (gesture in eraMap) {
        const eraIndex = eraMap[gesture];
        setParticlesState('DETAIL', eraIndex);
        showEraPanel(eraIndex);
    } else if (gesture === 'reset') {
        setParticlesState('TIMELINE');
        hideEraPanel();
        showTimelineUI();
    } else if (gesture === 'chaos') {
        setParticlesState('CHAOS');
        hideEraPanel();
        showChaosUI();
    }
}

function showEraPanel(idx) {
    if (typeof ERA_DATA === 'undefined') return;
    
    // Hide Gesture Guide in specific Era mode
    const guide = document.getElementById('gesture-note');
    if (guide) guide.classList.add('hidden-panel');
    
    const data = ERA_DATA[idx];
    const panel = document.getElementById('era-panel');
    const mainHeader = document.getElementById('main-header');
    
    if (mainHeader) mainHeader.classList.add('header-hidden');
    
    if (panel) {
        panel.classList.add('visible');
        
        setText('era-title', data.title);
        setText('era-desc', data.desc);
        setText('rights-core', data.rights_core);
        setText('rights-social', data.rights_social);
        
        setText('meta-property', data.property);
        setText('meta-freedom', data.freedom);
        setText('meta-nature', data.nature);

        // Update color hints if needed
        const title = document.getElementById('era-title');
        if (title && data.color) {
            title.style.color = `rgb(${data.color[0]*255},${data.color[1]*255},${data.color[2]*255})`;
        }
        
        // Update menu highlight
        updateGKSelection(true);
    }
}

function hideEraPanel() {
    const panel = document.getElementById('era-panel');
    if (panel) panel.classList.remove('visible');
}

function showTimelineUI() {
    const mainHeader = document.getElementById('main-header');
    if (mainHeader) {
        mainHeader.classList.remove('header-hidden');
        setText('main-title', 'DÒNG CHẢY LỊCH SỬ');
    }
    
    // Show Gesture Guide
    const guide = document.getElementById('gesture-note');
    if (guide) guide.classList.remove('hidden-panel');

    highlightMenuIcon('gk-timeline');
}

function showChaosUI() {
    const mainHeader = document.getElementById('main-header');
    if (mainHeader) {
        mainHeader.classList.remove('header-hidden');
        setText('main-title', 'NHÂN QUYỀN');
    }

    // Show Gesture Guide
    const guide = document.getElementById('gesture-note');
    if (guide) guide.classList.remove('hidden-panel');

    highlightMenuIcon('gk-reset');
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}

function highlightMenuIcon(id) {
    document.querySelectorAll('.gk').forEach(k => k.classList.remove('active'));
    const item = document.getElementById(id);
    if (item) item.classList.add('active');
}

function updateGKSelection(isActive) {
    document.querySelectorAll('.gk').forEach(k => k.classList.remove('active'));
    if (isActive) {
        const item = document.getElementById('gk-select');
        if (item) item.classList.add('active');
    }
}