'use client'
import React, { useEffect, useState } from 'react'
import Chatbot from '@/component/Chatbot'
import { ChevronDown, MessageSquare } from 'lucide-react'
const Page = () => {
  const [isOpenChat, setIsOpenChat] = useState(false)

  useEffect(() => {
    const sound = new Audio(isOpenChat ? 'chatOpen.mp3' : 'chatClose.mp3')
    sound.play().catch(err => console.error('Chat sound error:', err))
  }, [isOpenChat])

  return (
    <>
      {!isOpenChat && <div
        className='bg-[#242941] cursor-pointer fixed bottom-[25px] right-[30px] rounded-full z-100 w-12 h-12 flex items-center justify-center '
        onClick={() => setIsOpenChat(!isOpenChat)}
      >
        {isOpenChat ? (
          <ChevronDown className='text-white w-7 h-7' />
        ) : (
          <MessageSquare className='text-white w-6 h-6' />
        )}
      </div>}


      {isOpenChat && (
        <div
          className={` fixed right-[20px]   ${isOpenChat
            ? 'transition-all duration-700  bottom-[72px]'
            : 'bottom-0'
            }`}
        >
          <Chatbot setIsOpenChat={setIsOpenChat} isOpenChat={isOpenChat} />
        </div>
      )}
    </>
  )
}

export default Page
