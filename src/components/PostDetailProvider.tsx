import { createContext, useContext, useState } from "react";

type TReplyState = {
  parentCommentId: string;
  toUserId: string;
  toUsername: string;
};

const Context = createContext<{
  replyState: TReplyState | null;
  setReplyState: React.Dispatch<React.SetStateAction<TReplyState | null>>;
} | null>(null);

export const PostDetailProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [replyState, setReplyState] = useState<TReplyState | null>(null);
  return (
    <Context.Provider value={{ replyState, setReplyState }}>
      {children}
    </Context.Provider>
  );
};

export const usePostDetailContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "usePostDetailContext must be used within a PostDetailProvider",
    );
  }
  return context;
};
