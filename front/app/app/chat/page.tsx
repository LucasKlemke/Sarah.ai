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

export default function Home() {
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (id: string) => {
    setMessages(messages.filter((message) => message.id !== id));
    toast({
      title: 'Message deleted',
    });
  };

  useEffect(() => {
    console.log('Messages:', messages);
  }, [messages]);

  return (
    <div className="px-10">
      <div className=" w-full">
        <h1 className="text-4xl text-center font-extralight pb-5">Sarah.ai</h1>
      </div>
      <div className="h-[82vh] w-full flex flex-col space-y-10 overflow-scroll">
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

        {error && <ChatErrorMessage reload={reload} />}
      </div>

      <div className="  rounded-t-xl justify-center  flex">
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
      </div>
    </div>
  );
}
