// API client for backend communication - matches main branch implementation
const baseUrl = "https://postra-backend.onrender.com/api";

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    'Content-Type': 'application/json',
    'X-Client-Type': 'web',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

// Helper function to truncate text
export const truncate = (text: string, maxLength: number) => 
  text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

// Helper function to get relative time
export const getRelativeTime = (isoString: string) => {
  const date = new Date(isoString);
  const now = new Date();
  const diffInSecs = Math.round((date.getTime() - now.getTime()) / 1000);
  
  const formatter = new Intl.RelativeTimeFormat('en', { numeric: "auto" });
  
  if (Math.abs(diffInSecs) < 60) return formatter.format(diffInSecs, 'second');
  if (Math.abs(diffInSecs) < 3600) return formatter.format(Math.round(diffInSecs / 60), 'minute');
  if (Math.abs(diffInSecs) < 86400) return formatter.format(Math.round(diffInSecs / 3600), 'hour');
  return formatter.format(Math.round(diffInSecs / 86400), 'day');
};

// API URL builders
export const createUserUrl = `${baseUrl}/users/register`;
export const loginUrl = `${baseUrl}/users/login`;
export const logoutUrl = () => `${baseUrl}/users/logout`;
export const getUserUrl = (username: string): string => `${baseUrl}/users/profile/${username}`;
export const getUserPostsUrl = (username: string, page: number, size: number) => 
  `${baseUrl}/posts/user/${username}?page=${page}&size=${size}`;
export const publishPostUrl = `${baseUrl}/posts/create`;
export const updatePostUrl = (slug: string) => `${baseUrl}/posts/update/${slug}`;
export const deletePostUrl = (slug: string) => `${baseUrl}/posts/delete/${slug}`;
export const uploadUrl = `${baseUrl}/upload`;
export const deleteUrl = (publicId: string) => `${baseUrl}/delete?publicId=${publicId}`;
export const getPosts = (page: number, size: number) => `${baseUrl}/posts/?page=${page}&size=${size}`;
export const getApost = (username: string, slug: string) => `${baseUrl}/posts/${username}/${slug}`;
export const likeUrl = (slug: string) => `${baseUrl}/like/${slug}`;
export const addCommentUrl = (postSlug: string) => `${baseUrl}/comments/add/${postSlug}`;
export const getCommentsUrl = (postSlug: string) => `${baseUrl}/comments/${postSlug}`;
export const followUrl = (targetUsername: string) => `${baseUrl}/follow/${targetUsername}`;
export const checkFollowUrl = (targetUsername: string) => `${baseUrl}/follow/is-following/${targetUsername}`;
export const signUrl = () => `${baseUrl}/sign`;
export const updateUserUrl = () => `${baseUrl}/users/profile`;

export const frontendBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://postra-frontend.vercel.app";
