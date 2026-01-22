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
            
            // Remove from DOM flow after transition to prevent blocking UI
            setTimeout(() => {
                startBtn.style.display = 'none';
            }, 1000);
            
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

// --- CONTENT MODE STATE & LOGIC ---
let isContentMode = false;
let currentSystemData = null;
let currentSlideIndex = 0;

function handleGestureCommand(gesture) {
    // 1. CONTENT MODE LOGIC
    if (gesture === 'enter_content') {
        // Only enter if we are in a specific Era (DETAIL mode) and not already in content
        // activeEraIndex is global from particles.js (exposed?) 
        // We set activeEraIndex via setParticlesState, so we can track it here via a local var or access it if exposed.
        // But activeEraIndex is in particles.js scope. 
        // Ideally we track it here too or particles.js exports it.
        // Actually setParticlesState sets a local variable in particles.js. 
        // We should track activeEraIndex locally here or make it accessible.
        // Let's rely on our local tracking or assume we are in a valid state if UI is showing.
        const eraPanel = document.getElementById('era-panel');
        const isEraVisible = eraPanel && eraPanel.classList.contains('visible');
        
        if (!isContentMode && isEraVisible) {
             enterContentMode();
        }
        return;
    }

    if (gesture === 'exit_content') {
        if (isContentMode) {
            exitContentMode();
        }
        return;
    }

    if (isContentMode) {
        // Chỉ nhận lệnh điều hướng 1 tay khi đang ở Content Mode
        if (gesture === 'nav_next' || gesture === '1') {
            nextSlide();
        } else if (gesture === 'nav_prev' || gesture === '2') {
            prevSlide();
        }
        // Block other gestures
        return;
    }

    // 2. STANDARD LOGIC
    // Map gestures from gestures.js to Code2 visual states
    // gestures.js outputs: '1', '2', '3', '4', '5', '6', 'reset', 'chaos'
    
    const eraMap = {
        '1': 0, // Primitive
        '2': 1, // Slave
        '3': 2, // Feudal
        '4': 4, // Swap to fix User Camera Inversion? (Input 4 -> Era 4 Socialist)
        '5': 3, // Swap to fix User Camera Inversion? (Input 5 -> Era 3 Capitalist)
        '6': 5  // Communist
    };

    if (gesture in eraMap) {
        const eraIndex = eraMap[gesture];
        setParticlesState('DETAIL', eraIndex);
        showEraPanel(eraIndex);
        // Track locally if needed, but showEraPanel uses global ERA_DATA and index match
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

async function enterContentMode() {
    if (localEraIndex === -1) return;
    
    const era = ERA_DATA[localEraIndex];
    if (!era) return;

    // Load Data
    const sysId = era.type.toLowerCase();
    try {
        const res = await fetch(`systems/${sysId}.json`);
        const data = await res.json();
        
        currentSystemData = data;
        currentSlideIndex = 0;
        isContentMode = true;

        // Hide Era Navigation UI
        hideEraPanel();
        
        // Setup Slide Bar
        setupSlideBar();
        
        // Render 
        renderSlide(0);

    } catch (e) {
        console.error("Failed to load system data", e);
    }
}

function exitContentMode() {
    isContentMode = false;
    currentSystemData = null;
    
    // Hide Slide Bar & Info
    const bar = document.getElementById('slide-nav-bar');
    if (bar) bar.classList.remove('visible-bar');
    
    const overlay = document.getElementById('slide-info-overlay');
    if (overlay) overlay.classList.remove('visible-overlay');
    
    const bg = document.getElementById('slide-bg');
    if (bg) bg.classList.remove('visible');

    const hint = document.getElementById('slide-hint');
    if (hint) hint.classList.remove('visible');
    
    const backdrop = document.getElementById('content-backdrop');
    if (backdrop) backdrop.classList.remove('visible');
    
    // Restore Era UI
    showEraPanel(localEraIndex);
    setParticlesState('DETAIL', localEraIndex);
}

function nextSlide() {
    if (!currentSystemData || !currentSystemData.slides) return;
    if (currentSlideIndex < currentSystemData.slides.length - 1) {
        renderSlide(currentSlideIndex + 1);
    }
}

function prevSlide() {
    if (currentSlideIndex > 0) {
        renderSlide(currentSlideIndex - 1);
    }
}

function renderSlide(idx) {
    currentSlideIndex = idx;
    const slide = currentSystemData.slides[idx];
    
    // Update Particles
    setParticlesState('CONTENT_SLIDE', slide);
    
    // Update UI
    updateSlideBarHighlight();
    
    // Update Grid Content
    const overlay = document.getElementById('slide-info-overlay');
    const bg = document.getElementById('slide-bg');

    if (overlay) {
        // 1. Clear previous content
        overlay.innerHTML = '';

        // Check if this is an image slide
        if (slide.slideType === 'image' && slide.imageSrc) {
            // Create container for title and image
            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'center';
            container.style.gap = '1rem';
            container.style.paddingTop = '2rem';
            
            // Create title element
            if (slide.slideTitle) {
                const title = document.createElement('h2');
                title.innerText = slide.slideTitle;
                title.style.fontSize = '1.8rem';
                title.style.fontWeight = '900';
                title.style.textTransform = 'uppercase';
                title.style.letterSpacing = '-0.05em';
                title.style.color = '#ffffff';
                title.style.textShadow = '0 0 70px rgba(255,255,255,0.5)';
                title.style.margin = '0';
                container.appendChild(title);
            }
            
            // Create image element
            const img = document.createElement('img');
            img.src = slide.imageSrc;
            img.style.maxWidth = '65vw';
            img.style.maxHeight = '64vh';
            img.style.objectFit = 'contain';
            img.style.borderRadius = '12px';
            container.appendChild(img);
            
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.appendChild(container);
            overlay.classList.add('visible-overlay');
            
            if (bg) bg.classList.remove('visible');
            
            const hint = document.getElementById('slide-hint');
            if (hint) hint.classList.add('visible');

            const backdrop = document.getElementById('content-backdrop');
            if (backdrop) backdrop.classList.add('visible');
            
            return;
        }

        // Check if this is a video slide
        if (slide.slideType === 'video' && slide.videoSrc) {
            // Pause background music
            const audio = document.getElementById('bg-music');
            if (audio && !audio.paused) {
                audio.pause();
            }
            
            // Create iframe for video
            const iframe = document.createElement('iframe');
            iframe.src = slide.videoSrc;
            iframe.style.width = '90%';
            iframe.style.height = '80%';
            iframe.style.border = 'none';
            iframe.style.borderRadius = '12px';
            iframe.allow = 'autoplay';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.appendChild(iframe);
            overlay.classList.add('visible-overlay');
            
            if (bg) bg.classList.remove('visible');
            
            const hint = document.getElementById('slide-hint');
            if (hint) hint.classList.add('visible');

            const backdrop = document.getElementById('content-backdrop');
            if (backdrop) backdrop.classList.add('visible');
            
            return;
        }

        // Check if this is a mindmap slide
        if (slide.slideType === 'mindmap' && slide.iframeSrc) {
            // Create iframe for mindmap
            const iframe = document.createElement('iframe');
            iframe.src = slide.iframeSrc;
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            iframe.style.borderRadius = '0';
            overlay.appendChild(iframe);
            overlay.classList.add('visible-overlay');
            
            if (bg) bg.classList.remove('visible');
            
            const hint = document.getElementById('slide-hint');
            if (hint) hint.classList.add('visible');

            const backdrop = document.getElementById('content-backdrop');
            if (backdrop) backdrop.classList.add('visible');
            
            return;
        }

        // Reset overlay styles for normal slides
        overlay.style.alignItems = '';
        overlay.style.justifyContent = '';

        // 2. Create the two-column structure
        const mainContentEl = document.createElement('div');
        mainContentEl.className = 'main-content-column';

        const gridContainerEl = document.createElement('div');
        gridContainerEl.className = 'grid-container';

        // 3. Populate Main Content (Left Column)
        let mainContentHTML = `<h2 class="slide-title-style">${slide.slideTitle || ''}</h2>`;
        if (slide.mainContent) {
            if (Array.isArray(slide.mainContent)) {
                // Join array items with <br> for line breaks
                mainContentHTML += `<div class='main-desc'>${slide.mainContent.join('<br><br>')}</div>`;
            } else {
                mainContentHTML += `<div class='main-desc'>${slide.mainContent}</div>`;
            }
        }
        mainContentEl.innerHTML = mainContentHTML;

        // 4. Populate Grid Content (Right Column)
        if (slide.layout) {
            gridContainerEl.style.gridTemplateColumns = slide.layout.columns;
            gridContainerEl.style.gridTemplateRows = slide.layout.rows;
        }
        if (slide.cards && Array.isArray(slide.cards)) {
            slide.cards.forEach(cardData => {
                const cardEl = document.createElement('div');
                cardEl.className = 'grid-card';
                let content = '';
                if (cardData.title) content += `<h3>${cardData.title}</h3>`;
                if (cardData.text) content += `<p>${cardData.text}</p>`;
                cardEl.innerHTML = content;
                gridContainerEl.appendChild(cardEl);
            });
        }

        // 5. Append columns to the overlay
        overlay.appendChild(mainContentEl);
        overlay.appendChild(gridContainerEl);
        
        // 6. Make everything visible
        overlay.classList.add('visible-overlay');
        
        if (bg) {
            if (slide.bgImage) {
                bg.style.backgroundImage = `url('${slide.bgImage}')`;
                bg.classList.add('visible');
            } else {
                bg.classList.remove('visible');
            }
        }

        const hint = document.getElementById('slide-hint');
        if (hint) hint.classList.add('visible');

        const backdrop = document.getElementById('content-backdrop');
        if (backdrop) backdrop.classList.add('visible');
    }
}

function setupSlideBar() {
    const bar = document.getElementById('slide-nav-bar');
    if (!bar) return;
    
    bar.innerHTML = '';
    currentSystemData.slides.forEach((s, i) => {
        const dot = document.createElement('div');
        dot.className = 'slide-marker';
        dot.innerText = i + 1;
        dot.onclick = () => renderSlide(i);
        bar.appendChild(dot);
    });
    
    bar.classList.add('visible-bar');
}

function updateSlideBarHighlight() {
    const dots = document.querySelectorAll('.slide-marker');
    dots.forEach((d, i) => {
        if (i === currentSlideIndex) d.classList.add('active');
        else d.classList.remove('active');
    });
}

let localEraIndex = -1;
function showEraPanel(idx) {
    localEraIndex = idx; // Capture for Content Mode entry

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