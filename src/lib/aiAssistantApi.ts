/**
 * AI Assistant API Service
 * Handles communication with the AI backend
 */

export interface AIRequestPayload {
  message: string;
  context?: string;
  errorStack?: string;
  userRole?: string;
}

export interface AIResponsePayload {
  response: string;
  suggestions?: string[];
  severity?: 'info' | 'warning' | 'error';
  timestamp: string;
}

/**
 * Send a message to the AI Assistant
 */
export async function sendToAIAssistant(payload: AIRequestPayload): Promise<AIResponsePayload> {
  try {
    const response = await fetch('/api/ai-assistant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data: AIResponsePayload = await response.json();
    return data;
  } catch (error) {
    console.error('AI Assistant API Error:', error);
    throw error;
  }
}

/**
 * Analyze error for the user
 */
export async function analyzeError(
  errorMessage: string,
  errorStack?: string,
  userRole?: string
): Promise<AIResponsePayload> {
  return sendToAIAssistant({
    message: `حلل هذا الخطأ وقدم حلاً: ${errorMessage}`,
    context: 'Error Analysis in MAP Care',
    errorStack,
    userRole,
  });
}

/**
 * Get suggestion for a feature
 */
export async function getFeatureSuggestion(featureName: string): Promise<AIResponsePayload> {
  return sendToAIAssistant({
    message: `أعطني اقتراحات لتحسين: ${featureName}`,
    context: 'Feature Suggestion in MAP Care',
  });
}

/**
 * Get help on a topic
 */
export async function getHelp(topic: string): Promise<AIResponsePayload> {
  return sendToAIAssistant({
    message: `أحتاج مساعدة في: ${topic}`,
    context: 'Help Request in MAP Care',
  });
}
