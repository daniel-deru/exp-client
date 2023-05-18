export function getToken(): string | null{
    const token = document.cookie.match(/(?<=exp-jwt-token=)[a-zA-Z0-9\._]*/gi)
    return token ? token[0] : null
}

export function setToken(token: string): void {
    document.cookie = `exp-jwt-token=${token}; expires=${15 * 60 * 1000}` // Expires in 15 minutes
}