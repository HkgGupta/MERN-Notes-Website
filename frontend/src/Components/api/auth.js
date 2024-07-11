let myToken = '';

// Encode a string using Base64
function encodeBase64(text) {
    return btoa(text);
}

// Decode a Base64-encoded string
function decodeBase64(encodedText) {
    try {
        return atob(encodedText);
    } catch (error) {
        console.error('Decoding Error:', error);
        throw error;
    }
}

function setToken(token) {
    // encode token
    myToken = encodeBase64(token);
    // save encoded token to localStorage
    localStorage.setItem('user', myToken);
}

function getToken() {
    // get encoded token from localStorage
    const encodedToken = localStorage.getItem('user');
    if (!encodedToken) {
        return null;
    }

    const decodedToken = decodeBase64(encodedToken);

    // Split the token to access the payload
    const tokenParts = decodedToken.split('.');
    if (tokenParts.length !== 3) {
        console.error('Invalid token format');
        localStorage.removeItem('user');
        return null;
    }

    const payloadBase64 = tokenParts[1];
    const payload = JSON.parse(decodeBase64(payloadBase64));

    // Check if the token has an expiration date
    if (payload.exp) {
        const currentTimestamp = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds

        // Compare the expiration timestamp with the current timestamp
        if (payload.exp < currentTimestamp) {
            // Token is expired, remove it from localStorage
            localStorage.removeItem('user');
            console.log("Token expired");
            return null;
        }
    }

    return decodedToken;
}

export { setToken, getToken };
