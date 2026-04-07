export const badResponse = (message) => {
    return {
        success : false,
        message
    }
}

export const userSuccessResonse = (message, data, tokens) => {
    return {
        success : true,
        message,
        data,
        tokens
    }
}

export const loginResponse = (message, tokens) => {
    return {
        seccess : true,
        message,
        tokens
    }
}

