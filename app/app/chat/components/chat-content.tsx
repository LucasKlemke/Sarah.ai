import React from 'react';
import UserMessage from '@/app/app/chat/components/userMessage';
import ModelMessage from '@/app/app/chat/components/modelMessage';
import { Loader2 } from 'lucide-react';

interface ChatContentProps {
  messages: any;
  handleDelete: any;
  isLoading: any;
  reload: any;
}

const ChatContent: React.FC<ChatContentProps> = ({
  messages,
  handleDelete,
  isLoading,
  reload,
}) => {
  console.log(messages.role);
  return (
    <>
      {messages.map(
        (
          message: { id: string; role: 'user' | 'model'; content: string },
          idx: number
        ) => (
          <div className="flex flex-col" key={message.id}>
            {message.role === 'user' && (
              <UserMessage
                message={message}
                handleDelete={handleDelete}
                isLoading={isLoading}
              />
            )}

            {message.role === 'assistant' && (
              <ModelMessage
                message={message}
                handleDelete={handleDelete}
                reload={reload}
                isLoading={isLoading}
              />
            )}

            {idx === messages.length - 1 && isLoading && (
              <div className="flex justify-start">
               <Loader2 className='animate-spin'/>
              </div>
            )}
          </div>
        )
      )}
    </>
  );
};

export default ChatContent;
