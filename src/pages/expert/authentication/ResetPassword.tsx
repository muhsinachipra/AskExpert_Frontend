// frontend\src\pages\expert\ResetPassword.tsx

import { useEffect, useState } from "react";
import { useExpertResetPasswordMutation, useExpertValidateAccesssTokenMutation } from "../../../slices/api/expertApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ResetPasswordComponent from "../../../components/ResetPassword";

export default function ResetPassword() {
    const [userId, setUserId] = useState<string>("");
    const [resetPassword] = useExpertResetPasswordMutation();
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const [validateToken] = useExpertValidateAccesssTokenMutation();

    useEffect(() => {
        const fetchTokenValidation = async () => {
            if (params.token) {
                try {
                    const response = await validateToken({ token: params.token }).unwrap();
                    if (response.success) {
                        setUserId(response.expert);
                    } else {
                        toast.error(response.message);
                        navigate('/expert/login');
                    }
                } catch (error) {
                    toast.error('Token validation failed');
                    navigate('/expert/login');
                }
            }
        };

        fetchTokenValidation();
    }, [dispatch, navigate, params.token, validateToken]);

    async function handleResetPassword(userId: string, newPassword: string) {
        try {
            const response = await resetPassword({ id: userId, password: newPassword }).unwrap();
            if (response.success) {
                toast.success('Password reset successful!');
                navigate('/expert/login');
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Failed to reset password');
        }
    }

    return (
        <ResetPasswordComponent
            userId={userId}
            handleResetPassword={handleResetPassword}
        />
    );
}
