const baseurl = "https://postra-backend.onrender.com/api";
export const createUserUrl = `${baseurl}/users/register`;
export const loginUrl = `${baseurl}/users/login`;
export const getUserUrl = (username: string): string => `${baseurl}/users/profile/${username}`;
export const getUserPostsUrl = (username: string, page: number, size: number) => `${baseurl}/posts/user/${username}?page=${page}&size=${size}`;
export const publishPostUrl = `${baseurl}/posts/create`;
export const updatePostUrl = (slug: string) => `${baseurl}/posts/update/${slug}`;
export const deletePostUrl = (slug: string) => `${baseurl}/posts/delete/${slug}`;
export const uploadUrl = `${baseurl}/upload`;
export const deleteUrl = (publicId: string) => `${baseurl}/delete?publicId=${publicId}`;
export const getPosts = (page: number, size: number) => `${baseurl}/posts/?page=${page}&size=${size}`;
export const truncate = (text: string, maxLenght: number) => text.length > maxLenght ? text.slice(0, maxLenght) + "..." : text;
export const getApost = (username: string, slug: string) => `${baseurl}/posts/${username}/${slug}`;
export const likeUrl = (slug: string) => `${baseurl}/like/${slug}`;
export const addCommentUrl = (postSlug: string) => `${baseurl}/comments/add/${postSlug}`;
export const getCommentsUrl = (postSlug: string) => `${baseurl}/comments/${postSlug}`
export const followUrl = (targetUsername: string) => `${baseurl}/follow/${targetUsername}`;
export const checkFollowUrl = (targetUsername: string) => `${baseurl}/follow/is-following/${targetUsername}`;
export const signUrl = () => `${baseurl}/sign`;
export const updateUserUrl = () => `${baseurl}/users/profile`;
export const logoutUrl = () => `${baseurl}/users/logout`
export const frontendBaseUrl = "http://localhost:3000";

export const getRelativeTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSecs = Math.round((date.getTime() - now.getTime()) / 1000);
    const formatter = new Intl.RelativeTimeFormat('en', { numeric: "auto" });
    if (Math.abs(diffInSecs) < 60) return formatter.format(diffInSecs, 'second');
    if (Math.abs(diffInSecs) < 3600) return formatter.format(Math.round(diffInSecs / 60), 'minute');
    if (Math.abs(diffInSecs) < 86400) return formatter.format(Math.round(diffInSecs / 3600), 'hour');
    return formatter.format(Math.round(diffInSecs / 86400), 'day');
}