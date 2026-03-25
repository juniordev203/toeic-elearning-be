# Phác thảo Yêu cầu Sản phẩm (PRD): Nền tảng Luyện nghe TOEIC - Gamified Dictation

Dự án này nhằm xây dựng một ứng dụng web luyện nghe TOEIC thông qua phương pháp chép chính tả (Dictation). Mục tiêu cốt lõi là biến một quá trình học tập vốn khô khan, dễ gây buồn ngủ thành một trải nghiệm tương tác, thú vị và có tính gây nghiện cao thông qua Gamification và Visual Learning.

---

## 1. Trải nghiệm Người dùng (User Flow)

Để quá trình code diễn ra trơn tru, đây là luồng trải nghiệm chính của người dùng (Main Flow) từ lúc bước vào đến lúc kết thúc một bài học:

- **Bước 1: Chọn bài tập (Select Mission).** Người dùng chọn một đoạn hội thoại (Part 3) hoặc bài nói (Part 4). Các bài học được đặt tên theo dạng "Nhiệm vụ tình báo".
- **Bước 2: Chọn cấp độ (Select Difficulty).** Tùy chọn điền từ khóa (Dễ), cụm từ (Trung bình) hoặc gõ cả câu (Khó).
- **Bước 3: Giao diện Chép chính tả (Dictation Workspace).** - Audio tự động phát.
  - Người dùng gõ vào ô input. **Hệ thống phản hồi màu sắc ngay lập tức (Xanh/Đỏ)** trên từng ký tự.
  - Pet ảo (Focus Pet) đứng ở góc màn hình phản ứng theo tốc độ gõ.
- **Bước 4: Lưu từ vựng (Vocab Capture).** Gặp từ khó, người dùng click đúp. Một popup hiện ra hiển thị nghĩa và tự động load 3 ảnh GIF/Meme gợi ý để người dùng chọn lưu lại.
- **Bước 5: Hoàn thành & Nhận thưởng (Completion & Rewards).** Nhận điểm kinh nghiệm (EXP) để nâng cấp Pet ảo và xem báo cáo tỷ lệ nghe đúng.

---

## 2. Các Tính năng Cốt lõi & Yêu cầu Kỹ thuật (Core Features & Tech Requirements)

### 2.1. Trình phát Audio & Bàn phím Thông minh (Smart Player & Keyboard)

Trải nghiệm gõ không bị gián đoạn là chìa khóa để giữ sự tập trung. Người học không bao giờ phải với tay lấy chuột khi đang gõ.

- **Hotkey Mapping:** - `Tab`: Tua lại 3 giây.
  - `Shift + Space`: Tạm dừng / Phát tiếp.
  - `Enter`: Nghe lại từ đầu câu hiện tại.
  - `Ctrl + Arrow Right/Left`: Chuyển sang câu tiếp theo/trước đó.
- **ASMR Typing Sound:** Tích hợp bộ âm thanh (sound effects) khi gõ phím cơ hoặc máy đánh chữ. Có toggle bật/tắt ở góc màn hình.

> **Pro-Tip:** Ở phía Frontend, sử dụng `e.preventDefault()` cho các phím tắt này để tránh trình duyệt thực hiện các hành vi mặc định (như nhảy tab).

### 2.2. Hệ thống Từ vựng Hình ảnh (Visual Vocab Vault)

Để chống buồn ngủ, phần học từ vựng phải thật "mặn" và kích thích thị giác.

- **Tích hợp API:** Sử dụng **Giphy API** hoặc **Tenor API** để tìm kiếm GIF. Khi người dùng click đúp vào từ "Delay", hệ thống gọi API với từ khóa "Delay funny" và trả về kết quả.
- **Flashcard Cá nhân hóa:** Giao diện lật thẻ (Flip card) với mặt trước là từ vựng + GIF meme, mặt sau là nghĩa tiếng Việt + phát âm + ví dụ chép chính tả mà họ vừa làm.

---

## 3. Cấu trúc Dữ liệu Đề xuất (Database Schema)

Dưới đây là thiết kế cấu trúc dữ liệu cơ bản (sử dụng CSDL quan hệ như PostgreSQL hoặc MySQL) để bạn có thể bắt tay vào thiết kế Backend.

| Tên Bảng (Table) | Trường Dữ liệu (Field) | Kiểu Dữ liệu (Type) | Mô tả (Description) |
| :--- | :--- | :--- | :--- |
| **Users** | `user_id` | UUID | ID định danh người dùng (Primary Key) |
| **Users** | `exp_points` | Integer | Điểm kinh nghiệm tích lũy để nuôi Pet |
| **Users** | `current_pet_id` | Integer | ID của con Pet đang đồng hành cùng user |
| **Lessons** | `lesson_id` | UUID | ID của bài nghe TOEIC |
| **Lessons** | `audio_url` | String | Đường dẫn đến file audio lưu trên S3/Cloud |
| **Lessons** | `transcript` | JSON | Cấu trúc mảng chứa các câu thoại và timestamp |
| **Vocab_Vault** | `vault_id` | UUID | ID thẻ từ vựng |
| **Vocab_Vault** | `user_id` | UUID | ID người dùng sở hữu thẻ (Foreign Key) |
| **Vocab_Vault** | `word` | String | Từ vựng tiếng Anh |
| **Vocab_Vault** | `gif_url` | String | URL của ảnh GIF/Meme đính kèm |
| **Vocab_Vault** | `context_sentence` | Text | Câu tiếng Anh chứa từ vựng trích xuất từ bài |

---

## 4. Gợi ý Tech Stack (Công nghệ triển khai)

Để dự án này vừa chạy mượt, vừa có tính tương tác cao (phản hồi real-time), đây là một stack lý tưởng để bắt đầu coding:

- **Frontend (Giao diện người dùng):** - **React.js** hoặc **Next.js**: Quản lý state cực tốt cho việc gõ từng chữ (real-time input check).
  - **Tailwind CSS**: Code giao diện và các hiệu ứng rung/lắc (shake animations) khi gõ sai một cách nhanh chóng.
  - **LottieFiles**: Dùng để render các animation cho Pet ảo (nhẹ và mượt hơn ảnh GIF rất nhiều).
- **Backend (Xử lý logic & API):** - **Node.js (Express hoặc NestJS)**: Phù hợp với các ứng dụng có nhiều I/O và tương tác liên tục. 
  - Hoặc **Python (FastAPI)** nếu bạn muốn sau này tích hợp thêm AI để chấm điểm phát âm hoặc tự động tạo câu hỏi.
- **Database (Lưu trữ):**
  - **PostgreSQL**: Lưu trữ thông tin người dùng, bài học, và kho từ vựng.
  - **Redis** (tùy chọn): Lưu cache các câu hình ảnh GIF cho các từ vựng phổ biến để giảm tải gọi API bên thứ ba.

---

## 5. Lộ trình Triển khai (Roadmap) để Code ngay

- **Giai đoạn 1 (MVP - Viable Product):** Hoàn thiện Core Mechanics. Chỉ tập trung làm tính năng nghe chép có phản hồi màu sắc Xanh/Đỏ và bộ phím tắt. Tạo dữ liệu thủ công cho 5-10 bài nghe Part 3 TOEIC.
- **Giai đoạn 2 (Visual & Engagement):** Tích hợp Giphy API làm kho từ vựng Meme. Code hệ thống điểm EXP và hiển thị Pet ảo thay đổi trạng thái theo tốc độ gõ.
- **Giai đoạn 3 (Retention):** Tích hợp chuông báo Pomodoro, hệ thống nhắc nhở ôn tập từ vựng bằng Spaced Repetition (Lặp lại ngắt quãng).

