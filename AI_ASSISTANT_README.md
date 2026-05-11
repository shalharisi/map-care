# 🤖 MAP Care - AI Assistant Module

مساعد ذكي متكامل لتطبيق MAP Care يساعدك في تحليل الأخطاء واقتراح الحلول في جميع صفحات التطبيق.

## ✨ المميزات

- ✅ **متوفر في جميع الصفحات** - Widget منفصل قابل للتوسع
- ✅ **تحليل ذكي للأخطاء** - يقدم حلول فورية
- ✅ **محادثة طبيعية** - يفهم العربية بشكل كامل
- ✅ **سهل التكامل** - بضع أسطر فقط
- ✅ **آمن تماماً** - لا يتم حفظ البيانات الحساسة
- ✅ **واجهة جميلة** - Tailwind CSS مع تصميم عصري
- ✅ **استجابي** - يعمل على جميع الأجهزة

## 📦 ما يتم توفيره

```
src/components/AIAssistant/
├── AIAssistantContext.tsx  # إدارة الحالة العامة
├── AIAssistantChat.tsx     # مكون الواجهة الرئيسي
└── index.ts               # تصدير المكونات

src/lib/
└── aiAssistantApi.ts      # خدمات API

src/app/api/
└── ai-assistant/
    └── route.ts           # Backend endpoint

📄 ملفات التوثيق:
├── AI_ASSISTANT_SETUP.md  # دليل التثبيت الشامل
├── .env.local.example     # متغيرات البيئة
└── AI_ASSISTANT_README.md # هذا الملف
```

## 🚀 البدء السريع

### 1. التثبيت

```bash
# تثبيت المكتبات المطلوبة
npm install @anthropic-ai/sdk

# أو باستخدام pnpm
pnpm add @anthropic-ai/sdk
```

### 2. إعداد البيئة

```bash
# انسخ ملف المثال
cp .env.local.example .env.local
```

أضف API Key من Anthropic:
```env
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

### 3. الدمج في التطبيق

عدّل ملف `src/app/layout.tsx`:

```tsx
import { AIAssistantProvider, AIAssistantChat } from '@/components/AIAssistant';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html dir="rtl" lang="ar">
      <body>
        <AIAssistantProvider>
          {children}
          <AIAssistantChat />
        </AIAssistantProvider>
      </body>
    </html>
  );
}
```

### 4. تشغيل التطبيق

```bash
pnpm dev
```

الآن يجب أن تظهر أيقونة زرقاء في أسفل يمين الشاشة! 🎉

## 💻 الاستخدام المتقدم

### استدعاء المساعد برمجياً

```tsx
import { useAIAssistant } from '@/components/AIAssistant';

export default function MyComponent() {
  const { sendMessage, toggleChat, messages } = useAIAssistant();

  const handleError = async () => {
    toggleChat(); // افتح المساعد
    await sendMessage('أحتاج مساعدة في هذا الخطأ');
  };

  return (
    <button onClick={handleError}>
      اطلب مساعدة
    </button>
  );
}
```

### تحليل الأخطاء تلقائياً

```tsx
import { analyzeError } from '@/lib/aiAssistantApi';

try {
  // كود قد يفشل
  riskyOperation();
} catch (error) {
  if (error instanceof Error) {
    const { response, suggestions } = await analyzeError(
      error.message,
      error.stack,
      'nurse' // دور المستخدم
    );
    
    console.log('الحل المقترح:', response);
    console.log('اقتراحات إضافية:', suggestions);
  }
}
```

### الحصول على اقتراحات الميزات

```tsx
import { getFeatureSuggestion } from '@/lib/aiAssistantApi';

const { response } = await getFeatureSuggestion('تحسين نظام الإشعارات');
console.log(response);
```

### طلب المساعدة حول موضوع معين

```tsx
import { getHelp } from '@/lib/aiAssistantApi';

const { response } = await getHelp('كيفية استخدام لوحة التحكم');
console.log(response);
```

## 🎨 التخصيص

### تغيير الألوان والأنماط

عدّل `src/components/AIAssistant/AIAssistantChat.tsx`:

```tsx
// غير الألوان
className="bg-gradient-to-r from-purple-600 to-pink-600"

// غير الحجم
w-96 h-96 → w-80 h-80
```

### تخصيص الرسائل الأولية

عدّل `src/components/AIAssistant/AIAssistantContext.tsx`:

```tsx
const [messages, setMessages] = useState<Message[]>([
  {
    id: '1',
    role: 'assistant',
    content: 'مرحباً! أنا هنا لمساعدتك على ... 👋',
    timestamp: new Date(),
  },
]);
```

### تعطيل المساعد في صفحات معينة

```tsx
import { useAIAssistant } from '@/components/AIAssistant';
import { useEffect } from 'react';

export default function PrivatePage() {
  const { closeChat } = useAIAssistant();

  useEffect(() => {
    closeChat(); // أغلق المساعد عند الدخول لهذه الصفحة
  }, []);

  return <div>محتوى خاص</div>;
}
```

## 🧪 الاختبار

تم إرفاق ملف اختبارات شامل:

```bash
# تشغيل الاختبارات
pnpm test

# مع coverage
pnpm test:coverage
```

أمثلة الاختبارات:
- ✅ اختبار تهيئة الحالة
- ✅ اختبار فتح/إغلاق المساعد
- ✅ اختبار إرسال الرسائل
- ✅ اختبار معالجة الأخطاء
- ✅ اختبار تحميل البيانات

## 🔍 البنية المعمارية

```
┌─────────────────────────────────────┐
│  User Interface (AIAssistantChat)   │
│  - عرض الرسائل                      │
│  - استقبال المدخلات                │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  Context State Management           │
│  - إدارة الرسائل                    │
│  - إدارة حالة الفتح/الإغلاق       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  API Service (aiAssistantApi.ts)    │
│  - إرسال الطلبات                    │
│  - معالجة الردود                   │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  Backend API (/api/ai-assistant)    │
│  - معالجة الطلبات                   │
│  - استدعاء Claude API               │
└─────────────────────────────────────┘
```

## 📊 الأداء والتحسينات

### Optimization Tips

1. **استخدام useMemo**
   ```tsx
   const memoizedMessages = useMemo(() => messages, [messages]);
   ```

2. **تحسين إعادة العرض**
   ```tsx
   const ChatMessage = React.memo(({ message }) => (...));
   ```

3. **تأخير تحميل المكون**
   ```tsx
   const AIAssistant = dynamic(() => import('@/components/AIAssistant'));
   ```

## 🔒 الأمان والخصوصية

### ✅ معايير الأمان المطبقة

- **لا يتم حفظ الرسائل** - تُحفظ محلياً فقط في الجلسة
- **API Keys محمية** - تُحفظ في متغيرات البيئة
- **عدم إرسال بيانات حساسة** - تصفية البيانات الطبية
- **HTTPS فقط** - جميع الطلبات مشفرة
- **Rate limiting** - حماية من الاستخدام المفرط

### تطبيق حماية إضافية

```tsx
// تصفية البيانات الحساسة قبل الإرسال
const sanitizeMessage = (message: string) => {
  // إزالة أرقام الهاتف
  message = message.replace(/\d{10}/g, 'XXX-XXX-XXXX');
  
  // إزالة البريد الإلكتروني
  message = message.replace(/[\w\.-]+@[\w\.-]+\.\w+/g, 'email@hidden.com');
  
  return message;
};
```

## 🐛 استكشاف الأخطاء الشائعة

### المشكلة: "API Key غير صحيح"

**الحل:**
```bash
# تحقق من الملف
cat .env.local

# أعد تشغيل السيرفر
pnpm dev

# امسح الـ cache
rm -rf .next
```

### المشكلة: "المساعد لا يرد"

**الحل:**
1. تحقق من الاتصال بالإنترنت
2. راجع logs في console (F12)
3. تحقق من حالة الـ API

```javascript
// في console
fetch('/api/ai-assistant', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'اختبر' })
}).then(r => r.json()).then(console.log);
```

### المشكلة: "الخطوط العربية لا تظهر"

**الحل:**
```css
/* في globals.css */
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');

html {
  font-family: 'Cairo', sans-serif;
}
```

## 📈 الإحصائيات والمراقبة

### إضافة تتبع الأداء

```tsx
// في AIAssistantContext.tsx
const sendMessage = useCallback(async (content: string) => {
  const startTime = performance.now();
  
  // ... إرسال الرسالة
  
  const endTime = performance.now();
  console.log(`وقت الاستجابة: ${endTime - startTime}ms`);
}, []);
```

## 🚀 التحديثات القادمة

- [ ] دعم الصور والملفات
- [ ] تخزين سجل المحادثات
- [ ] تحليل المشاعر
- [ ] توصيات مخصصة
- [ ] دعم أصوات (Text-to-Speech)
- [ ] تعدد اللغات

## 📚 موارد إضافية

- [توثيق Anthropic](https://docs.anthropic.com)
- [Claude API Guide](https://docs.anthropic.com/reference)
- [React Hooks Documentation](https://react.dev/reference/react)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 💬 الدعم والتواصل

### هل واجهت مشكلة؟

1. 📖 اقرأ [دليل التثبيت](./AI_ASSISTANT_SETUP.md)
2. 🔍 ابحث في [GitHub Issues](https://github.com/shalharisi/map-care/issues)
3. 💬 اتصل بالفريق: support@mapcare.com

## 📄 الترخيص

هذا المشروع مرخص تحت MIT License.

---

**تطويره:** GitHub Copilot  
**آخر تحديث:** 2026-05-11  
**الإصدار:** 1.0.0

**صُنع بـ ❤️ لـ MAP Care**
