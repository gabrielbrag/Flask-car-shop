import getAccessToken from "./getAccessToken";

async function fetchWithToken(requestUrl, method, body) {
    const token = getAccessToken();
    const response = await fetch(requestUrl, {
        method: method,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: body,
    }).catch(error => {
        console.error('Fetch error:', error);
        throw error;
    });
    
    if (response.status === 401 || response.status === 403 || response.status === 422) {
        window.location.href = '/admin/login';  
        return null;
    }

    return response;
}

export default fetchWithToken;