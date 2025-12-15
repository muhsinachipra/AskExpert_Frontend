// frontend\src\hooks\useInvalidateAppointments.tsx

import { useDispatch } from 'react-redux';
import { apiSlice } from '../slices/api/apiSlice';

const useInvalidateAppointments = () => {
    const dispatch = useDispatch();

    const invalidateAppointments = () => {
        dispatch(apiSlice.util.invalidateTags(['Appointment']));
    };

    return invalidateAppointments;
};

export default useInvalidateAppointments;
