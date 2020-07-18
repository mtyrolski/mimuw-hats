const API = process.env.REACT_APP_API_URL as string;

function getJWT(cookies = document.cookie) {
    const cookiesObj = Object.fromEntries(cookies.split('; ').map(c => {
        const [key, ...v] = c.split('=');
        return [key, v.join('=')];
    }));
    return cookiesObj.jwt;
};

export function apiFetch(endpoint: RequestInfo, config: RequestInit = {}) {
    return fetch(`${API}/${endpoint}`, config);
}

export function apiFetchAuth(logout: boolean, endpoint: RequestInfo, {body, ...customConfig}: RequestInit = {}) {
    const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${getJWT()}`
    };

    const config: RequestInit = {
        ...customConfig,
        credentials: 'include',
        headers: {
            ...headers,
            ...customConfig.headers,
        },
        body: body
    };

    return fetch(`${API}/${endpoint}`, config)
        .then(async response => {
            if (response.status === 401) {
                if (logout) logOut();
            }

            return response;
        });
}

export function logIn() {
    window.open(`${API}/user/google`, "_self");
}

export function logOut() {
    window.open(`${API}/user/logout`, "_self");
}
