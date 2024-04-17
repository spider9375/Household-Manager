import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const loggedInGuardFn: CanActivateFn = () => {
    if (inject(AuthService).isLoggedIn()) {
        return true;
    }


    return inject(Router).navigate(["auth"]);
}
