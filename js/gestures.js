class GestureController {
    constructor(onGestureDetected) {
        this.onGestureDetected = onGestureDetected; 
        this.videoElement = document.querySelector('.input_video');
        this.canvasElement = document.querySelector('.output_canvas');
        this.canvasCtx = this.canvasElement.getContext('2d');
        
        // Gesture State
        this.currentGesture = null;
        this.gestureStartTime = 0;
        this.holdDuration = 2000; 
        this.cooldownEndTime = 0; 
        
        this.hands = new Hands({locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }});

        // Tối ưu hóa cho độ chính xác cao hơn - Downgrade to Lite for Performance
        this.hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 0, // 0 = Lite (Faster), 1 = Full (Slower)
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        this.hands.onResults(this.onResults.bind(this));

        // Friendly Names update for 2-hand logic
        this.gestureNames = {
            'nav_next': '👆 Slide Sau (1 tay)',
            'nav_prev': '✌️ Slide Trước (1 tay)',
            '1': '🖐 + ✊ Nguyên Thủy (1)',
            '2': '🖐 + ✊ Nô Lệ (2)',
            '3': '🖐 + ✊ Phong Kiến (3)',
            // Swapped to match camera inversion
            '4': '🖐 + ✊ XHCN (5)', 
            '5': '🖐 + ✊ Tư Bản (4)', 
            '6': '👐 Cộng Sản (Tổng 6)',
            '7': '🖐 + ✌️ Vào Chi Tiết (Tổng 7)',
            '8': '🖐 + 🤟 Thoát Chi Tiết (Tổng 8)',
            'exit_content': '🖐 + 🤟 Thoát Chi Tiết (Tổng 8)',
            'enter_content': '🖐 + ✌️ Vào Chi Tiết (Tổng 7)',
            'fist': '✊ + ✊ Timeline',
            'chaos': '👐 Hỗn Mang (2 Bàn Tay Mở)',
             // Fallbacks
            'reset': '✊ + ✊ Timeline',
            'open': 'Chờ tay còn lại...'
        };
    }

    async start() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480 }
            });
            this.videoElement.srcObject = stream;
            
            this.videoElement.onloadeddata = () => {
                this.videoElement.play();
                this.detectLoop();
                
                const btn = document.getElementById('start-btn');
                if(btn) btn.textContent = "Camera (Lite Mode)";
                
                const overlay = document.getElementById('loading-overlay');
                if(overlay) {
                    overlay.style.opacity = '0';
                    setTimeout(() => overlay.style.display = 'none', 500);
                }
            };
        } catch(e) {
            console.error("Camera failed:", e);
            alert("Không thể gởi camera! Hãy kiểm tra quyền truy cập.");
        }
    }

    async detectLoop() {
        // Throttling: Chỉ xử lý AI mỗi 100ms (10 FPS) thay vì 60 FPS
        // Điều này giúp máy yếu không bị đơ
        if (!this.lastDetect || Date.now() - this.lastDetect > 100) {
            if (this.videoElement.readyState === 4) {
                await this.hands.send({image: this.videoElement});
                this.lastDetect = Date.now();
            }
        }
        requestAnimationFrame(() => this.detectLoop());
    }

    detectSingleHandShape(landmarks) {
        const isFingerUp = (tipIdx, pipIdx) => {
            return landmarks[tipIdx].y < landmarks[pipIdx].y;
        };
        
        let fingersUp = 0;
        if (isFingerUp(8, 6)) fingersUp++; // Index
        if (isFingerUp(12, 10)) fingersUp++; // Middle
        if (isFingerUp(16, 14)) fingersUp++; // Ring
        if (isFingerUp(20, 18)) fingersUp++; // Pinky

        // CHỐT CHẶN: Chỉ đếm ngón cái khi 4 ngón kia ĐÃ MỞ (để bắt số 5).
        // Nếu 4 ngón kia chưa mở hết, ta bỏ qua ngón cái để tránh nhiễu (ngón cái hay bị duỗi nhẹ).
        
        let thumbUp = false;
        if (landmarks[4].y < landmarks[3].y) thumbUp = true; 

        if (fingersUp === 4) {
             if (thumbUp) return '5'; // 5 ngón (xòe cả bàn)
             return '4';
        }
        
        if (fingersUp === 3) return '3';
        if (fingersUp === 2) return '2';
        if (fingersUp === 1) return '1';
        
        if (fingersUp === 0) {
             return 'fist'; 
        }

        return 'unknown';
    }

    // Logic chính xử lý 2 tay
    detectDualHandGesture(results) {
        const hands = results.multiHandLandmarks;
        
        // Hỗ trợ 1 tay cho điều hướng Slide (Content Mode)
        if (hands.length === 1) {
            const g = this.detectSingleHandShape(hands[0]);
            if (g === '1') return 'nav_next';
            if (g === '2') return 'nav_prev';
            // Các cử chỉ khác vẫn yêu cầu 2 tay để tránh kích hoạt nhầm
            return 'missing_hand';
        }
        
        // Nếu không đủ 2 tay (và không phải trường hợp 1 tay hợp lệ ở trên)
        if (hands.length < 2) return 'missing_hand';

        const g1 = this.detectSingleHandShape(hands[0]);
        const g2 = this.detectSingleHandShape(hands[1]);

        const shapes = [g1, g2];

        // 4.1 Reset: Hai tay FIST
        if (g1 === 'fist' && g2 === 'fist') return 'reset';

        // 4.3 Chaos: Hai tay 5 (xòe cả 2)
        if (g1 === '5' && g2 === '5') return 'chaos';

        // 4.2 Chọn giai đoạn: Một tay FIST (neo) + Một tay Số
        const fistIndex = shapes.indexOf('fist');
        
        if (fistIndex !== -1) {
            const otherIndex = (fistIndex === 0) ? 1 : 0;
            const numberGesture = shapes[otherIndex];
            
            // Map chính xác
            if (['1', '2', '3', '4', '5'].includes(numberGesture)) {
                return numberGesture; 
            }
        }

        // Logic Cộng sản: Tổng ngón >= 6 (VD: 3+3, 4+3, 5+2...)
        const countFingers = (g) => {
            if (g === 'fist') return 0;
            return parseInt(g) || 0;
        };

        const total = countFingers(g1) + countFingers(g2);
        
        // NEW: 7 fingers -> Enter Content Mode
        if (total === 7) return 'enter_content';

        // NEW: 8 fingers -> Exit Content Mode
        if (total === 8) return 'exit_content';

        // NEW: Allow "Lazy" 1 and 2 for Slide Navigation (Content Mode)
        // This allows "1 + unknown/dropped hand" to count as '1' without strict Fist
        if (total === 1) return '1';
        if (total === 2) return '2';

        if (total === 6 && !(g1 === '5' && g2 === '5')) {
            return '6';
        }

        return 'unknown';
    }

    onResults(results) {
        // Cập nhật canvas kích thước thật (đỡ bị stretch/lệch)
        if (this.canvasElement.width !== this.videoElement.videoWidth) {
            this.canvasElement.width = this.videoElement.videoWidth;
            this.canvasElement.height = this.videoElement.videoHeight;
        }

        this.canvasCtx.save();
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        
        // Vẽ ảnh
        this.canvasCtx.drawImage(results.image, 0, 0, this.canvasElement.width, this.canvasElement.height);
        
        // Vẽ khung xương tay (Kiểm tra kỹ thư viện để tránh lỗi)
        if (results.multiHandLandmarks) {
            const hasDrawingUtils = (typeof drawConnectors === 'function') && (typeof drawLandmarks === 'function');
            const hasConnections = (typeof HAND_CONNECTIONS !== 'undefined');

            for (const landmarks of results.multiHandLandmarks) {
                if (hasDrawingUtils && hasConnections) {
                    drawConnectors(this.canvasCtx, landmarks, HAND_CONNECTIONS, {color: '#00FFFF', lineWidth: 2});
                    drawLandmarks(this.canvasCtx, landmarks, {color: '#FF0000', lineWidth: 1});
                } else {
                    // Fallback nếu thư viện drawing chưa load kịp
                    // Vẽ đơn giản các điểm
                    if (typeof drawLandmarks === 'function') {
                        drawLandmarks(this.canvasCtx, landmarks, {color: '#FF0000', lineWidth: 1});
                    }
                }
            }
        }
        this.canvasCtx.restore();

        // Xử lý Logic
        let detected = this.detectDualHandGesture(results);
        this.processHoldTimer(detected);
    }

    processHoldTimer(gesture) {
        // Cooldown
        if (Date.now() < this.cooldownEndTime) return;

        // Xử lý trạng thái thiếu tay
        if (gesture === 'missing_hand') {
            this.currentGesture = null;
            // Debounce message: only show if persistent? 
            // For now direct feedback is better to guide user.
            this.updateStatus({ state: 'idle', text: 'Đưa cả 2 bàn tay vào khung hình!' }, true);
            return;
        }

        if (!gesture || gesture === 'unknown') {
            this.currentGesture = null;
            this.updateStatus({ state: 'idle', text: 'Chờ lệnh: ✊ (Neo) + 1,2,3... (Lệnh)' });
            return;
        }

        const now = Date.now();
        if (this.currentGesture !== gesture) {
            this.currentGesture = gesture;
            this.gestureStartTime = now;
            const name = this.gestureNames[gesture] || gesture;
            this.updateStatus({ state: 'detecting', text: `Phát hiện: ${name}`, progress: 0 });
        } else {
            const elapsed = now - this.gestureStartTime;
            let progress = (elapsed / this.holdDuration) * 100;
            progress = Math.min(100, Math.max(0, progress));

            const name = this.gestureNames[gesture] || gesture;
            
            this.updateStatus({ 
                state: 'holding', 
                text: `Giữ yên 2s: ${name}`, 
                progress: progress 
            });

            if (elapsed >= this.holdDuration) {
                this.cooldownEndTime = now + 2000; 
                this.onGestureDetected(gesture);
                this.updateStatus({ state: 'success', text: 'KÍCH HOẠT THÀNH CÔNG!', progress: 100 });
                setTimeout(() => {
                     this.currentGesture = null; 
                }, 1500);
            }
        }
    }

    updateStatus(statusObj, isWarning = false) {
        const statusText = document.getElementById('status-text');
        const progressBar = document.getElementById('gesture-progress-bar');
        const progressContainer = document.getElementById('gesture-progress-container');
        
        if (statusText) {
            statusText.innerText = statusObj.text;
            if (isWarning) statusText.style.color = '#ffaa00';
            else statusText.style.color = '#fff';
        }
        
        if (progressBar && progressContainer) {
            if (statusObj.state === 'idle') {
                progressContainer.style.opacity = '0.3';
                progressBar.style.width = '0%';
            } else if (statusObj.state === 'success') {
                progressContainer.style.opacity = '1';
                progressBar.style.width = '100%';
                progressBar.style.backgroundColor = '#00ff00';
            } else {
                progressContainer.style.opacity = '1';
                progressBar.style.width = `${statusObj.progress}%`;
                
                if (statusObj.progress < 30) progressBar.style.backgroundColor = '#4facfe';
                else if (statusObj.progress < 70) progressBar.style.backgroundColor = '#f59e0b';
                else progressBar.style.backgroundColor = '#ffff00';
            }
        }
    }
}