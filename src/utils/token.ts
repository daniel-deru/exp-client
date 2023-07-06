export function getToken(): string | null{
    if(document !== undefined){
        const token = document.cookie.match(/(?<=exp-jwt-token=)[a-zA-Z0-9\._\-]*/gi)
        return token ? token[0] : ""
    }
    
    return ""
}

export function setToken(token: string): void {
    document.cookie = `exp-jwt-token=${token}; expires=${24 * 60 * 60 * 1000}` // Expires in 15 minutes
}