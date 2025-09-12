const baseurl = "http://localhost:8080/api";
export const createUserUrl = `${baseurl}/users/register`;
export const loginUrl = `${baseurl}/users/login`;
export const getUserUrl = (username: string): string => `${baseurl}/users/profile/${username}`;
export const publishPostUrl = `${baseurl}/posts/create`;
export const uploadUrl = `${baseurl}/upload`;
export const deleteUrl = (publicId: string) => `${baseurl}/delete?publicId=${publicId}`;
export const getPosts = (page: number, size: number) => `${baseurl}/posts/?page=${page}&size=${size}`;

export const frontendBaseUrl = "http://localhost:3000";