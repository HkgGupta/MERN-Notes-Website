import { useState } from 'react';
import '../Styles/OTPContainer.css';

const OTPContainer = ({ onSubmit, onResend }) => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [isDisabled, setIsDisabled] = useState(false);
    const [countdown, setCountdown] = useState(30);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus on next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(otp.join(""));
    };

    const handleResend = () => {
        setOtp(new Array(6).fill(""));
        setIsDisabled(true);
        setCountdown(30);
        onResend();

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsDisabled(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    return (
        <div className="otp-container">
            <form onSubmit={handleSubmit}>
                <h2>Enter OTP</h2>
                <div className="otp-inputs">
                    {otp.map((data, index) => (
                        <input
                            type="text"
                            name="otp"
                            maxLength="1"
                            key={index}
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onFocus={(e) => e.target.select()}
                        />
                    ))}
                </div>
                <button className='submit-otp' type="submit">Submit</button>

                <button className='resend-otp' type="button" onClick={handleResend} disabled={isDisabled}> Resend OTP {isDisabled ? ` (${countdown})` : ""}
                </button>
            </form>
        </div>
    );
};

export default OTPContainer;
