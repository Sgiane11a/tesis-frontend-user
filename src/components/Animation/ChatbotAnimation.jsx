import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import chatbotAnim from '../../assets/animations/chatbot.lottie?url';

const ChatbotAnimation = ({
  className = '',
  width = 132,
  height = 132,
  autoplay = true,
  loop = true,
  speed = 1,
  playOnHover = false,
}) => {
  const hoverHandlers = playOnHover
    ? {
        onMouseEnter: (event) => event.currentTarget?.play?.(),
        onMouseLeave: (event) => event.currentTarget?.stop?.(),
      }
    : {};

  const devicePixelRatio =
    typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 2;

  return (
    <DotLottieReact
      src={chatbotAnim}
      className={className}
      autoplay={autoplay}
      loop={loop}
      speed={speed}
      renderConfig={{ autoResize: true, devicePixelRatio, quality: 100 }}
      style={{ width, height, display: 'block' }}
      {...hoverHandlers}
    />
  );
};

export default ChatbotAnimation;
