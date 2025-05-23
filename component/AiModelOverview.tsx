
// import { MessageIcon, VercelIcon } from '@/assets/ai-assist-icons/AiAssist';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';

const AimodelOverview: React.FC = (): JSX.Element => {
    return (
        <motion.div
            key="overview"
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ delay: 0.5 }}
        >
            <div className="rounded-xl px-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
                <p className="flex flex-row justify-center gap-4 items-center">
                    {/* <VercelIcon size={40} />
                    <span className='text-base'>+</span>
                    <MessageIcon size={30} /> */}
                </p>
                <p>
                    This is a chatbot template built with Next.js and the AI SDK by Vercel. It uses
                    the <code className="rounded-md px-1 py-0.5">streamText</code> function in the server and the
                    <code className="rounded-md px-1 py-0.5">useChat</code> hook on the client to create a seamless chat experience.
                </p>
                <p>
                    You can learn more about the AI SDK by visiting the{' '}
                    <Link
                        className="font-medium underline underline-offset-4"
                        to="https://sdk.vercel.ai/docs"
                        target="_blank"
                    >
                        docs
                    </Link>
                    .
                </p>
            </div>
        </motion.div>
    );
}

export default AimodelOverview;
