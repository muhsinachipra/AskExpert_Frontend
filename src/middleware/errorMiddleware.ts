// frontend\src\middleware\errorMiddleware.ts

import { Middleware } from "@reduxjs/toolkit";

interface ActionWithPayload {
    payload?: {
        status: number;
    };
    type: string;
}

const isActionWithPayload = (action: unknown): action is ActionWithPayload => {
    return typeof action === 'object' && action !== null && 'type' in action;
};

const errorMiddleware: Middleware = () => next => (action) => {
    if (isActionWithPayload(action) && action.type.endsWith('/rejected') && action.payload?.status === 500) {
        // redirect to 500 page
        if (window.location.pathname !== '/server-error') {
            window.location.href = '/server-error';
        }
        // Global handling for 500 errors
        console.error('Global 500 Error:', action);
        // You can show a global error notification or handle it in a centralized way
    }
    return next(action);
};

export default errorMiddleware;