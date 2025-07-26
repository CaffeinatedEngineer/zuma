/**
 * Simple in-memory rate limiter for API calls
 */
class RateLimiter {
  private calls: Map<string, number[]> = new Map();
  
  canMakeRequest(key: string, maxCalls: number, windowMs: number): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!this.calls.has(key)) {
      this.calls.set(key, []);
    }
    
    const callTimes = this.calls.get(key)!;
    
    // Remove old calls outside the window
    const recentCalls = callTimes.filter(time => time > windowStart);
    this.calls.set(key, recentCalls);
    
    return recentCalls.length < maxCalls;
  }
  
  recordCall(key: string): void {
    const now = Date.now();
    if (!this.calls.has(key)) {
      this.calls.set(key, []);
    }
    this.calls.get(key)!.push(now);
  }
  
  getNextAvailableTime(key: string, maxCalls: number, windowMs: number): number {
    if (!this.calls.has(key)) {
      return 0;
    }
    
    const callTimes = this.calls.get(key)!;
    if (callTimes.length < maxCalls) {
      return 0;
    }
    
    const oldestCall = callTimes[callTimes.length - maxCalls];
    return oldestCall + windowMs;
  }
}

// Global rate limiter instance
export const rateLimiter = new RateLimiter();

// Rate limit configurations
export const RATE_LIMITS = {
  GEMINI_FREE: {
    maxCalls: 15, // Conservative limit
    windowMs: 60 * 1000, // 1 minute
  },
  OPENAI_FREE: {
    maxCalls: 3, // Very conservative for free tier
    windowMs: 60 * 1000, // 1 minute
  },
};
