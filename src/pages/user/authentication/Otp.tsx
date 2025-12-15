// frontend\src\pages\user\Otp.tsx

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useEffect, useState } from "react";
import { useOtpVerificationMutation, useRegisterMutation, useSendOtpToEmailMutation } from "../../../slices/api/userApiSlice";
import { MyError } from "../../../validation/validationTypes";
import { clearRegister } from "../../../slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import OtpComponent from "../../../components/Otp";

export default function Otp() {
    const dispatch = useDispatch();
    const { registerInfo } = useSelector((state: RootState) => state.auth);
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const [otpVerification] = useOtpVerificationMutation();
    const [register] = useRegisterMutation();
    const [sendOtpToEmail] = useSendOtpToEmailMutation();

    const [timer, setTimer] = useState(60);
    const [showResendButton, setShowResendButton] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setShowResendButton(true);
        }

        return () => clearInterval(interval);
    }, [timer]);

    const resendOtpHandler = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setTimer(60);
        setShowResendButton(false);
        try {
            const name = registerInfo?.name;
            const email = registerInfo?.email;
            const res = await sendOtpToEmail({ name, email }).unwrap();
            toast.success(res.message);
        } catch (err) {
            toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
        }
    };

    const submitRegisterHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const email = registerInfo?.email;
            const res = await otpVerification({ otp, email }).unwrap();

            if (res.success) {
                const name = registerInfo?.name;
                const password = registerInfo?.password;
                const mobile = registerInfo?.mobile;
                const profilePic = registerInfo?.profilePic;
                await register({
                    name,
                    email,
                    mobile,
                    password,
                    profilePic,
                }).unwrap();
                dispatch(clearRegister());
                toast.success("Successfully Registered");
                navigate('/login');
            }
        } catch (err) {
            toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
        }
    };

    return (
        <>
            <OtpComponent
                otp={otp}
                setOtp={setOtp}
                submitRegisterHandler={submitRegisterHandler}
                resendOtpHandler={resendOtpHandler}
                timer={timer}
                showResendButton={showResendButton}
            />
        </>
    );
}
