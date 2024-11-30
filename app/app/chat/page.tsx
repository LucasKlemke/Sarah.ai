'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileCheck, Send, Square, Upload } from 'lucide-react';
import { useChat } from 'ai/react';
import { useEffect, useRef, useState } from 'react';
import UserMessage from './components/userMessage';
import { useToast } from '@/hooks/use-toast';
import ModelMessage from './components/modelMessage';
import ChatErrorMessage from './components/chatErroMessage';
import { useHistoryStore } from '@/store/history';
import { useRouter } from 'next/navigation';
import { TypeAnimation } from 'react-type-animation';
import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

export default function page() {
  const router = useRouter();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error,
    reload,
    setMessages,
  } = useChat({
    onFinish: (message, { usage, finishReason }) => {
      console.log('Finished streaming message:', message);
      console.log('Token usage:', usage);
      console.log('Finish reason:', finishReason);
      setFinished(true);
    },
    onError: (error) => {
      console.error('An error occurred:', error);
    },
    onResponse: (response) => {
      console.log('Received HTTP response from server:', response);
    },
  });
  const { toast } = useToast();

  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const [finished, setFinished] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [id, setId] = useState(null);
   const supabase = createClient()

  const { history, setHistory }: any = useHistoryStore();

  async function getUserId () {

const { data: { user } } = await supabase.auth.getUser();
console.log(user)
  }

  useEffect(() => {
    getUserId()
    if (finished) {
      const newId = history.length + 1;
      setHistory([...history, { id: newId.toString(), content: messages }]);
      setId(newId);
      router.push(`/app/chat/${newId}`);

      setFinished(false);
    }
  }, [finished]);

  const handleDelete = (id: string) => {
    setMessages(messages.filter((message) => message.id !== id));
    toast({
      title: 'Message deleted',
    });
  };

  return (
    <div className="px-10">
      <div className=" w-full">
        <h1 className="text-4xl text-center font-extralight  pb-5">Sarah.ai</h1>
      </div>
      <div className="h-[80vh] w-full flex flex-col space-y-10 overflow-y-scroll">
        {messages.length > 0 ? (
          <>
            {messages.map((message) => (
              <div className="flex flex-col" key={message.id}>
                {message.role === 'user' ? (
                  <UserMessage
                    message={message}
                    handleDelete={handleDelete}
                    isLoading={isLoading}
                  />
                ) : (
                  <ModelMessage
                    message={message}
                    handleDelete={handleDelete}
                    reload={reload}
                    isLoading={isLoading}
                  />
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col justify-center h-4/6 gap-y-4">
            <TypeAnimation
              className="text-center font-extralight"
              sequence={[
                'Como posso ajudar hoje ?',
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: '2em', display: 'inline-block' }}
            />
            <div className="flex justify-center">
              <form
                onSubmit={(event) => {
                  handleSubmit(event, {
                    experimental_attachments: files,
                  });

                  setFiles(undefined);

                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="w-1/2 gap-x-2 flex items-center justify-center"
              >
                <label htmlFor="file-upload" className="cursor-pointer">
                  {!files ? <Upload /> : <FileCheck />}
                </label>
                {files && <span>({files.length})</span>}

                <Input
                  id="file-upload"
                  className=" hidden"
                  type="file"
                  onChange={(event) => {
                    if (event.target.files) {
                      setFiles(event.target.files);
                    }
                  }}
                  multiple
                  ref={fileInputRef}
                />
                <Input
                  name="prompt"
                  value={input}
                  disabled={isLoading || error != null}
                  autoComplete="off"
                  onChange={handleInputChange}
                />
                {isLoading ? (
                  <Button type="button" size="icon" onClick={() => stop()}>
                    <Square />
                  </Button>
                ) : (
                  <Button disabled={error != null} type="submit" size="icon">
                    <Send />
                  </Button>
                )}
              </form>
            </div>
          </div>
        )}

        {error && <ChatErrorMessage reload={reload} />}
      </div>

      <div className="  rounded-t-xl justify-center  flex">
        {messages.length > 0 && (
          <form
            onSubmit={(event) => {
              handleSubmit(event, {
                experimental_attachments: files,
              });

              setFiles(undefined);

              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
            className="w-1/2 gap-x-2 flex items-center justify-center py-3"
          >
            <label htmlFor="file-upload" className="cursor-pointer">
              {!files ? <Upload /> : <FileCheck />}
            </label>
            {files && <span>({files.length})</span>}

            <Input
              id="file-upload"
              className=" hidden"
              type="file"
              onChange={(event) => {
                if (event.target.files) {
                  setFiles(event.target.files);
                }
              }}
              multiple
              ref={fileInputRef}
            />
            <Input
              name="prompt"
              value={input}
              disabled={isLoading || error != null}
              autoComplete="off"
              onChange={handleInputChange}
            />
            {isLoading ? (
              <Button type="button" size="icon" onClick={() => stop()}>
                <Square />
              </Button>
            ) : (
              <Button disabled={error != null} type="submit" size="icon">
                <Send />
              </Button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
