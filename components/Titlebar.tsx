import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

const Titlebar = ({children}: WrapperProps) => {
    return (
        <section className="px-10 pt-6">
          <div className="bg-gradient-to-r from-[#353a7a] via-[#3f4370] to-[#3b3b3b] h-14 text-white px-6 py-3 shadow-lg border-2 border-[#ffffff] flex items-center justify-between">
            {children}          
          </div>
        </section>
    );
}

export default Titlebar;