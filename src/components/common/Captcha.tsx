import React, { useRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface CaptchaProps {
  onVerify: (token: string | null) => void;
  onError?: (error: any) => void;
  onExpire?: () => void;
  theme?: 'light' | 'dark';
  size?: 'compact' | 'normal' | 'invisible';
}

const Captcha: React.FC<CaptchaProps> = ({
  onVerify,
  onError,
  onExpire,
  theme = 'light',
  size = 'normal',
}) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // In production, you would get this from environment variables
  const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

  const handleChange = (token: string | null) => {
    onVerify(token);
  };

  const handleError = (error: any) => {
    console.error('reCAPTCHA error:', error);
    onError?.(error);
  };

  const handleExpire = () => {
    onExpire?.();
  };

  const resetCaptcha = () => {
    recaptchaRef.current?.reset();
  };

  useEffect(() => {
    // Expose reset function for parent components
    return () => {
      resetCaptcha();
    };
  }, []);

  return (
    <div className="flex justify-center">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={RECAPTCHA_SITE_KEY}
        onChange={handleChange}
        onErrored={handleError}
        onExpired={handleExpire}
        theme={theme}
        size={size}
      />
    </div>
  );
};

export default Captcha;
