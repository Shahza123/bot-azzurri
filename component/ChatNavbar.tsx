



import { Minus } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface ChatNavbarProps {
    title: string;
    setIsOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
    isOpenChat: boolean

}

const ChatNavbar: React.FC<ChatNavbarProps> = ({ title, setIsOpenChat, isOpenChat }) => {
    useEffect(() => {
        const sound = new Audio(isOpenChat ? '/chatOpen.mp3' : '/chatClose.mp3')
        sound.play().catch(err => console.error('Chat sound error:', err))
    }, [isOpenChat])


    return (
        <div className="px-4 py-3 h-[80px] text-white flex items-center rounded-tl-[10px] rounded-tr-[10px] justify-between rounded"
            style={{ backgroundImage: "url('chatNavbarBg.png')" }}>
            <div className='flex items-center gap-[6px]'>
                <div className="border rounded-full">
                    <Image src="/botEmoji.png" alt="error" width={35} height={35} />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-sm  tracking-tight font-bold text-[24px] leading-[100%] ">
                        {title}
                    </h2>
                    <div className="flex gap-[3.0px] items-center ps-[6.12px]">
                        <div className="bg-[#43EE7D]  w-[6.61px] h-[6.61px] rounded-full"></div>
                        <p className="text-[#43EE7D] text-[9.92px] leading-[100%]">Online</p>
                    </div>
                </div>
            </div>

            <div className="border rounded-full w-[30px] h-[29px] flex items-center justify-center cursor-pointer" onClick={() => setIsOpenChat(false)}>
                <Minus />
            </div>
        </div>
    );
};

export default ChatNavbar;
