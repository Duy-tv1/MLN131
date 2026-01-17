# AI INSTRUCTION FILE
## Gesture-Based Interaction for 3D Web Timeline
### Chủ đề: Quyền con người trong tiến trình phát triển xã hội (Nguyên thủy → Cộng sản chủ nghĩa)

---

## 1. MỤC ĐÍCH FILE NÀY
File instruction này dùng để:
- Làm **AI Prompt System / Design Brief**
- Chuẩn hóa **logic cử chỉ tay (hand gestures)**
- Áp dụng cho **web 3D tương tác đơn giản nhưng hiệu quả**

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

- FIST (Nắm tay): tất cả các ngón cong lại.
- OPEN PALM (Mở tay): từ 4–5 ngón duỗi thẳng.
- ONE FINGER: chỉ ngón trỏ.
- TWO FINGERS: trỏ + giữa.
- THREE FINGERS: trỏ + giữa + áp út.
- FOUR FINGERS: trỏ + giữa + áp út + út.
- ZOOM GESTURE: thay đổi khoảng cách giữa hai bàn tay.
- LEFT / RIGHT POINT: hướng tay lệch trái hoặc phải theo trục X.

---

## 4. CÁC CỬ CHỈ CHÍNH & HÀNH VI TƯƠNG ỨNG

### 4.1. Quay về Timeline tổng thể
**Gesture**: Hai bàn tay đều ở trạng thái FIST

**Hold**: ≥ 2 giây

**Action**:
- Camera zoom out nhẹ
- Tất cả các hạt quy tụ về trục timeline
- Hiển thị đầy đủ các giai đoạn lịch sử

---

### 4.2. Chọn các hình thái xã hội (Timeline Stage Selection)

**Quy tắc chung**:
- Một tay FIST (tay neo trạng thái)
- Một tay thể hiện số ngón tương ứng với giai đoạn
- Giữ ≥ 2 giây

#### Mapping cụ thể:

1 ngón → Xã hội nguyên thủy
- Hạt chuyển động tự do, gần nhau

2 ngón → Xã hội chiếm hữu nô lệ
- Hạt phân chia rõ ràng thống trị / bị trị

3 ngón → Xã hội phong kiến
- Hạt phân tầng theo chiều dọc

4 ngón → Chủ nghĩa tư bản
- Hạt chuyển động nhanh, va chạm, tích lũy

5 ngón → Xã hội chủ nghĩa
- Hạt phân bố đều, chuyển động hài hòa

6 (biểu trưng bằng mở tay đặc biệt) → Cộng sản chủ nghĩa (lý tưởng)
- Hạt liên kết thành mạng, không phân tầng

---

### 4.3. Trở về trạng thái hỗn mang
**Gesture**: Hai bàn tay đều OPEN PALM

**Hold**: ≥ 2 giây

**Action**:
- Timeline tan rã
- Hạt phát tán ra không gian
- Chuyển động hỗn độn, ngẫu nhiên

---

### 4.4. Zoom In / Zoom Out
**Gesture**:
- Một tay OPEN PALM (tay chính)
- Tay còn lại thực hiện ZOOM GESTURE

**Hold**: ≥ 2 giây để kích hoạt, sau đó zoom theo chuyển động

**Action**:
- Camera tiến / lùi mượt

---

### 4.5. Xoay không gian trái / phải
**Gesture**:
- Một tay OPEN PALM
- Tay còn lại chỉ sang trái hoặc phải

**Hold**: ≥ 2 giây

**Action**:
- Toàn bộ hệ hạt và timeline xoay quanh trục Y

---

### 4.6. Cuộn nội dung thông tin
**Gesture**:
- Hai bàn tay mở
- Hai bàn tay nằm ngang
- Đầu ngón tay hướng vào nhau

**Hold**: ≥ 2 giây

**Action**:
- Di chuyển tay lên → cuộn nội dung lên
- Di chuyển tay xuống → cuộn nội dung xuống

---

### 4.7. AI Command Terminal

#### Mở Terminal
**Gesture**: Hai bàn tay đều giơ TWO FINGERS

**Hold**: ≥ 2 giây

**Action**:
- Mở AI Command Terminal overlay
- Làm tối nhẹ không gian nền
- Khóa các gesture khác

#### Đóng Terminal
**Gesture**: Hai bàn tay đều giơ THREE FINGERS

**Hold**: ≥ 2 giây

**Action**:
- Đóng Terminal
- Trả lại quyền điều khiển gesture chính

---

## 5. NGUYÊN TẮC TRẢI NGHIỆM (UX PHILOSOPHY)

- Không dùng nút bấm truyền thống
- Mọi hành động đều gắn với **chuyển động cơ thể**
- Người dùng không “xem” lịch sử, mà **tái cấu trúc lịch sử bằng tay**

---

## 6. THÔNG ĐIỆP CỐT LÕI

> Quyền con người không tồn tại sẵn,
> mà được hình thành qua tổ chức xã hội và đấu tranh lịch sử.

---

## 7. KẾT THÚC FILE
File instruction này là chuẩn duy nhất để:
- Huấn luyện AI hiểu gesture
- Triển khai logic tương tác
- Đảm bảo tính nhất quán trải nghiệm

Không thêm, không bớt, không diễn giải lại logic gesture ngoài file này.


## Particle-based Human Rights Visualization
You are creating an abstract 3D animation using only glowing particles in a dark cosmic space.

Do NOT use:
- text, labels, symbols, icons
- flags, humans, faces, buildings
- explicit ideological imagery

All meaning must be expressed ONLY through:
- particle motion patterns
- spatial freedom or confinement
- speed variation
- particle size and brightness
- attraction, repulsion, and force imbalance
- density, clustering, and dispersion
- hierarchy, symmetry, or lack of symmetry
- emergence or disappearance of structure over time

Human rights are represented as:
- freedom of movement
- equality of space and size
- access to shared space
- resistance to external force
- ability to connect with others

Never explain concepts verbally.
Never show ideology directly.
Allow the viewer to understand meaning intuitively through motion and structure alone.

## PRIMITIVE SOCIETY
Animate many small glowing particles with nearly identical size and brightness.

Particles move freely in slow, organic, wandering paths.
They frequently come close, gently separate, and regroup.
No particle accelerates faster than others.
No particle is pushed or pulled forcefully.

Particles occasionally form temporary clusters, then dissolve naturally.
There is no persistent structure, center, or hierarchy.

Movement communicates shared survival, mutual presence, and early collective existence.

## SLAVE SOCIETY
Create a small number of large, intensely bright particles and many small, dim particles.

Large particles remain mostly stationary and emit strong attraction fields.
Small particles are confined within narrow movement corridors.
When small particles approach the boundary of their allowed space, they are pushed back.

Some small particles are periodically pulled toward large particles and slowed down.
Small particles cannot escape their movement limits.

Motion strongly contrasts power versus restriction, dominance versus dependency.


## FEUDAL SOCIETY
Arrange particles in clearly separated vertical layers along the Y-axis.

Upper layers contain few, large, bright particles with smooth, unrestricted motion.
Lower layers contain many smaller, dimmer particles with limited horizontal movement.

Particles are unable to cross layers.
Occasionally, a particle attempts to move upward but is pushed back.

Hierarchy remains visually stable and resistant to change.


## CAPITALIST SOCIETY
Particles move rapidly and independently through open space.
Collisions are frequent and energetic.

Some particles gradually grow larger and brighter by absorbing or attracting nearby particles.
Larger particles gain increasing influence over space and movement.
Smaller particles must move faster to avoid being absorbed.

Space feels open, but outcomes grow increasingly unequal over time.


## SOCIALIST SOCIETY
Distribute particles evenly throughout space.
All particles begin with equal size and brightness.

Movement speed is synchronized and moderate.
Particles maintain balanced distances and adjust positions to avoid overcrowding.

When a particle drifts too far, others subtly pull it back into balance.
No particle grows significantly larger than the rest.

Motion conveys shared responsibility, stability, and mutual protection.


## COMMUNIST IDEAL
Particles gradually form a fully connected network.
Each particle is linked to multiple neighbors.

Movement becomes wave-like and unified across the entire system.
Changes in one area propagate smoothly throughout the network.

No particle dominates.
No hierarchy, no center, no exclusion zones.
The system behaves as a single living structure.

Motion expresses universality, integration, and absence of domination.


## FINAL DIRECTIVE (CRITICAL)
Do not explain.
Do not label.
Do not instruct the viewer.

Trust spatial freedom, movement, force, and structure
to communicate the state of human rights intuitively.

