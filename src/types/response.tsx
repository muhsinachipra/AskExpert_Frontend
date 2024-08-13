// frontend\src\types\response.tsx

import { IAdmin, IAppointment, IExpert, IReview, IUser, IReport, IConversation, IMessage } from "./domain";

export interface GetConversationResponse {
    newConversation: IConversation[];
}

export interface GetMessageResponse {
    message: IMessage[];
}

export interface GetFileUrlResponse {
    url: string;
}

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
    total?: number;
    status?: number;
}

export interface GetSingleAppointmentDataResponse {
    success: boolean;
    data: IAppointment;
    message: string;
    status?: number;
}

export interface GetAppointmentsCountResponse {
    success: boolean;
    data: number;
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

export interface GetReviewDataResponse {
    success: boolean;
    data: IReview[];
    total: number;
    message: string;
}

export interface GetReportDataResponse {
    success: boolean;
    data: IReport[];
    total: number;
    message: string;
}

export interface GetDashboardDataResponse {
    response: {
        userData: {
            totalUsers: number;
            activeUsers: number;
            blockedUsers: number;
        };
        expertData: {
            totalExperts: number;
            verifiedExperts: number;
            blockedExperts: number;
        };
        appointmentData: {
            totalAppointments: number;
            upcomingAppointments: number;
            completedAppointments: number;
        };
        reportData: {
            totalReports: number;
        };
        status: number;
    };
}


export interface GetExpertsByCategoryDataResponse {
    response: {
        data: [
            {
                _id: string;
                count: number;
            }
        ];
        status: number;
    };
}

export interface GetUserCountDataResponse {
    response: {
        data: {
            yearlyData: [
                {
                    _id: {
                        year: number;
                    };
                    count: number;
                }
            ];
            monthlyData: [
                {
                    _id: {
                        year: number;
                        month: number;
                    };
                    count: number;
                }
            ];
            weeklyData: [
                {
                    _id: {
                        year: number;
                        week: number;
                    };
                    count: number;
                }
            ];
        };
        status: number;
    };
}
