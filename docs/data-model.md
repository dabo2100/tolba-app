# خطة ربط البيانات بـ PostgreSQL (تصميم مبدئي)

الواجهة الحالية تستخدم `AppDataRepository` كحدّ فاصل، والـ Adapter النشط في الذاكرة. هذه الخطة ليست قاعدة بيانات مطبّقة ولا تعني أن الأرقام الافتراضية حقيقية.

## كيانات المرحلة الأولى

| الكيان في الواجهة | جدول مقترح | مفتاح/حقول أساسية |
| --- | --- | --- |
| `Hospital` | `hospitals` | `id uuid PK`, `name`, `type`, `staff`, `beds`, `manager` |
| `Administration` | `administrations` | `id uuid PK`, `name`, `staff`, `units`, `manager` |
| `DiwanDept` | `diwan_departments` | `id uuid PK`, `name`, `icon`, `head`, `type`, `staff` |
| `DiwanWfItem` | `diwan_workforce` | `id uuid PK`, `label`, `icon`, `count`, `color` |
| `WfItem` | `workforce_categories` | `id uuid PK` (إضافة لاحقًا), `label`, `directorate`, `administration`, `hospital`, `icon`, `color` |
| `ChangeLogEntry` | `audit_log` | `id uuid PK`, `actor_id`, `action`, `entity_id`, `created_at`, `details` |

احفظ `id` بدل الفهرس كمرجع في العلاقات والمصادقة. الأرقام المشتقة لا تُخزن مرتين دون سبب؛ راجع مثلًا الفرق بين مجموع `staff` وأرقام التخصصات قبل تقرير مصدر الحقيقة. راجع قيود الأعداد غير السالبة وحقول `NOT NULL` وفهارس المفاتيح الأجنبية.

## الـ API المطلوبة للـ Repository

- `GET /api/dashboard-data` يعيد `AppDataSnapshot` (أو قسّمه إلى endpoints مع pagination إذا كبرت البيانات).
- `PATCH /api/hospitals/:id` و`PATCH /api/administrations/:id`.
- `PUT /api/diwan` لتعديل الأقسام وتوزيع الكوادر كعملية واحدة transaction.
- `POST /api/diwan/departments` و`DELETE /api/diwan/departments/:id`.
- أحداث التدقيق يجب أن يكتبها الخادم بهوية المستخدم الحقيقية وبنفس transaction التعديل، لا من المتصفح.

يمكن لاحقًا تقسيم `AppDataRepository` إلى repositories أصغر لكل مجال، مع تحميل تدريجي بدل snapshot واحد. لا تضع connection string أو credentials في Vite/React.

## المرحلة التالية قبل الإنتاج

- نمذجة `administration_units`, `hospital_units`, `occupancy`, `workforce_specializations` بدرجاتها وأعدادها بدل القيم المولّدة والمحلية حاليًا، ثم توصيل الحفظ الفعلي لها.
- حسم ما إذا كانت بيانات المدير والمستشفى/الإدارة وحجم الكوادر الرسمية تأتي من نظام خارجي أو من التحرير اليدوي.
- نقل المستخدمين والأدوار إلى جداول خادم، كلمات مرور مجزأة، sessions/صلاحيات، والتحقق من مدخلات كل طلب.
- ترحيل البيانات التجريبية بعد مراجعتها، واختبارات تكامل لقواعد الصلاحيات والـ transactions وإعادة تحميل الصفحة.
