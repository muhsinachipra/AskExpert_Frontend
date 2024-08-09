import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useEffect, useState } from "react";
import { useExpertRegisterMutation } from "../../../slices/api/expertApiSlice";
import { useSendOtpToEmailMutation, useOtpVerificationMutation } from "../../../slices/api/userApiSlice";

import { MyError } from "../../../validation/validationTypes";
import { clearExpertRegister } from "../../../slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import OtpComponent from "../../../components/Otp";

export default function Otp() {
    const dispatch = useDispatch();
    const { expertRegisterInfo } = useSelector((state: RootState) => state.auth);
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const [otpVerification] = useOtpVerificationMutation();
    const [register] = useExpertRegisterMutation();
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
            const name = expertRegisterInfo?.name;
            const email = expertRegisterInfo?.email;
            const res = await sendOtpToEmail({ name, email }).unwrap();
            toast.success(res.message);
        } catch (err) {
            toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
        }
    };

    const submitRegisterHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const email = expertRegisterInfo?.email;
            // console.log('otp in the field',otp)
            const res = await otpVerification({ otp, email }).unwrap();

            if (res.success) {
                const name = expertRegisterInfo?.name;
                const password = expertRegisterInfo?.password;
                const profilePic = expertRegisterInfo?.profilePic;
                const resume = expertRegisterInfo?.resume;
                const category = expertRegisterInfo?.category;
                const mobile = expertRegisterInfo?.mobile;
                const experience = expertRegisterInfo?.experience;

                await register({
                    name,
                    email,
                    password,
                    profilePic,
                    resume,
                    category,
                    mobile,
                    experience
                }).unwrap();
                dispatch(clearExpertRegister());
                toast.success("Successfully Registered");
                navigate('/expert/login');
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
