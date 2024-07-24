// frontend\src\types\response.tsx

import { IAdmin, IAppointment, IExpert, IUser } from "./domain";

export interface GetExpertDataResponse {
    success: boolean;
    data: IExpert[];
    total?: number;
    message: string;
}

export interface GetSingleExpertDataResponse {
    success: boolean;
    data: IExpert;
    message: string;
}

export interface GetSingleUserDataResponse {
    success: boolean;
    data: IUser;
    message: string;
}

export interface GetUserDataResponse {
    success: boolean;
    data: IUser[];
    total?: number;
    message: string;
}

export interface GetAdminDataResponse {
    success: boolean;
    data: IAdmin[];
    message: string;
}

export interface GetAppointmentDataResponse {
    success: boolean;
    data: IAppointment[];
    message: string;
    status?: number;
}

export interface GetUserDataForStateResponse {
    success: boolean;
    data: IUser;
    message: string;
}

export interface GetExpertDataForStateResponse {
    success: boolean;
    data: IExpert;
    message: string;
}

export interface GetAdminDataForStateResponse {
    success: boolean;
    data: IAdmin;
    message: string;
}
