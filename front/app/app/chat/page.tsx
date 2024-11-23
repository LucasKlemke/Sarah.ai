'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Check,
  File,
  Loader,
  RefreshCcw,
  Send,
  Square,
  Trash,
  Upload,
} from 'lucide-react';
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ subsets: ['latin'] });
import { useChat } from 'ai/react';
import { Skeleton } from '@/components/ui/skeleton';
import { useRef, useState } from 'react';

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

  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (id: string) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  return (
    <div className="px-10">
      <div className=" w-full">
        <h1 className="text-4xl text-center font-extralight pb-5">Sarah.ai</h1>
      </div>
      <div className="h-[82vh] w-full flex flex-col space-y-10 overflow-scroll">
        {messages.map((message) => (
          <div className="flex flex-col" key={message.id}>
            {message.role === 'user' ? (
              <>
                <div className="self-end flex-col bg-gray-500 px-3 py-3 rounded-2xl">
                  {/* <div className="w-full invisible flex justify-end">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(message.id)}
                  >
                    <Trash />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={reload}
                    disabled={isLoading}
                  >
                    <RefreshCcw />
                  </Button>
                </div> */}
                  <h1 className="text-end p-0 m-0  text-white ">
                    {message.content}
                  </h1>
                </div>
                {message.experimental_attachments && (
                  <div className="self-end flex-col bg-gray-500 px-3 py-3 rounded-2xl mt-2">
                    <div className="grid grid-cols-2">
                      {message.experimental_attachments
                        ?.filter((attachment) =>
                          attachment.contentType.startsWith('image/')
                        )
                        .map((attachment, index) => (
                          <img
                            className="rounded-2xl p-3"
                            width={200}
                            height={200}
                            key={`${message.id}-${index}`}
                            src={attachment.url}
                            alt={attachment.name}
                          />
                        ))}
                      {message.experimental_attachments
                        ?.filter((attachment) =>
                          attachment.contentType.startsWith('application/pdf')
                        )
                        .map((attachment, index) => (
                          <div
                            className="flex-col items-center justify-center"
                            key={`${message.id}-${index}`}
                          >
                            <File />
                            {attachment.name}
                          </div>
                        ))}
                      <Button
                        onClick={() =>
                          console.log(message.experimental_attachments)
                        }
                      >
                        Clique
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="self-start flex gap-x-2">
                <div>
                  <pre
                    className={`${montserrat.className} whitespace-pre-line`}
                  >
                    {/* {item.answer
                      .split('**')
                      .map((part: string, index: any) =>
                        index % 2 === 1 ? <b key={index}>{part}</b> : part
                      )} */}
                    {message.content}
                  </pre>
                  <div className="w-full flex justify-end">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(message.id)}
                    >
                      <Trash />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={reload}
                      disabled={isLoading}
                    >
                      <RefreshCcw />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {error && (
          <div className="flex flex-col items-center space-y-3">
            <div className="text-center">Something went wrong.</div>
            <Button type="button" onClick={() => reload()}>
              Try Again
            </Button>
          </div>
        )}
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
            {!files ? <Upload /> : <Check />}
          </label>
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
