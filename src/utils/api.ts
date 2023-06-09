import { getCookie, setCookie } from "./cookie"

export const config = {
    baseUrl: 'https://norma.nomoreparties.space/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
    }
}

const refreshToken = (token: string) => {
    return fetch(`${config.baseUrl}/auth/token`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            "token": `${token}`,
        })
    })
}

export const request = <T>(url: RequestInfo, options: RequestInit): Promise<T> => {
    return fetch(url, options).then(res => checkResponse(res))
}

const checkResponse = <T>(res: Response): Promise<T> => {
    if (res.ok) {
        return res.json()
    }

    return res.json().then((res: Response) => Promise.reject(res));
}

type TRefreshData = {
    success: boolean,
    accessToken: string,
    refreshToken: string
}

export const fetchWithRefresh = async <T>(url: RequestInfo, options: RequestInit): Promise<T> => {
    try {
        const res = await fetch(url, options)
        return await checkResponse(res)
    } catch (err) {
        if ((err as { message: string }).message === 'jwt expired') {
            let refToken: string = getCookie('refToken')
            const refreshData = await refreshToken(refToken);
            await checkResponse<TRefreshData>(refreshData)
                .then((refreshData) => {
                    (options.headers as {Authorization: string}).Authorization = refreshData.accessToken;
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

