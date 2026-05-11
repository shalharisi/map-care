# 🤖 AI Assistant Integration Guide - MAP Care

دليل شامل لتثبيت ودمج المساعد الذكي في تطبيق MAP Care

## 📋 المحتويات

1. [المتطلبات](#المتطلبات)
2. [خطوات التثبيت](#خطوات-التثبيت)
3. [الإعدادات](#الإعدادات)
4. [الاستخدام](#الاستخدام)
5. [استكشاف الأخطاء](#استكشاف-الأخطاء)

---

## ✅ المتطلبات

- Node.js 18+ مثبت
- npm أو pnpm
- حساب Anthropic (للحصول على API Key)
- React 18+ و TypeScript

---

## 🚀 خطوات التثبيت

### الخطوة 1: تثبيت المكتبات المطلوبة

```bash
# استخدام npm
npm install @anthropic-ai/sdk

# أو استخدام pnpm
pnpm add @anthropic-ai/sdk
```

### الخطوة 2: إعداد متغيرات البيئة

1. انسخ الملف `.env.local.example` إلى `.env.local`

```bash
cp .env.local.example .env.local
```

2. احصل على API Key من Anthropic:
   - اذهب إلى: https://console.anthropic.com
   - سجل دخول أو أنشئ حساب
   - انسخ API Key الخاص بك
   - الصقه في `.env.local`:

```env
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

### الخطوة 3: دمج المساعد في التطبيق

افتح ملف `src/app/layout.tsx` أو `src/main.tsx` وأضف:

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

### الخطوة 4: التحقق من التثبيت

```bash
# ابدأ تطبيق التطوير
pnpm dev

# افتح المتصفح على: http://localhost:3000
# يجب أن تظهر أيقونة زرقاء في أسفل يمين الشاشة
```

---

## ⚙️ الإعدادات

### تخصيص الرسائل الأولية

عدّل `src/components/AIAssistant/AIAssistantContext.tsx`:

```tsx
const [messages, setMessages] = useState<Message[]>([
  {
    id: '1',
    role: 'assistant',
    content: 'مرحباً! كيف يمكنني مساعدتك؟',
    timestamp: new Date(),
  },
]);
```

### تعطيل المساعد في صفحات معينة

```tsx
import { useAIAssistant } from '@/components/AIAssistant';

export default function SpecificPage() {
  const { closeChat } = useAIAssistant();

  useEffect(() => {
    closeChat();
  }, []);

  return <div>محتوى الصفحة</div>;
}
```

### تخصيص نمط الواجهة

عدّل الألوان في `src/components/AIAssistant/AIAssistantChat.tsx`:

```tsx
// غير البيئة اللونية
className="bg-gradient-to-r from-purple-600 to-blue-700"
```

---

## 💡 الاستخدام

### استدعاء المساعد برمجياً

```tsx
import { useAIAssistant } from '@/components/AIAssistant';

export default function MyComponent() {
  const { sendMessage, toggleChat } = useAIAssistant();

  const handleError = async (error: Error) => {
    // افتح المساعد تلقائياً
    toggleChat();
    
    // أرسل رسالة عن الخطأ
    await sendMessage(`حدث خطأ: ${error.message}`);
  };

  return (
    <button onClick={() => handleError(new Error('Test error'))}>
      اختبر المساعد
    </button>
  );
}
```

### تحليل الأخطاء تلقائياً

```tsx
import { analyzeError } from '@/lib/aiAssistantApi';

try {
  // كود قد يسبب خطأ
} catch (error) {
  if (error instanceof Error) {
    const analysis = await analyzeError(
      error.message,
      error.stack,
      'nurse' // دور المستخدم
    );
    console.log(analysis.response);
  }
}
```

### الحصول على اقتراحات

```tsx
import { getFeatureSuggestion } from '@/lib/aiAssistantApi';

const suggestions = await getFeatureSuggestion('تحسين لوحة التحكم');
console.log(suggestions.response);
```

---

## 🔍 استكشاف الأخطاء

### المشكلة: "API Key غير صحيح"

**الحل:**
1. تحقق من ملف `.env.local`
2. تأكد من نسخ API Key كاملاً بدون مسافات
3. أعد تشغيل السيرفر

```bash
# أعد تشغيل التطبيق
pnpm dev
```

### المشكلة: "المساعد لا يستجيب"

**الحل:**
1. تحقق من الاتصال بالإنترنت
2. تحقق من حالة API على: https://status.anthropic.com
3. راجع logs في المتصفح (F12)

```javascript
// في console المتصفح
console.log('حالة المساعد:', localStorage.getItem('aiAssistantStatus'));
```

### المشكلة: "الخطوط العربية لا تظهر"

**الحل:**
```css
/* أضف في tailwind.config.js */
theme: {
  fontFamily: {
    'sans': ['Cairo', 'Arabic Typesetting', 'sans-serif'],
  }
}
```

---

## 📊 هيكل الملفات

```
src/
├── components/
│   └── AIAssistant/
│       ├── AIAssistantContext.tsx  (إدارة الحالة)
│       ├── AIAssistantChat.tsx     (الواجهة)
│       └── index.ts                (التصدير)
├── lib/
│   └── aiAssistantApi.ts           (خدمات API)
└── app/
    └── api/
        └── ai-assistant/
            └── route.ts            (API endpoint)
```

---

## 🔒 الأمان والخصوصية

✅ لا يتم حفظ السجلات على السيرفر  
✅ الرسائل محفوظة محلياً فقط  
✅ API Key محمي في متغيرات البيئة  
✅ لا يتم إرسال بيانات حساسة للـ AI  

---

## 📞 الدعم والمساعدة

### روابط مفيدة

- [توثيق Anthropic](https://docs.anthropic.com)
- [Claude API Reference](https://docs.anthropic.com/reference)
- [مشاكل شائعة](https://docs.anthropic.com/troubleshooting)

### التواصل

للمساعدة والدعم:
- 📧 البريد الإلكتروني: support@mapcare.com
- 💬 Slack: #ai-assistant
- 🐛 GitHub Issues: [MAP Care Issues](https://github.com/shalharisi/map-care/issues)

---

## 🎯 الخطوات التالية

بعد التثبيت الناجح:

1. ✅ اختبر المساعد في جميع الصفحات
2. ✅ خصص الرسائل والألوان
3. ✅ أضف تحليل أخطاء مخصص
4. ✅ اطلب من المستخدمين الملاحظات

---

**تاريخ الإنشاء:** 2026-05-11  
**آخر تحديث:** 2026-05-11  
**الإصدار:** 1.0.0
