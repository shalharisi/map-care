import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, context = '', errorStack = '', userRole = 'user' } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Build the prompt with context
    const systemPrompt = `أنت مساعد ذكي متخصص في منصة MAP Care لرعاية الأمومة والأبوة.
دورك هو:
1. تحليل الأخطاء التقنية وتقديم حلول واضحة
2. الإجابة على أسئلة المستخدمين حول الميزات
3. تقديم نصائح وتحسينات
4. دعم اللغة العربية بشكل كامل

قواعد الإجابة:
- أجب بشكل مختصر وواضح
- استخدم العربية دائماً
- إذا كان هناك خطأ، اشرح السبب والحل
- كن ودياً ومفيداً`;

    const userPrompt = `السياق: ${context}
${errorStack ? `تفاصيل الخطأ:\n${errorStack}` : ''}

السؤال/الطلب: ${message}

يرجى تقديم إجابة مفيدة وواضحة.`;

    // Call Claude API
    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    // Extract the text response
    const textContent = response.content.find((block) => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from AI');
    }

    return NextResponse.json({
      response: textContent.text,
      timestamp: new Date().toISOString(),
      model: 'claude-3-5-sonnet',
    });
  } catch (error) {
    console.error('AI Assistant API Error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'حدث خطأ غير متوقع';

    return NextResponse.json(
      {
        error: errorMessage,
        response: `معذرة، حدث خطأ في معالجة طلبك: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
