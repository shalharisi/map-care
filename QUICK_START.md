# ⚡ Quick Start - البدء السريع

**الوقت المتوقع: 5 دقائق فقط ⏱️**

---

## 🎯 في 5 خطوات بسيطة

### ✅ الخطوة 1: التثبيت (1 دقيقة)

```bash
npm install @anthropic-ai/sdk
```

### ✅ الخطوة 2: متغيرات البيئة (1 دقيقة)

```bash
# انسخ الملف
cp .env.local.example .env.local

# أضف المفتاح في .env.local
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

> احصل على المفتاح من: https://console.anthropic.com

### ✅ الخطوة 3: دمج المساعد (2 دقيقة)

افتح `src/app/layout.tsx` وأضف:

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

### ✅ الخطوة 4: تشغيل التطبيق (1 دقيقة)

```bash
pnpm dev
```

### ✅ الخطوة 5: اختبار 🎉

- افتح المتصفح: http://localhost:3000
- ابحث عن الأيقونة الزرقاء في أسفل يمين الشاشة
- اكتب رسالة واختبر!

---

## 📱 الآن المساعد متاح في جميع الصفحات!

---

## 🚀 الاستخدام المتقدم (اختياري)

### استدعاء برمجياً

```tsx
import { useAIAssistant } from '@/components/AIAssistant';

export default function MyPage() {
  const { sendMessage, toggleChat } = useAIAssistant();

  return (
    <button onClick={async () => {
      toggleChat();
      await sendMessage('مرحباً!');
    }}>
      اطلب مساعدة
    </button>
  );
}
```

### تحليل الأخطاء

```tsx
import { analyzeError } from '@/lib/aiAssistantApi';

try {
  // كود قد يفشل
} catch (error) {
  if (error instanceof Error) {
    const { response } = await analyzeError(error.message, error.stack);
    console.log(response);
  }
}
```

---

## ❓ المشاكل الشائعة والحلول

### ❌ "API Key not found"
```bash
# تحقق من .env.local
cat .env.local

# أعد التشغيل
pnpm dev
```

### ❌ "المساعد لا يظهر"
```bash
# تأكد من التثبيت الصحيح
npm list @anthropic-ai/sdk

# امسح cache
rm -rf .next && pnpm dev
```

### ❌ "خطأ في الاتصال"
- تحقق من الإنترنت
- أعد تشغيل السيرفر
- تحقق من حالة API: https://status.anthropic.com

---

## 📖 المزيد من المعلومات

| المرجع | الملف |
|-------|--------|
| **دليل شامل** | [AI_ASSISTANT_README.md](./AI_ASSISTANT_README.md) |
| **خطوات التثبيت** | [AI_ASSISTANT_SETUP.md](./AI_ASSISTANT_SETUP.md) |
| **ملخص المشروع** | [PROJECT_COMPLETION_SUMMARY.md](./PROJECT_COMPLETION_SUMMARY.md) |

---

## ✨ ماذا بعد؟

- ✅ جرب المساعد في صفحات مختلفة
- ✅ خصص الألوان والرسائل (انظر README)
- ✅ اقرأ التوثيق الكاملة للمزيد من الميزات

---

**تم! المساعد الذكي جاهز الآن! 🚀**

**شكراً لاستخدامك MAP Care AI Assistant**
