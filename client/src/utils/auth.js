import decode from 'jwt-decode';

class AuthService {
    getProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        this.autoLogoutOnExpire(token)
        return !!token && !this.isTokenExpired(token);
    }

    autoLogoutOnExpire(token) {
        const self = this;
        try {
            const decoded = decode(token);
            const secondsTillExpire = (decoded.exp - (Date.now() / 1000))
                //console.log(secondsTillExpire);
            setTimeout(() => {
                //console.log("LOGOUT CHECK")
                if (!self.loggedIn()) self.expireLogout();
            }, parseInt(secondsTillExpire * 1000));

        } catch (err) {
            return false;
        }
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);

        window.location.assign('/myprofile');
    }

    firstLogin(idToken, nextElement) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
        // opens page 2 of sign up
        nextElement.click();
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        // this will reload the page and reset the state of the application
        window.location.assign('/');
    }

    expireLogout() {
        // for when your token expires // otherwise just like logout
        localStorage.removeItem('id_token');
        // this will let the user know they have been logged out 
        window.location.assign('/expired');
    }
}

export default new AuthService();