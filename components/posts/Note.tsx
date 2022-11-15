import { FC, ReactNode } from "react";

const Note: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="rounded-md border-l-4 border-sky-500 bg-sky-500/25 p-2">
      {children}
    </div>
  );
};

export default Note;
