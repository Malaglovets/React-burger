export function setCookie(name, value, age) {
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

export function getCookie(name) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
    setCookie(name, null, -1);
}