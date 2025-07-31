const baseurl = "http://localhost:8080/api";
export const createUserUrl = `${baseurl}/users/register`;
export const loginUrl = `${baseurl}/users/login`;
export const getUserUrl = (username: string): string => `${baseurl}/users/profile/${username}`;

export const frontendBaseUrl = "http://localhost:3000";