---
version: "cube-landing-piranesi-2026-10"
name: "Cube - Piranesi Carceri & Geometric Architecture"
description: "Landing page for Cube, an autonomous TypeScript coding agent CLI. Designed around the aesthetics of Giovanni Battista Piranesi's Carceri d'invenzione and classical geometric architectural drafting. Deep chiaroscuro stone tones, monumental arch frameworks, drafting crosshairs, zero 3D overhead, and precision #38BDF8 blueprint accents."
colors:
  primary: "#38BDF8"           # Surveyor Blueprint Cyan: sharp drafting accents, prompt, active tabs
  primary-muted: "#0284C7"     # Muted blueprint tone
  background: "#0A0908"        # Deep antique stone chiaroscuro, warm obsidian
  surface: "#141210"           # Monumental stone card & bay background
  surface-2: "#0D0C0A"         # Inset console, terminal plinth
  border: "#2A2622"            # Architectural hairline mortar border
  border-light: "#3E3833"      # Drafting grid and elevation lines
  text-primary: "#F5F5F4"      # Limestone ivory white, high readability
  text-secondary: "#A8A29E"    # Stone dust & aged parchment secondary text
  text-muted: "#78716C"        # Dimmed drafting notations & scale markers
typography:
  display-roman:
    fontFamily: "Cinzel, Georgia, serif"
    fontWeight: 700
    letterSpacing: "0.08em"
  display-sans:
    fontFamily: "Inter, sans-serif"
    fontSize: "56px"
    fontWeight: 600
    lineHeight: "1.08"
    letterSpacing: "-0.03em"
  body-serif:
    fontFamily: "Georgia, serif"
    fontSize: "15px"
    lineHeight: "1.6"
  terminal-mono:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "13px"
    lineHeight: "1.5"
spacing:
  base: "8px"
  section-gap: "96px"
rounded:
  plinth: "2px"
  control: "2px"
  arch-vault: "240px 240px 0 0"
---

# Cube - Design System: Piranesi Carceri & Geometric Architecture

## 1. Triết Lý Thiết Kế Cốt Lõi (Core Philosophy)

1. **Kiến Trúc Đồ Sộ (Monumental Architectural Rigor):**
   - Lấy cảm hứng từ các bản khắc acid (etchings) *Carceri d'invenzione* của Giovanni Battista Piranesi: Không gian kiến trúc đồ sộ, hầm vòm đá khổng lồ, giàn giáo cơ khí, cầu thang đan xen đa chiều tượng trưng cho **mê cung cấu trúc của các codebase monorepo phức tạp**.
   - Toàn bộ giao diện được xây dựng như một công trình kiến trúc kiên cố: các đường plumb-line chạy dọc biên, vòm đá bán nguyệt (arch vaults), khung phân tầng (frieze & entablature), và dấu chữ thập đo đạc kiến trúc (`┼`).

2. **Chiaroscuro & Chất Liệu Khắc Acid (Linecraft & Hatching):**
   - Chiều sâu tạo nên từ kỹ thuật Chiaroscuro tự nhiên: bóng tối đá trầm (`#0A0908`, `#141210`) tương phản với ánh sáng đá vôi (`#F5F5F4`, `#A8A29E`).
   - Họa tiết khắc acid (cross-hatching) và lưới tọa độ trắc địa được tích hợp trực tiếp qua CSS vi mô (`.etching-bg`).

3. **Màu Điểm Nhấn `#38BDF8` (Technical Blueprint / Surveyor's Cyan):**
   - Đóng vai trò là **mực vẽ kỹ thuật và tia ngắm trắc địa của kiến trúc sư**: con trỏ `cube >`, thanh đo đạc kích thước `├──────┤`, chỉ báo tab active và diff mutations.
   - Tuyệt đối không dùng đèn LED/neon giả tạo hay glow cyberpunk.

4. **Tuyệt Đối Không 3D (Flat 2D Performance):**
   - Không sử dụng 3D transforms, không xoay lật khối cube, không WebGL.
   - Mọi cấu trúc và phối cảnh đạt 60fps mượt mà, phản hồi tức thì 0ms độ trễ.

---

## 2. Cấu Trúc Trang Theo Ngôn Ngữ Kiến Trúc (Architectural Sections)

1. **Navbar (Entablature / Architectural Frieze):** Khung dầm đá nổi với khắc chữ La Mã `CUBE // CARCERI`, số La Mã (`LIB. I`, `LIB. II`,...) và viền mỏng `#2A2622`.
2. **Hero (The Grand Vault & Dual Stage):**
   - Trưng bày trực quan phối cảnh kiến trúc đồ sộ cùng bảng điều khiển terminal kỹ thuật.
   - Headline: *"Navigate the labyrinth of software architecture"*.
   - Install Box dạng khối đá góc (cornerstone) với tab chuyển đa nền tảng.
3. **Liber I · The Six Architectural Piers (Harness Bento Grid):** 6 trụ đá của cỗ máy (Loop, Tool, Context, Memory, Background, Keystone Guardrail) với các thông số đo lường trắc địa.
4. **Liber II · The Architectural Showcase:** Trình diễn 4 bản khắc kiến trúc lớn (Plate I, II, III, IV) tương ứng với 4 năng lực cốt lõi (Gateway Matrix, Rule Discovery, Diff Guardrails, Interactive Q&A).
5. **Liber III · The Scriptorium (Commands Board):** Bộ tra cứu lệnh phím tắt với thước đo tọa độ.
6. **Liber IV · The Codices (FAQ):** Bảng giải đáp kiến trúc dạng phiến đá mở.
7. **Foundation Plinth (Footer):** Khối móng kiên cố nâng đỡ toàn bộ công trình với lệnh cài đặt nhanh.