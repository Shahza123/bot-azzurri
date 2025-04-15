import { useCallback, useEffect, useRef } from 'react';
import useWindowSize from '@/component/WindowSize';

import Image from 'next/image';


interface Message {
  role: 'user' | 'assistant' | 'data' | 'system';
  content: string;
}

interface ModelInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  stop: () => void;
  messages: Message[];
  handleSubmit: (event?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void;
}


const ModelInput: React.FC<ModelInputProps> = ({
  input,
  setInput,
  isLoading,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stop,
  // messages,
  handleSubmit
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { width } = useWindowSize();

  useEffect(() => {
    const el = document.getElementById('horizontal-scroll');

    if (el) {
      const handleWheel = (e: WheelEvent) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          el.scrollLeft += e.deltaY;
        }
      };

      el.addEventListener('wheel', handleWheel);

      return () => el.removeEventListener('wheel', handleWheel);
    }
  }, []);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  const submitForm = useCallback(() => {
    handleSubmit();
    const sendSound = new Audio('/chatSend.mp3');
    sendSound.play().catch(err => console.log('Send sound error:', err));

    if (width && width > 768) {
      textareaRef.current?.focus();
    }
  }, [handleSubmit, width]);



  return (
    <div className='gradient-border'>


      <div className='content'>
        <div id="horizontal-scroll" className='flex  gap-[6.61px] max-w-[360px] overflow-x-auto whitespace-nowrap scrollbar-hidden'>
          <div className='border inline-block opacity-90 rounded-tl-[9.92px]  rounded-tr-[9.92px]  rounded-br-[9.92px] rounded-bl-[0.4px] pt-[13.23px]  pr-[13.23px] pb-[9.92px] pl-[16.53px] cursor-pointer'>
            <p className='text-[#E8EBF0] font-semibold text-[9.92px] leading-[100%] tracking-[0%]'>🤔 What service do you provide?</p>
          </div>
          <div className='border inline-block opacity-90 rounded-tl-[9.92px]  rounded-tr-[9.92px]  rounded-br-[9.92px] rounded-bl-[0.4px] pt-[13.23px]  pr-[13.23px] pb-[9.92px] pl-[16.53px] cursor-pointer'>
            <p className='text-[#E8EBF0] font-semibold text-[9.92px] leading-[100%] tracking-[0%]'>💰 Pricing</p>
          </div>
          <div className='border inline-block opacity-90 rounded-tl-[9.92px]  rounded-tr-[9.92px]  rounded-br-[9.92px] rounded-bl-[0.4px] pt-[13.23px]  pr-[13.23px] pb-[9.92px] pl-[16.53px] cursor-pointer'>
            <p className='text-[#E8EBF0] font-semibold text-[9.92px] leading-[100%] tracking-[0%]'>🙋‍♂️ Do you offer custom solution?</p>
          </div>
          <div className='border inline-block opacity-90 rounded-tl-[9.92px]  rounded-tr-[9.92px]  rounded-br-[9.92px] rounded-bl-[0.4px] pt-[13.23px]  pr-[13.23px] pb-[9.92px] pl-[16.53px] cursor-pointer'>
            <p className='text-[#E8EBF0] font-semibold text-[9.92px] leading-[100%] tracking-[0%]'>🙋‍♂️ what&apos;s your compnay location?</p>
          </div>
        </div>
        <div className="border   rounded-tl-[9.92px] rounded-tr-[9.92px] rounded-br-[9.92px] rounded-bl-[0.4px] relative h-[51.07px] mt-4">
          <textarea
            placeholder="Type your message here..."
            value={input}
            onChange={handleInput}
            className="w-full h-[46px] max-h-[46px] shadow-none overflow-y-auto text-sm focus-visible:ring-0 focus:outline-none text-white break-words resize-none px-4 py-[10px] scrollbar-hidden box-border"
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                if (!isLoading) {
                  submitForm();
                }
              }
            }}
            ref={textareaRef}
          />



          <div
            onClick={(e) => {
              e.preventDefault();
              submitForm();
            }}
            className="absolute rounded-full w-[32px] h-[32px] top-1/2 -translate-y-1/2 right-[13.77px] bg-white flex items-center justify-center cursor-pointer"
          >
            <Image
              src="/sendTextIcon.svg"
              alt="Send"
              width={16}
              height={16}
              className="w-4 h-4"
            />
          </div>



        </div>
      </div>
    </div>
  );
};

export default ModelInput;
