
import { Button } from '@/component/ui/button'; // Make sure this path matches your project
import { motion } from 'framer-motion';


const suggestedActions = [
    {
        title: 'What services',
        label: 'do you provide?',
        action: 'What services does your company offer?',
    },
    {
        title: 'How can I',
        label: 'contact support?',
        action: 'How can I get in touch with your support team?',
    },
    {
        title: 'Do you offer',
        label: 'custom solutions?',
        action: 'Do you offer custom software or service solutions?',
    },
    {
        title: 'Where can I find',
        label: 'pricing details?',
        action: 'Where can I find information about your pricing?',
    },
];

export default function MultiModel() {
    return (
        <div className="grid sm:grid-cols-2 gap-2 w-full ">
            {suggestedActions.map((suggestedAction, index) => (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.05 * index }}
                    key={index}
                    className={index > 1 ? 'hidden sm:block' : 'block'}
                >

                    <Button
                        variant="ghost"
                        // onClick={() => {
                        //     append({
                        //         role: 'user',
                        //         content: suggestedAction.action,
                        //     });
                        // }}
                        className="  bg-[#242941] text-white transition-all duration-300 dark:bg-transparent rounded-[9.92px]   text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start cursor-pointer shadow-[0px_1.65px_0.83px_0px_#0000000D]
"
                    >
                        <span className="font-medium">{suggestedAction.title}</span>
                        <span className="text-muted-foreground">
                            {suggestedAction.label}
                        </span>
                    </Button>
                </motion.div>
            ))}
        </div>
    );
}
