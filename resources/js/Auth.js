import axios from 'axios';
import { clearIntended } from './IntendedUrl.js';
import { loadTheme } from './ThemePalette';

class Auth {
    constructor () {
        this.token = window.localStorage.getItem('token');
        let userData = window.localStorage.getItem('user');
        this.user = userData ? JSON.parse(userData) : null;

        if (this.token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
        }
    }

    login (token, user) {
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        this.token = token;
        this.user = user;

        if (user.seller && user.seller.module_id) {
            window.localStorage.setItem('active_module_id', user.seller.module_id);
            axios.defaults.headers.common['X-Module-Id'] = user.seller.module_id;
        }

        window.UserPermissions = JSON.stringify(user.allPermissions); //Fix Login Issue for Permission
        window.Role = user.role.name; //Fix Login Issue for Permission

        // The theme was painted on the login page, before the user's module was known (a seller's
        // module is seeded just above). Repaint with the right palette now, not only after a refresh.
        loadTheme(window.baseUrl);
        this.validate();
    }

    check () {
        return !! this.token;
    }

    logout () {
        let role_id = this.user.role_id;
        //return;
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('loginCheck');
        window.localStorage.removeItem('active_module_id');
        clearIntended(); // a deliberate logout should not bounce back to the last page

        if (role_id === 3) {
            window.location.replace('/seller/login');
        } else if (role_id === 4) {
            window.location.replace('/delivery_boy/login');
        } else {
            window.location.replace('login');
        }
        this.user = null;
    }

    validate(currentRoute=null){
        var currentPathName = window.location.pathname;
        if(currentRoute) {
            currentPathName = currentRoute;
        }
        var ignoreRoutes = ["/purchase_code","/login","/seller/login","/delivery_boy/login","/seller/register","/delivery_boy/register","/forgot-password"];
        
        if(!purchase_code && !ignoreRoutes.includes(currentPathName)){
            window.location.href = '/purchase_code';
            /*axios.get('api/validate').then((res) => {
                console.log("validate res : ",res);
                if(res.data && res.data.status===1){
                    window.location.href = '/purchase_code';
                    console.log("Redirect --> purchase_code");
                }
            });*/
        }
        
        
    }
}
export default new Auth();
