import Markdown from 'react-markdown';

interface InfoboxProps {
  content: string;
}

const Infobox = ({ content }: InfoboxProps) => {
    return (
        <div className="bg-gradient-to-r from-[#353a7a] via-[#3f4370] to-[#3b3b3b] text-white shadow-xl border-2 border-white px-6 py-3 flex items-center gap-4">
            <div className="flex-none w-10 h-10 rounded-full bg-white text-[#2c2f5e] flex items-center justify-center font-bold">
                !
            </div>
            <div className="prose-md leading-relaxed font-serif dark:prose-invert prose-a:text-[#41AFF3] prose-a:underline prose-a:underline-offset-4">
                <Markdown>
                    {content || ""}
                </Markdown>
            </div>
        </div>
    )
}

export default Infobox;