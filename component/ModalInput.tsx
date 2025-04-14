import { useCallback, useRef } from 'react';
import useWindowSize from '@/component/WindowSize';
import { Button } from '@/component/ui/button';
import { Paperclip, Send } from 'lucide-react';
import { Textarea } from '@/component/ui/textarea';
import { Separator } from './ui/separator';
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
  stop,
  // messages,
  handleSubmit
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { width } = useWindowSize();
  // const [fileName, setFileName] = useState<string>('Choose CSV File');

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   setFileName(file ? file.name : 'Choose CSV File');
  // };

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
      <div className=' content '>
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
