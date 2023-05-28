export function setCookie(name: string, value: string | null, age?: number) {
    if (value === null) {
        return document.cookie = `${name}=${'value'}; path=/; max-age=${age}`
    } if (name === 'token') {
        let authToken;
        authToken = value.split('Bearer ')[1];
        document.cookie = `${name}=${authToken}; path=/`
    } if (name === 'refToken') {
        document.cookie = `${name}=${value}; path=/`
    }
}

export function getCookie(name: string): string {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]): '';
}

export function deleteCookie(name: string) {
    setCookie(name, null, -1);
}