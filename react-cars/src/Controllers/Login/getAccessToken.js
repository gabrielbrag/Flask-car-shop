function getAccessToken() {
    const accessToken = sessionStorage.getItem('access_token');
    
    if (!accessToken) {
        return ''
    }
    
    return accessToken;
}

export default getAccessToken;