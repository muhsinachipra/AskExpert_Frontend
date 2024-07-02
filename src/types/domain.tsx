// frontend\src\types\domain.tsx

export interface IExpert {
    _id: string;
    name: string;
    email: string;
    password: string;
    category: string;
    experience: number;
    profilePic: string;
    resume: string;
    rate: number;
    rating: number;
    wallet: number;
    isVerified: boolean;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ICategory {
    _id: string;
    categoryImage: string;
    categoryName: string;
    categoryDescription: string;
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// export interface ISchedule {
//     _id: string;
//     time: string;
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
// }


export interface IAppointment {
    _id: string;
    expertId: string;
    time: string;
    price: number;
    paymentStatus: string;
    paymentId: string;
    appointmentStatus: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
