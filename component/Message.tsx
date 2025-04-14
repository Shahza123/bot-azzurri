'use client';

import { FC } from 'react';
import { Markdown } from './MarkDown';
import Image from 'next/image';

interface MessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export const Message: FC<MessageProps> = ({ role, content }) => {
  const isUser = role === 'user';

  return (
    <div className={`flex gap-3 items-start ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="p-[1px] rounded-full bg-[linear-gradient(180deg,_#7000FF_0%,_#FF00B8_100%)] shadow-[0px_10px_20px_0px_#FA00FF33,_0px_4px_20px_0px_#3C00E866] inline-block">
          <div className="bg-black rounded-full">
            <Image
              src="/botAvatar.png"
              alt="Bot"
              width={35}
              height={35}
              className="rounded-full z-[-50px]"
            />
          </div>
        </div>

      )}

      <div className="flex flex-col">
        {content && (
          <div
            className={`flex flex-col max-w-[250px] text-[12px] leading-[100%]  break-words px-3 py-2 rounded-md  gap-[10.77px] 
              ${isUser ? 'bg-[linear-gradient(90deg,_#6E5ECD_0%,_#2F4C67_100%)] text-white ' : 'bg-[#242941]  text-white shadow-[0px_1.65px_0.83px_0px_#0000000D]'}
            `}
          >
            <Markdown>{content}</Markdown>
            <p className='text-white text-[8.27px] leading-[100%]'>7:20</p>
          </div>
        )}
      </div>

      {isUser && (


        <div className="p-[1px] rounded-full bg-[linear-gradient(180deg,_#7000FF_0%,_#FF00B8_100%)] shadow-[0px_10px_20px_0px_#FA00FF33,_0px_4px_20px_0px_#3C00E866] inline-block">
          <div className="bg-black rounded-full p-[3px]">
            <Image src="/userAvatar.png" alt="User" width={30} height={30} />
          </div>
        </div>



      )}
    </div>
  );
};
