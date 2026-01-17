// Data from Code2.html - Contains Visual & Text Data
const ERA_DATA = [
    {
        id: 0, title: "Nguyên Thủy", type: "PRIMITIVE", color: [0.3, 0.9, 0.4],
        desc: "Sơ khai của nhận thức, nơi quyền sống là sự hòa quyện giữa con người và bầy đàn.",
        rights_core: "Quyền sinh tồn là quyền chung không thể chia tách. Lao động và thụ hưởng bình đẳng tuyệt đối. Không có áp bức chính trị hay chiếm đoạt sức lao động.",
        rights_social: "Cá nhân hòa tan hoàn toàn vào cộng đồng thị tộc. Tự do cá nhân chưa xuất hiện, chỉ có sự tự do của tập thể trước thiên nhiên khắc nghiệt.",
        nature: "Cộng đồng", property: "Của chung", freedom: "Tự nhiên"
    },
    {
        id: 1, title: "Nô Lệ", type: "SLAVE", color: [1.0, 0.1, 0.1],
        desc: "Giai đoạn linh hồn con người bị xiềng xích và xẻ làm đôi: vật sở hữu và kẻ cai trị.",
        rights_core: "Phủ định hoàn toàn tư cách người của nô lệ. Nô lệ là 'vật sở hữu biết nói'. Chỉ chủ nô mới có quyền dân sự, chính trị và quyền sống thực thụ.",
        rights_social: "Xã hội phân cực tàn bạo. Nhà nước ra đời chỉ để bảo vệ đặc quyền và tài sản của giai cấp chủ nô thông qua bạo lực và xiềng xích.",
        nature: "Bóc lột", property: "Chiếm hữu người", freedom: "Số không"
    },
    {
        id: 2, title: "Phong Kiến", type: "FEUDAL", color: [0.9, 0.7, 0.1],
        desc: "Hệ thống tôn ti gắn chặt với ruộng đất, đặc quyền và dòng dõi.",
        rights_core: "Nông dân có quyền sống và gia đình nhưng lệ thuộc vào địa chủ. Quyền con người bị chia nhỏ theo tầng lớp và dòng dõi quý tộc vĩnh cửu.",
        rights_social: "Trật tự 'Thiên tử - Chư hầu' xác lập sự bất bình đẳng tuyệt đối. Lãnh chúa nắm quyền thu thuế và xét xử trên lãnh địa của mình.",
        nature: "Tôn ti", property: "Địa chủ", freedom: "Lệ thuộc"
    },
    {
        id: 3, title: "Tư Bản", type: "CAPITALIST", color: [0.1, 0.6, 1.0],
        desc: "Sự giải phóng pháp lý hình thức trong gông cùm của tích lũy đồng vốn.",
        rights_core: "Xác lập tự do ngôn luận, bầu cử và tư hữu trên danh nghĩa. Tuy nhiên, quyền lợi bị chi phối sâu sắc bởi khả năng tài chính của mỗi cá nhân.",
        rights_social: "Bình đẳng trên văn bản, bất bình đẳng trong dạ dày. Người lao động tự do thân thể nhưng nô lệ về kinh tế để duy trì sự sống.",
        nature: "Hình thức", property: "Tư hữu", freedom: "Pháp lý"
    },
    {
        id: 4, title: "XHCN", type: "SOCIALIST", color: [1.0, 0.3, 0.1],
        desc: "Làm chủ thực chất, đưa con người về vị trí chủ thể kiến tạo xã hội.",
        rights_core: "Xóa bỏ bóc lột, xác lập quyền làm chủ của nhân dân. Quyền y tế, giáo dục và việc làm được nhà nước bảo đảm thực chất cho mọi người.",
        rights_social: "Phát triển cá nhân hài hòa với tập thể. Nhà nước là công cụ bảo vệ quyền lợi của đa số nhân dân thay vì thiểu số thống trị.",
        nature: "Làm chủ thực chất", property: "Công hữu", freedom: "Toàn diện"
    },
    {
        id: 5, title: "Cộng Sản", type: "COMMUNIST", color: [0.3, 1.0, 0.9],
        desc: "Đỉnh cao của tự do: Sự phát triển của mỗi người là điều kiện cho mọi người.",
        rights_core: "Nhà nước và giai cấp tiêu vong. Con người hoàn toàn tự do sáng tạo, làm việc theo năng lực và hưởng thụ theo nhu cầu tự nguyện.",
        rights_social: "Xã hội tự quản hoàn hảo. Con người sống hòa hợp tuyệt đối, mâu thuẫn đối kháng bị triệt tiêu hoàn toàn.",
        nature: "Hài hòa", property: "Toàn dân", freedom: "Tuyệt đối"
    }
];

// --- 3D ENGINE STATE ---
let scene, camera, renderer, particleSystem;
const PARTICLE_COUNT = 3000; // Siêu tối ưu cho máy yếu (Lite)
let visualState = "CHAOS"; 
let activeEraIndex = -1;
let targetZoom = 800;
let currentRotation = { x: 0, y: 0 };

// Timeline Labels
let timelineLabels = [];

function initParticles() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0002); // Add Depth Fog

    camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 8000);
    camera.position.z = 800;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    const container = document.getElementById('canvas-container');
    if (container) {
        container.innerHTML = '';
        container.appendChild(renderer.domElement);
         createTimelineLabels(container); // Create HTML labels
    }

    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    for(let i=0; i<PARTICLE_COUNT; i++) {
        pos[i*3] = (Math.random()-0.5)*4500; pos[i*3+1] = (Math.random()-0.5)*4500; pos[i*3+2] = (Math.random()-0.5)*4500;
        col[i*3] = col[i*3+1] = col[i*3+2] = 0.5;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    particleSystem = new THREE.Points(geo, new THREE.PointsMaterial({ size: 4, vertexColors: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending }));
    scene.add(particleSystem);
    animate();
}

function getEraPosition(i, type) {
    const t = i / PARTICLE_COUNT;
    const time = Date.now() * 0.001;
    let x, y, z;
    
    switch(type) {
        case "PRIMITIVE": 
            // WANDERING ORGANICALLY
            // Noise-like wandering using multiple sine waves
            // "Occasionally form temporary clusters" -> modulated global clustering
            
            // Base wandering
            const fx = Math.sin(t * 100 + time * 0.5) + Math.cos(i * 0.1 + time * 0.2);
            const fy = Math.sin(i * 0.2 + time * 0.4) + Math.cos(t * 50);
            const fz = Math.sin(t * 80 + i) + Math.cos(time * 0.3);

            // Gentle clustering force (breathing)
            const clusterScale = 1 + Math.sin(time * 0.5) * 0.3;
            
            x = fx * 250 * clusterScale;
            y = fy * 250 * clusterScale;
            z = fz * 250 * clusterScale;
            break;

        case "SLAVE": 
            // MASTERS vs SLAVES
            // "Small number of large, bright" (Masters) vs "Many small, dim" (Slaves)
            
            if (i < 150) { 
                // MASTERS (Top 5% approx) - Centralized, static, dominant
                // Sphere cluster at center
                const rM = Math.random() * 100;
                const thetaM = Math.random() * Math.PI * 2;
                const phiM = Math.acos(2 * Math.random() - 1);
                x = rM * Math.sin(phiM) * Math.cos(thetaM);
                y = rM * Math.sin(phiM) * Math.sin(thetaM) + 200; // Elevated
                z = rM * Math.cos(phiM);
            } else {
                // SLAVES - Confined in movement corridors (Grid/Cylinders below)
                // Linear motion, restricted
                const col = (i % 5); // 5 columns
                const rowT = (i / 3000) * Math.PI * 4;
                
                // Defined corridors
                const corridorX = (col - 2) * 200; 
                const corridorZ = Math.sin(i * 0.1) * 50;
                
                // Movement: Pushed back if trying to go up
                let flowY = -200 + Math.sin(time + i * 0.01) * 50;
                
                // "Periodically pulled toward large particles"
                const pull = Math.max(0, Math.sin(time * 0.5 + i * 0.01));
                if (pull > 0.8) {
                    // Temporary pull up
                    flowY += (pull - 0.8) * 400; 
                }

                x = corridorX + Math.sin(time * 2 + i) * 10; // Jitter
                y = flowY;
                z = corridorZ;
            }
            break;

        case "FEUDAL": 
            // VERTICAL LAYERS (Hierarchy)
            // Cannot cross layers
            
            let layerY, layerR, layerSpeed;
            if (i < 300) {
                // KING/LORDS (Top Layer) - High, Wide, Slow, Majestic
                layerY = 400;
                layerR = 200;
                layerSpeed = 0.2;
            } else if (i < 1000) {
                // NOBILITY/KNIGHTS (Middle)
                layerY = 0;
                layerR = 450;
                layerSpeed = 0.5;
            } else {
                // PEASANTS (Bottom) - Crowded
                layerY = -400;
                layerR = 700;
                layerSpeed = 1.0;
            }

            const angleF = (i * 0.5) + time * layerSpeed;
            x = Math.cos(angleF) * layerR;
            z = Math.sin(angleF) * layerR;
            y = layerY + Math.sin(i * 0.1 + time) * 20; // Slight flutter, no layer crossing
            break;

        case "CAPITALIST": 
            // RAPID, INDEPENDENT, ACCUMULATION
            // "Some grow larger/attract" vs "Rapid independent"
            
            const isAccumulator = (i % 50 === 0);
            
            if (isAccumulator) {
                // ACCUMULATORS - Center of small gravity wells
                // Moving slowly but dominating space
                x = Math.sin(time * 0.5 + i) * 300;
                y = Math.cos(time * 0.3 + i) * 300;
                z = Math.sin(time * 0.4 + i) * 300;
            } else {
                // WORKERS - Fast chaotic orbits around attractors or free space
                // High speed
                const speedC = 2.0;
                
                // Basic chaotic orbit
                const rC = 400 + Math.sin(time * speedC + i) * 400;
                const thetaC = i * 0.1 + time * speedC;
                const phiC = i * 0.2;
                
                x = rC * Math.sin(thetaC) * Math.cos(phiC);
                y = rC * Math.sin(thetaC) * Math.sin(phiC);
                z = rC * Math.cos(thetaC);
                
                // "Collisions frequent": Simulating bounce/jitter
                if (Math.sin(time * 5 + i) > 0.8) {
                    x += (Math.random()-0.5) * 100;
                    y += (Math.random()-0.5) * 100;
                    z += (Math.random()-0.5) * 100;
                }
            }
            break;

        case "SOCIALIST": 
            // EVEN DISTRIBUTION, SYNCHRONIZED
            // "Balanced distances", "Subtly pull back"
            
            // Grid-like or Lattice structure but flexible
            // Sphere surface distribution is good for equality
            
            const radiusS = 600;
            const phiS = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
            const thetaS = Math.sqrt(PARTICLE_COUNT * Math.PI) * phiS;
            
            // "Synchronized speed" - Pulsing together
            const pulseS = 1 + Math.sin(time * 2) * 0.05;
            
            // Base Position
            x = radiusS * Math.sin(phiS) * Math.cos(thetaS) * pulseS;
            y = radiusS * Math.sin(phiS) * Math.sin(thetaS) * pulseS;
            z = radiusS * Math.cos(phiS) * pulseS;
            
            // "Pull back into balance" - Keep them relatively stable
            // Add subtle wave, not chaos
            x += Math.sin(y * 0.01 + time) * 20;
            break;

        case "COMMUNIST": 
            // CONNECTED NETWORK, WAVE-LIKE, NO CENTER
            // Mobius Strip or Torus Knot for "Infinite connection"
            
            // Utilizing a Torus shape to show connectivity and cyclic flow
            const tubR = 600;
            const tubeR = 250;
            const uC = (i / PARTICLE_COUNT) * Math.PI * 2 * 10 + time; // Flow along tube
            const vC = (i / PARTICLE_COUNT) * Math.PI * 2;
            
            // Torus formula
            // x = (R + r cos v) cos u
            // y = (R + r cos v) sin u
            // z = r sin v
            
            // Modulating tube radius with wave (Wave-like unified motion)
            const wave = 1 + Math.sin(uC * 2 + time) * 0.2;
            
            x = (tubR + tubeR * wave * Math.cos(vC)) * Math.cos(uC * 0.1 + time * 0.2);
            y = (tubR + tubeR * wave * Math.cos(vC)) * Math.sin(uC * 0.1 + time * 0.2);
            z = tubeR * wave * Math.sin(vC);
            
            // "Single living structure"
            // Rotate the whole torus slowly in getEraPosition is hard, better in animate.
            // But we can add local twist
            const twist = Math.sin(time) * 100;
            z += Math.sin(x*0.002)*twist;
            break;

        default: x=0; y=0; z=0;
    }
    return {x, y, z};
}

function createTimelineLabels(container) {
    ERA_DATA.forEach((era, idx) => {
        const div = document.createElement('div');
        div.className = 'timeline-label';
        div.innerHTML = `<span style="color:rgb(${era.color[0]*255},${era.color[1]*255},${era.color[2]*255}); font-size: 1.5em">${era.title}</span><br><span class="timeline-year">Giai đoạn ${idx + 1}</span>`;
        container.appendChild(div);
        timelineLabels.push({ el: div, idx: idx });
    });
}

function updateTimelineLabels(show) {
    timelineLabels.forEach(l => {
        if(show) {
            l.el.classList.add('visible');
        } else {
            l.el.classList.remove('visible');
            l.el.style.opacity = '0'; // FORCE HIDE for immediate effect (overriding inline opacity)
            l.el.style.pointerEvents = 'none';
        }
    });
}

function animate() {
    requestAnimationFrame(animate);
    if (!particleSystem) return;

    const pos = particleSystem.geometry.attributes.position.array;
    const col = particleSystem.geometry.attributes.color.array;

    camera.position.z += (targetZoom - camera.position.z) * 0.05; // Smoother zoom
    particleSystem.rotation.y += (currentRotation.y - particleSystem.rotation.y) * 0.08;
    particleSystem.rotation.x += (currentRotation.x - particleSystem.rotation.x) * 0.08;
    
    // Timeline Flow Motion
    const time = Date.now() * 0.001;

    if (visualState === "CHAOS") {
        for(let i=0; i<PARTICLE_COUNT; i++) {
            pos[i*3] += Math.sin(time+i)*4; pos[i*3+1] += Math.cos(time+i)*4;
            col[i*3] = col[i*3+1] = col[i*3+2] = 0.5;
        }
    } else if (visualState === "TIMELINE") {
       // Update label positions
        timelineLabels.forEach(l => {
            // Project 3D position to 2D screen
            const idx = l.idx;
            const centerX = (idx - 2.5) * 600;
            const vec = new THREE.Vector3(centerX, 0, 0);
            
            // Standard normalized device coordinates
            vec.project(camera);
            
            // Convert to screen pixels
            const x = (vec.x * .5 + .5) * window.innerWidth;
            const y = (-(vec.y * .5) + .5) * window.innerHeight;
            
            // Only update if visible
            if (Math.abs(vec.z) < 1) {
                l.el.style.left = `${x}px`;
                l.el.style.top = `${y + 140}px`; // Label below the sphere
                l.el.style.opacity = '1';
                l.el.style.transform = `translate(-50%, -50%) scale(${1 - vec.z/1.5})`; // Scale by depth
            } else {
                 l.el.style.opacity = '0';
            }
        });

        // Arrange 6 Eras in a horizontal line with FLOW visualization
        for(let i=0; i<PARTICLE_COUNT; i++) {
            const idx = i % 6; 
            const centerX = (idx - 2.5) * 600; 
            
            // Sphere math with PULSE
            const u = (i * 123.456) % 1;
            const v = (i * 789.123) % 1;
            const theta = 2 * Math.PI * u + time * 0.5; // Rotate
            const phi = Math.acos(2 * v - 1);
            
            // Pulse effect: make spheres breathe
            const pulse = 1 + Math.sin(time * 2 + idx) * 0.1;
            const r = 200 * pulse; 
            
            const tx = centerX + r * Math.sin(phi) * Math.cos(theta);
            const ty = r * Math.sin(phi) * Math.sin(theta);
            const tz = r * Math.cos(phi);
            
            // Add connecting streams between spheres - INCREASED DENSITY & VARIETY
            if (i % 5 === 0 && idx < 5) { // Tăng mật độ kết nối (trước là % 20)
                // Particles flying from this sphere to next
                 const nextCenterX = centerX + 600;
                 
                 // Tạo sự đa dạng tốc độ để dòng chảy trông tự nhiên hơn
                 const speedVar = 1 + (i % 5) * 0.2; 
                 const flyingT = ((Date.now() / (2000 / speedVar)) + (i/500)) % 1; // 0 to 1 Loop
                 
                 // Overwrite target for flying particles - Multiple Arcs
                 const currentX = centerX + (nextCenterX - centerX) * flyingT;
                 
                 // Tạo nhiều đường cung độ cao khác nhau (trước chỉ là 150)
                 // i % 3 sẽ tạo ra 3 tầng kết nối: thấp, trung bình, cao
                 const arcHeight = 100 + (i % 4) * 60; 
                 const arcY = Math.sin(flyingT * Math.PI) * arcHeight * (i%2===0 ? 1 : -1); // Trên dưới xen kẽ
                 
                 // Thêm chút xoắn ốc (spiral) cho dòng chảy
                 const spiralZ = Math.cos(flyingT * Math.PI * 4) * 50;

                 pos[i*3] += (currentX - pos[i*3]) * 0.2;
                 pos[i*3+1] += (arcY - pos[i*3+1]) * 0.2; 
                 pos[i*3+2] += (spiralZ - pos[i*3+2]) * 0.2;
            } else {
                 // Standard Sphere
                 pos[i*3] += (tx - pos[i*3])*0.1; 
                 pos[i*3+1] += (ty - pos[i*3+1])*0.1; 
                 pos[i*3+2] += (tz - pos[i*3+2])*0.1;
            }
            
            col[i*3] += (ERA_DATA[idx].color[0]-col[i*3])*0.1; 
            col[i*3+1] += (ERA_DATA[idx].color[1]-col[i*3+1])*0.1; 
            col[i*3+2] += (ERA_DATA[idx].color[2]-col[i*3+2])*0.1;
        }
    } else if (visualState === "DETAIL" && activeEraIndex !== -1) {
        const era = ERA_DATA[activeEraIndex];
        for(let i=0; i<PARTICLE_COUNT; i++) {
            const tar = getEraPosition(i, era.type);
            pos[i*3] += (tar.x - pos[i*3])*0.15; pos[i*3+1] += (tar.y - pos[i*3+1])*0.15; pos[i*3+2] += (tar.z - pos[i*3+2])*0.15;
            col[i*3] += (era.color[0]-col[i*3])*0.1; col[i*3+1] += (era.color[1]-col[i*3+1])*0.1; col[i*3+2] += (era.color[2]-col[i*3+2])*0.1;
        }
    }
    particleSystem.geometry.attributes.position.needsUpdate = true;
    particleSystem.geometry.attributes.color.needsUpdate = true;
    renderer.render(scene, camera);
}

// Global interface for main.js to call
function setParticlesState(newState, eraIndex = -1) {
    visualState = newState;
    activeEraIndex = eraIndex;
    
    // Auto-camera logic based on state
    if (newState === 'TIMELINE') {
        targetZoom = 2500; 
        updateTimelineLabels(true); // Show labels
    } else {
        updateTimelineLabels(false); // Hide labels
        if (newState === 'DETAIL') {
            targetZoom = 600; 
        } else {
            targetZoom = 1000; 
        }
    }
}

window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});