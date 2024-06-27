// frontend\src\middleware\redirectMiddleware.ts

import { Middleware } from '@reduxjs/toolkit';
import { userLogout } from '../slices/authSlice';
import { toast } from 'react-toastify';

interface ActionWithPayload {
    payload?: {
        data?: {
            message?: string;
        };
    };
    type: string;
}

const isActionWithPayload = (action: unknown): action is ActionWithPayload => {
    return typeof action === 'object' && action !== null && 'type' in action;
};

const redirectMiddleware: Middleware = store => next => action => {
    console.log('inside redirectMiddleware')
    if (isActionWithPayload(action) && action.type.endsWith('/rejected')) {
        const { data } = action.payload || {};
        console.log('inside redirectMiddleware data : ', data)
        if (data && data.message === "Not authorized, user is blocked") {
            store.dispatch(userLogout());
            toast.error('You are Blocked, Please contact the admin');
        }
    }
    console.log('inside redirectMiddleware action : ', action)
    return next(action);
};

export default redirectMiddleware;
