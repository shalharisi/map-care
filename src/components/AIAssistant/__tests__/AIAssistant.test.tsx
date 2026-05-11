import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { AIAssistantProvider, useAIAssistant } from '@/components/AIAssistant/AIAssistantContext';

describe('AIAssistant', () => {
  // Mock fetch
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  describe('AIAssistantContext', () => {
    it('should initialize with default message', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AIAssistantProvider>{children}</AIAssistantProvider>
      );

      const { result } = renderHook(() => useAIAssistant(), { wrapper });

      expect(result.current.messages).toHaveLength(1);
      expect(result.current.messages[0].role).toBe('assistant');
      expect(result.current.messages[0].content).toContain('مرحباً');
    });

    it('should toggle chat open/closed', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AIAssistantProvider>{children}</AIAssistantProvider>
      );

      const { result } = renderHook(() => useAIAssistant(), { wrapper });

      expect(result.current.isOpen).toBe(false);

      act(() => {
        result.current.toggleChat();
      });

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.toggleChat();
      });

      expect(result.current.isOpen).toBe(false);
    });

    it('should close chat', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AIAssistantProvider>{children}</AIAssistantProvider>
      );

      const { result } = renderHook(() => useAIAssistant(), { wrapper });

      act(() => {
        result.current.toggleChat();
      });

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.closeChat();
      });

      expect(result.current.isOpen).toBe(false);
    });

    it('should clear messages', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AIAssistantProvider>{children}</AIAssistantProvider>
      );

      const { result } = renderHook(() => useAIAssistant(), { wrapper });

      // Add a message first
      act(() => {
        result.current.sendMessage('Test message');
      });

      // Clear messages
      act(() => {
        result.current.clearMessages();
      });

      expect(result.current.messages).toHaveLength(1);
      expect(result.current.messages[0].content).toContain('تم مسح');
    });

    it('should send message and receive response', async () => {
      const mockResponse = {
        response: 'هذا رد من المساعد الذكي',
        timestamp: new Date().toISOString(),
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AIAssistantProvider>{children}</AIAssistantProvider>
      );

      const { result } = renderHook(() => useAIAssistant(), { wrapper });

      const initialMessageCount = result.current.messages.length;

      act(() => {
        result.current.sendMessage('اختبر المساعد');
      });

      await waitFor(() => {
        expect(result.current.messages.length).toBeGreaterThan(initialMessageCount);
      });

      expect(result.current.messages[result.current.messages.length - 1].role).toBe(
        'assistant'
      );
      expect(result.current.messages[result.current.messages.length - 1].content).toBe(
        mockResponse.response
      );
    });

    it('should handle API errors gracefully', async () => {
      global.fetch = vi.fn().mockRejectedValueOnce(new Error('API Error'));

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AIAssistantProvider>{children}</AIAssistantProvider>
      );

      const { result } = renderHook(() => useAIAssistant(), { wrapper });

      act(() => {
        result.current.sendMessage('اختبر الخطأ');
      });

      await waitFor(() => {
        expect(result.current.error).toBeTruthy();
      });

      expect(result.current.error).toContain('API Error');
    });

    it('should set loading state during message sending', async () => {
      global.fetch = vi.fn().mockImplementationOnce(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  json: async () => ({ response: 'رد متأخر' }),
                }),
              100
            )
          )
      );

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AIAssistantProvider>{children}</AIAssistantProvider>
      );

      const { result } = renderHook(() => useAIAssistant(), { wrapper });

      expect(result.current.isLoading).toBe(false);

      act(() => {
        result.current.sendMessage('رسالة اختبار');
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });
  });

  describe('API Integration', () => {
    it('should send correct payload to API', async () => {
      const mockFetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ response: 'OK' }),
      });

      global.fetch = mockFetch;

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AIAssistantProvider>{children}</AIAssistantProvider>
      );

      const { result } = renderHook(() => useAIAssistant(), { wrapper });

      act(() => {
        result.current.sendMessage('اختبر الحمولة');
      });

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/ai-assistant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: expect.stringContaining('اختبر الحمولة'),
        });
      });
    });
  });
});
