import { getCookie, setCookie } from "./cookie"

export const config = {
    baseUrl: 'https://norma.nomoreparties.space/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
    }
}

const refreshToken = (token) => {
    return fetch(`${config.baseUrl}/auth/token`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            "token": `${token}`,
        })
    })
}

export const request = (url, options) => {
    return fetch(url, options).then(res => checkResponse(res))
}

const checkResponse = (res) => {
    if (res.ok) {
        return res.json()
    }

    return res.json().then((res) => Promise.reject(res));
}

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options)
        return await checkResponse(res)
    } catch (err) {
        if (err.message === 'jwt expired' || err.message === 'jwt malformed') {
            const refreshData = await refreshToken(getCookie('refToken'));
            await checkResponse(refreshData)
                .then((refreshData) => {
                    options.headers.Authorization = refreshData.accessToken
                    setCookie('token', refreshData.accessToken);
                    setCookie('refToken', refreshData.refreshToken)
                })
            const res = await fetch(url, options)
            return await checkResponse(res)
        } else {
            return Promise.reject(err);
        }
    }
}