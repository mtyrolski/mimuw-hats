const API: string = 'http://localhost:2137';

function getJWT(cookies = document.cookie) {
    const cookiesObj = Object.fromEntries(cookies.split('; ').map(c => {
        const [key, ...v] = c.split('=');
        return [key, v.join('=')];
    }));
    return cookiesObj.jwt;
};

export function apiFetch(endpoint: RequestInfo, config: RequestInit = {}) {
    return fetch(`${API}/${endpoint}`, config)
        .then(response => response.json());
}

export function apiFetchAuth(endpoint: RequestInfo, {body, ...customConfig}: RequestInit = {}) {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getJWT()}`
    };

    const config: RequestInit = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        }
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    return fetch(`${API}/${endpoint}`, config)
        .then(async response => {
            if (response.status === 401) {
                // TODO?
                logOut();
            }

            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                return Promise.reject(data);
            }
        });
}

export function logIn() {
    window.open(`${API}/user/google`, "_self");
}

export function logOut() {
    window.open(`${API}/user/logout`, "_self");
}
