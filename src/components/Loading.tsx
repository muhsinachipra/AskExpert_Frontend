// frontend\src\components\Loading.tsx

import Lottie from "react-lottie-player";
import animationData from "../assets/LoadingAnimation.json";

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Lottie
                loop
                animationData={animationData}
                play
                style={{ width: 300, height: 300 }}
            />
        </div>
    );
};

export default Loading;
