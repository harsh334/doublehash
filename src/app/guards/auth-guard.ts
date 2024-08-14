import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const isUserAuthenticated = () => {
    const authService = inject(AuthService);
    return authService.isUserAuthenticated();
};
