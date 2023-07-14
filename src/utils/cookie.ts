function isJSON(input: string){
    try {
        JSON.parse(input)
        return true
    }
    catch (error) {
        return false
    }
}

export function setCookie(name: string, data: string, timeLimit: string){

    if(document === undefined) return alert("Document is not defined")

    const timeDef = timeLimit[timeLimit.length-1]
    let timeMultiplier = 1000

    switch(timeDef){
        case "m":
            timeMultiplier *= 60
            break
        case "h":
            timeMultiplier *= (60 * 60)
            break
        case "d":
            timeMultiplier *= (60 * 60 * 24)
            break
        default:
            timeMultiplier *= 60
    }

    const timeString = timeLimit.match(/\d/gi)

    if(!timeString) return alert("Please provide a valid time for the cookie expiry")

    const time = parseInt(timeString[0]) * timeMultiplier

    document.cookie = `${name}=${data}; expires=${time}`
}

export function getCookie<T = string>(name: string): T | string {
    if(document === undefined) {
        alert("Document is undefined")
        return ""
    } 

    const regExp = new RegExp(`${name}=([^;]+)`, "gi")
    const resultArray = document.cookie.match(regExp)

    if(!resultArray) return ""

    const result = resultArray[0].split("=")[1]

    if(isJSON(result)) return JSON.parse(result)
    else return result
}

export function deleteCookie(name: string){
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`
}
