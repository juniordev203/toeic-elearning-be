---
name: nestjs-architect-planning
description: Plans NestJS backend features before coding—data flow and Prisma schema, API design with DTOs and Swagger for Orval, and an atomic task checklist with file paths. Use when implementing new backend features, breaking down requirements or PRDs, or when the user wants architecture or a task breakdown on NestJS/TypeScript/PostgreSQL/Prisma stack.
---

# NestJS Architect — Phân tích trước khi code

## Khi nào dùng

Áp dụng khi được giao phát triển Backend NestJS: **không viết code ngay**; chỉ phân tích kiến trúc, contract API, và lập bảng task nguyên tử.

## Ràng buộc bắt buộc

- **Cấm code ở bước này:** Chỉ phân tích + checklist công việc.
- **Stack:** NestJS, TypeScript, PostgreSQL, Prisma, Swagger OpenAPI, `class-validator` & `class-transformer`.
- **API contract / đồng bộ FE:**
  - Mọi endpoint có Request DTO (`@Body`, `@Query`) và Response DTO; không trả Entity thô hoặc `any/object`.
  - Response DTO trong `dto/` của module, hậu tố `-response.dto.ts`.
  - Swagger đầy đủ: `@ApiResponse`, `@ApiProperty` (kèm `example`, `enum` nếu là enum) trên mọi endpoint để Orval generate type đúng.
  - Enum domain có sẵn (ví dụ `DictationMode`: KEYWORD, PHRASE, FULL_SENTENCE) thì dùng enum đó, không tự nghĩ kiểu mới.
- **Đường dẫn file:** Không vẽ cây thư mục dài. Gắn **đường dẫn file dự kiến** trực tiếp vào cột "Tên Task" ở bảng Bước 3.
- **Task nguyên tử:** Một task = một vấn đề (schema, DTO, service, controller…), có DoD rõ.

## SOP — 3 bước

### Bước 1: Yêu cầu & schema (data flow)

- Luồng logic chính; model DB nào tham gia.
- Thiết kế/cập nhật Prisma schema nếu cần: quan hệ, ràng buộc, migration implications.
- Liệt kê **Q&A cần làm rõ** với Frontend/PO.

### Bước 2: Kiến trúc API

- Method HTTP + path cho từng endpoint.
- Payload Request/Response rạch ròi.
- **Response wrap:** Dự án dùng `TransformInterceptor` → body thực tế là `{ success, data, message }`. Ở `@ApiResponse({ type: ... })` chỉ khai báo type của **`data`** (ví dụ `XyzResponseDto`), không mô tả cả envelope trừ khi dự án có DTO wrapper riêng.

### Bước 3: Bảng task nguyên tử

Xuất **một** bảng Markdown:

| ID | Thể Loại | Tên Task & Đường Dẫn File | Mô Tả Logic Cốt Lõi | Tiêu Chí Hoàn Thành (DoD) | Trạng Thái |
|:---|:---|:---|:---|:---|:---:|
| T1 | `[DB]` | … ví dụ `prisma/schema.prisma` | … | … | [ ] |
| T2 | `[DTO]` | … `src/.../dto/...-response.dto.ts` | class-validator + Swagger đầy đủ | … | [ ] |
| T3 | `[Logic]` | … `src/.../....service.ts` | Prisma, transaction, `HttpException` chuẩn | … | [ ] |
| T4 | `[API]` | … `src/.../....controller.ts` | Guards, `@ApiOperation`, `@ApiResponse`, test Postman | … | [ ] |

Thể loại có thể mở rộng (`[Test]`, `[Module]`…) nếu cần, vẫn giữ một task một mục tiêu.

## Ghi nhớ

- Ngắn gọn: chỉ thông tin kiến trúc và checklist; không nhồi code mẫu dài.
- Bản gốc chi tiết đội có thể tham chiếu tại `.agents/AI-Architect-Rules-NestJS.md` trong repo.
