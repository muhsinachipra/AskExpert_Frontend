// frontend\src\types\domain.tsx

export interface IExpert {
    _id: string;
    name: string;
    email: string;
    category: string;
    experience: number;
    profilePic: string;
    resume: string;
    mobile: string;
    averageRating: number;
    reports: number;
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
    profilePic: string;
    isBlocked: boolean;
    wallet: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IAdmin {
    _id?: string
    email: string;
    name: string;
}

export interface IAppointment {
    _id: string;
    userId?: string;
    userName?: string;
    expertId: string;
    expertName: string;
    expertCategory: string;
    date: string;
    startTime: string;
    endTime: string;
    price: number;
    paymentStatus: string;
    paymentId: string;
    appointmentStatus: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface IConversation {
    _id: string;
    members: string[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface IMessage {
    _id: string;
    conversationId: string;
    senderId: string;
    receiverId: string;
    text: string;
    imageName?: string;
    videoName?: string;
    audioName?: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface IReview {
    _id?: string
    userId: {
        _id: string;
        name: string;
    };
    expertId: string;
    appointmentId: {
        _id: string;
        date: Date;
    };
    rating: number;
    feedback?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IReport {
    _id: string;
    userId: {
        _id: string;
        name: string;
    };
    expertId: {
        _id: string;
        name: string;
    };
    reason: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
