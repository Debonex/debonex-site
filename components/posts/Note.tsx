import { FC, ReactNode } from "react";

const Note: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="rounded-md border-l-4 border-primary-main bg-primary-main/25 p-2">
      {children}
    </div>
  );
};

export default Note;
