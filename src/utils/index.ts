// Utility functions
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US').format(date);
};

export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Calculate reading time based on content
 * Average reading speed: 200-250 words per minute
 * We use 225 words per minute as a middle ground
 */
export const calculateReadTime = (content: string): string => {
  if (!content) return '1 min read';
  
  // Strip HTML tags
  const textContent = content.replace(/<[^>]*>/g, ' ');
  
  // Count words (split by whitespace and filter empty strings)
  const words = textContent.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  
  // Calculate minutes (225 words per minute)
  const minutes = Math.ceil(wordCount / 225);
  
  // Return formatted string
  if (minutes < 1) return '1 min read';
  return `${minutes} min read`;
};
