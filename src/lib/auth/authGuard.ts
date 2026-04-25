'use client';

/**
 * Authentication guard utilities for protecting routes and API calls
 * iOS-compatible with enhanced security
 */

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    // Try localStorage first (works on most devices)
    const token = localStorage.getItem('token');
    if (token) return token;
  } catch (error) {
    // iOS Safari private mode blocks localStorage
    console.warn('localStorage not available:', error);
  }
  
  // Fallback to cookies (iOS-compatible)
  try {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(c => c.trim().startsWith('token='));
    if (tokenCookie) {
      const token = tokenCookie.split('=')[1];
      // Decode URI component in case token was encoded
      return decodeURIComponent(token);
    }
  } catch (error) {
    console.error('Error reading cookies:', error);
  }
  
  return null;
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const clearAuth = (): void => {
  if (typeof window === 'undefined') return;
  
  // Clear localStorage (if available)
  try {
    localStorage.removeItem('token');
  } catch (error) {
    console.warn('Could not clear localStorage:', error);
  }
  
  // Clear cookie (iOS-compatible)
  try {
    // Set multiple cookie variations to ensure clearing
    document.cookie = 'token=; path=/; max-age=0; SameSite=Lax';
    document.cookie = 'token=; path=/; max-age=0; SameSite=Lax; Secure';
    document.cookie = 'token=; path=/; max-age=0';
  } catch (error) {
    console.error('Error clearing cookies:', error);
  }
};

export const setAuthToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  
  // Validate token format (basic JWT check)
  if (!token || token.split('.').length !== 3) {
    console.error('Invalid token format');
    return;
  }
  
  // Store in localStorage (if available)
  try {
    localStorage.setItem('token', token);
  } catch (error) {
    // iOS Safari private mode blocks localStorage
    console.warn('localStorage not available, using cookies only:', error);
  }
  
  // Store in cookie (iOS-compatible, expires in 7 days for better UX)
  try {
    // Encode token to handle special characters
    const encodedToken = encodeURIComponent(token);
    
    // Set cookie with Secure flag for HTTPS (production)
    const isProduction = window.location.protocol === 'https:';
    const secureFlag = isProduction ? '; Secure' : '';
    
    document.cookie = `token=${encodedToken}; path=/; max-age=604800; SameSite=Lax${secureFlag}`;
  } catch (error) {
    console.error('Error setting cookie:', error);
  }
};

/**
 * Validate token expiration (optional security check)
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    
    if (!exp) return false; // No expiration set
    
    // Check if token is expired (with 5 minute buffer)
    return Date.now() >= (exp * 1000) - (5 * 60 * 1000);
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true; // Assume expired if we can't parse
  }
};
