# AI INSTRUCTION FILE

## Gesture-Based Interaction for 3D Web Timeline

### Chủ đề: Quyền con người trong tiến trình phát triển xã hội (Nguyên thủy → Cộng sản chủ nghĩa)

---

## 1. MỤC ĐÍCH FILE NÀY

File instruction này dùng để:

* Làm **AI Prompt System / Design Brief**
* Chuẩn hóa **logic cử chỉ tay (hand gestures)**
* Áp dụng cho **web 3D tương tác đơn giản nhưng hiệu quả**

AI / hệ thống triển khai phải tuân thủ đúng các quy tắc và hành vi dưới đây.

---

## 2. NGUYÊN TẮC NHẬN DIỆN CỬ CHỈ (GLOBAL RULES)

1. Mọi cử chỉ chỉ được kích hoạt khi **giữ ổn định tối thiểu 2 giây**.
2. Nếu cử chỉ bị phá vỡ trước 2 giây → **hủy nhận diện**.
3. Chỉ cho phép **1 cử chỉ hợp lệ tại một thời điểm**.
4. Cử chỉ **2 tay có độ ưu tiên cao hơn 1 tay**.
5. Khi phát hiện cử chỉ mới → reset toàn bộ timer cũ.
6. Khi AI Command Terminal mở → khóa các gesture khác.

---

## 3. ĐỊNH NGHĨA TRẠNG THÁI TAY (HAND STATES)

* FIST (Nắm tay): tất cả các ngón cong lại.
* OPEN PALM (Mở tay): từ 4–5 ngón duỗi thẳng.
* ONE FINGER: chỉ ngón trỏ.
* TWO FINGERS: trỏ + giữa.
* THREE FINGERS: trỏ + giữa + áp út.
* FOUR FINGERS: trỏ + giữa + áp út + út.
* ZOOM GESTURE: thay đổi khoảng cách giữa hai bàn tay.
* LEFT / RIGHT POINT: hướng tay lệch trái hoặc phải theo trục X.

---

## 4. CÁC CỬ CHỈ CHÍNH & HÀNH VI TƯƠNG ỨNG

### 4.1. Quay về Timeline tổng thể

**Gesture**: Hai bàn tay đều ở trạng thái FIST

**Hold**: ≥ 2 giây

**Action**:

* Camera zoom out nhẹ
* Tất cả các hạt quy tụ về trục timeline
* Hiển thị đầy đủ các giai đoạn lịch sử

---

### 4.2. Chọn các hình thái xã hội (Timeline Stage Selection)

**Quy tắc chung**:

* Một tay FIST (tay neo trạng thái)
* Một tay thể hiện số ngón tương ứng với giai đoạn
* Giữ ≥ 2 giây

#### Mapping cụ thể:

1 ngón → Xã hội nguyên thủy

* Hạt chuyển động tự do, gần nhau

2 ngón → Xã hội chiếm hữu nô lệ

* Hạt phân chia rõ ràng thống trị / bị trị

3 ngón → Xã hội phong kiến

* Hạt phân tầng theo chiều dọc

4 ngón → Chủ nghĩa tư bản

* Hạt chuyển động nhanh, va chạm, tích lũy

5 ngón → Xã hội chủ nghĩa

* Hạt phân bố đều, chuyển động hài hòa

6 (biểu trưng bằng mở tay đặc biệt) → Cộng sản chủ nghĩa (lý tưởng)

* Hạt liên kết thành mạng, không phân tầng

---

### 4.3. Trở về trạng thái hỗn mang

**Gesture**: Hai bàn tay đều OPEN PALM

**Hold**: ≥ 2 giây

**Action**:

* Timeline tan rã
* Hạt phát tán ra không gian
* Chuyển động hỗn độn, ngẫu nhiên

---

### 4.4. Zoom In / Zoom Out

**Gesture**:

* Một tay OPEN PALM (tay chính)
* Tay còn lại thực hiện ZOOM GESTURE

**Hold**: ≥ 2 giây để kích hoạt, sau đó zoom theo chuyển động

**Action**:

* Camera tiến / lùi mượt

---

### 4.5. Xoay không gian trái / phải

**Gesture**:

* Một tay OPEN PALM
* Tay còn lại chỉ sang trái hoặc phải

**Hold**: ≥ 2 giây

**Action**:

* Toàn bộ hệ hạt và timeline xoay quanh trục Y

---

### 4.6. Cuộn nội dung thông tin

**Gesture**:

* Hai bàn tay mở
* Hai bàn tay nằm ngang
* Đầu ngón tay hướng vào nhau

**Hold**: ≥ 2 giây

**Action**:

* Di chuyển tay lên → cuộn nội dung lên
* Di chuyển tay xuống → cuộn nội dung xuống

---

### 4.7. AI Command Terminal

#### Mở Terminal

**Gesture**: Hai bàn tay đều giơ TWO FINGERS

**Hold**: ≥ 2 giây

**Action**:

* Mở AI Command Terminal overlay
* Làm tối nhẹ không gian nền
* Khóa các gesture khác

#### Đóng Terminal

**Gesture**: Hai bàn tay đều giơ THREE FINGERS

**Hold**: ≥ 2 giây

**Action**:

* Đóng Terminal
* Trả lại quyền điều khiển gesture chính

---

## 5. NGUYÊN TẮC TRẢI NGHIỆM (UX PHILOSOPHY)

* Không dùng nút bấm truyền thống
* Mọi hành động đều gắn với **chuyển động cơ thể**
* Người dùng không “xem” lịch sử, mà **tái cấu trúc lịch sử bằng tay**

---

## 6. THÔNG ĐIỆP CỐT LÕI

> Quyền con người không tồn tại sẵn,
> mà được hình thành qua tổ chức xã hội và đấu tranh lịch sử.

---

## 7. KẾT THÚC FILE

File instruction này là chuẩn duy nhất để:

* Huấn luyện AI hiểu gesture
* Triển khai logic tương tác
* Đảm bảo tính nhất quán trải nghiệm

Không thêm, không bớt, không diễn giải lại logic gesture ngoài file này.

---

## SLIDE CONTENT MODE (DEEP DIVE PER SOCIAL SYSTEM)

### MODE OVERVIEW

This system introduces a **locked content exploration mode** per social system.
When inside content mode, global navigation (timeline, chaos, system switching) is DISABLED.
Only content-specific gestures are accepted.

This reinforces focus, immersion, and prevents accidental context switching.

---

## ENTER / EXIT CONTENT MODE (GLOBAL RULE)

### ENTER CONTENT MODE

* Gesture: **7 fingers raised (both hands combined)**
* Context-sensitive: applies ONLY to the currently active social system
* Effect:

  * Transition from system overview → internal content space
  * Particle system restructures into narrative clusters
  * Timeline, chaos, and system-switch gestures are temporarily locked

### EXIT CONTENT MODE

* Gesture: **8 fingers raised (both hands combined)**
* Effect:

  * Exit content space
  * Return to the SAME social system overview (not timeline, not chaos)
  * Restore global navigation gestures

Gesture must be held for **≥ 2 seconds** to activate.

---

## CONTENT MODE BEHAVIOR RULES (CRITICAL)

When Content Mode is ACTIVE:

* ❌ Cannot switch social systems
* ❌ Cannot enter chaos / particle dispersion
* ❌ Cannot access timeline aggregation
* ❌ Cannot trigger observer effect

Only slide-navigation gestures are allowed.
All other gestures are ignored.

This creates a **hard interaction boundary**.

---

## SLIDE NAVIGATION GESTURES (CONTENT MODE ONLY)

### NEXT SLIDE

* Gesture: **1 finger raised (single hand)**
* Effect:

  * Transition to next conceptual slide
  * Particle clusters reorganize to express the next human-rights concept
  * Motion flows forward in spatial depth

### PREVIOUS SLIDE

* Gesture: **2 fingers raised (single hand)**
* Effect:

  * Return to previous slide
  * Particle motion reverses or contracts accordingly

Gesture must be held for **≥ 2 seconds** to prevent accidental triggers.

---

## SLIDE STRUCTURE (ABSTRACT, NON-VERBAL)

Each slide represents ONE aspect of human rights within the active social system.

Slides differ ONLY by:

* particle density
* movement constraints
* force directionality
* clustering logic
* degrees of freedom

No text, symbols, icons, or labels are allowed.
Meaning is expressed purely through motion and structure.

---

## STATE MACHINE PRIORITY (SIMPLIFIED)

Priority order (highest → lowest):

1. Content Mode gestures (1, 2, 8 fingers)
2. Content UI interaction (mouse / pointer on slide bar)
3. System-level gestures (timeline, chaos, rotation, zoom)
4. Ambient motion (idle state)

If Content Mode is active, priorities 3 and 4 are ignored.

---

## CONTENT SLIDE NAVIGATION BAR (UI + GESTURE HYBRID)

### UI DESCRIPTION

When Content Mode is ACTIVE:

* Display a **minimal horizontal slide bar**
* Position: **bottom center of the screen**
* Appearance:

  * Thin horizontal line
  * Evenly spaced numeric markers: 1 2 3 4 5 6 7 8 9 …
  * Current slide is highlighted subtly (brightness or size only)

No text labels beyond numbers.
No decorative UI elements.

---

### MOUSE / POINTER INTERACTION

* User may click directly on any slide number
* Clicking a number:

  * Instantly navigates to that slide
  * Triggers the same particle transition logic as gesture-based navigation

Mouse interaction is ONLY enabled inside Content Mode.
Outside Content Mode, the slide bar does not exist.

---

### SYNCHRONIZATION RULES

* Gesture navigation (1 / 2 fingers) and mouse clicks MUST stay synchronized
* When a slide changes:

  * Update highlighted slide index
  * Animate slide bar indicator smoothly

There is always ONE active slide.

---

### BEHAVIORAL CONSTRAINTS (IMPORTANT)

* Clicking slides does NOT unlock system-level navigation
* Mouse input cannot exit Content Mode
* Only the **8-finger gesture** exits Content Mode

This preserves intentional exit via body-based interaction.

---

### DESIGN INTENT (DO NOT RENDER)

The slide bar provides:

* Cognitive orientation ("where am I")
* Manual precision for advanced users

While gestures provide:

* Embodied, intentional navigation

Both coexist, but **the body has authority over context**.

Understanding remains intentional, not passive.

---

## CONTENT DATA ARCHITECTURE (DATA-DRIVEN SYSTEM)

### CORE PRINCIPLE

All narrative content MUST be driven from external data files.
No human-rights logic, slide count, or particle behavior is hardcoded.

The engine only reads data.
Meaning emerges from configuration.

---

## DATA FILE STRUCTURE (HIGH LEVEL)

Each social system is defined as a **data object**.
Each object contains an ordered list of **slides**.
Each slide defines particle behavior parameters ONLY.

The same rendering engine is reused for all systems.

---

## MASTER DATA INDEX

```
/systems
  ├─ primitive.json
  ├─ slave.json
  ├─ feudal.json
  ├─ capitalist.json
  ├─ socialist.json
  ├─ communist.json
```

The engine loads systems dynamically based on timeline state.

---

## SYSTEM DATA SCHEMA (ABSTRACT)

Each system file MUST define:

* systemId
* systemName (internal only, never rendered)
* overviewState (particle rules for overview mode)
* slides[] (ordered array)

---

## SLIDE DATA SCHEMA (EXTENDED: OVERVIEW → DEEP DIVE)

Slides are strictly ordered.

### SLIDE TYPE RULE

* Slide 0 is ALWAYS an **OVERVIEW SLIDE**
* Slides 1..N are **DEEP DIVE SLIDES**

This rule is mandatory for every system.

---

### OVERVIEW SLIDE (Slide 0)

Purpose:

* Provide a holistic, high-level perception of the social system
* Establish emotional and structural context

Characteristics:

* Lower particle complexity
* Clear global structure
* Slower transitions
* Balanced camera distance

Required fields:

* slideIndex: 0
* slideType: "overview"
* particleCount
* globalStructure
* movementSpeed
* hierarchyStrength

No evidence, no illustration clusters.

---

### DEEP DIVE SLIDES (Slide 1..N)

Purpose:

* Explore specific aspects of human rights within the system
* Each slide focuses on ONE concept only

Characteristics:

* Higher particle specificity
* Localized structures
* Stronger forces or constraints

Required fields:

* slideIndex
* slideType: "detail"
* focusDomain

Optional fields:

* evidenceClusters
* illustrationClusters

---

## EVIDENCE & ILLUSTRATION REPRESENTATION (NON-LITERAL)

### EVIDENCE CLUSTERS (WHEN DATA EXISTS)

If the content includes historical evidence or references:

Represent evidence as:

* Small, stable particle clusters
* High coherence
* Minimal movement
* Slightly higher brightness

Rules:

* Evidence clusters do NOT dominate
* They anchor meaning without explicit explanation
* Quantity reflects strength of evidence, not importance

---

### ILLUSTRATION CLUSTERS (HUMAN EXPERIENCE)

If the content includes illustrative examples of human experience:

Represent illustration as:

* Semi-organic particle formations
* Rhythmic motion
* Temporary emergence and dissolution

Rules:

* Illustration clusters are dynamic
* They never form literal shapes (no humans, no symbols)
* They support intuition, not narration

---

## SLIDE TRANSITION LOGIC (IMPORTANT)

* Transition from overview → detail: gradual increase in complexity
* Transition between detail slides: lateral reconfiguration
* Returning to overview (slide 0): complexity collapses back to global structure

No hard cuts.
All transitions are interpolated.

---

## DATA VALIDATION RULES

* Every system MUST contain at least 1 overview slide
* Deep dive slides are optional but ordered
* If evidenceClusters exist, illustrationClusters may coexist
* If no evidence is provided, slide relies purely on structural motion

---

## DESIGN INTENT (DO NOT RENDER)

This structure ensures:

* Viewers always understand "where they are"
* Depth is intentional, not overwhelming
* Evidence supports understanding without breaking abstraction

The narrative breathes: overview → insight → overview.

---

## SLIDE BAR GENERATION RULE

* Number of slides = slides.length
* Slide bar markers are generated automatically
* Highlight index is bound to active slideIndex

No manual UI configuration is allowed.

---

## CONTENT MODE DATA FLOW

1. User enters Content Mode (7 fingers)
2. Engine loads active system data file
3. Slide 1 is instantiated from data
4. Gesture / mouse updates slideIndex
5. Engine interpolates particle state between slide objects

---

## EDITOR FRIENDLY RULES

* Designers can edit JSON without touching code
* New slides can be added without engine changes
* Removing slides automatically updates UI

The system scales by data, not logic.

---

## DESIGN INTENT (DO NOT RENDER)

This architecture ensures:

* Long-term maintainability
* Ideological neutrality of the engine
* Clear separation between form (engine) and meaning (data)

The website becomes a **living archive**, not a fixed narrative.
