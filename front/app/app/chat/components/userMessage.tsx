'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Check,
  Edit,
  File,
  Pencil,
  RefreshCcw,
  Send,
  Square,
  Trash,
  Upload,
} from 'lucide-react';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

const UserMessage = ({
  message,
  isLoading,
  handleDelete,
}: {
  message: any;
  isLoading: boolean;
  handleDelete: (id: string) => void;
}) => {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <div
        className="flex self-end gap-x-1 "
        onMouseLeave={() => setShowEdit(false)}
        onMouseEnter={() => setShowEdit(true)}
      >
        {showEdit && !isLoading && (
          <Trash
            size={20}
            className="h-full hover:scale-105"
            onClick={() => handleDelete(message.id)}
          />
        )}
        <div className="self-end flex-col bg-gray-500 px-3 py-3 rounded-2xl">
          <h1 className="text-end p-0 m-0  text-white ">{message.content}</h1>
        </div>
      </div>

      {message.experimental_attachments && (
        <div className="self-end flex-col bg-gray-500 px-3 py-3 rounded-2xl mt-2">
          <div className="grid grid-cols-2">
            {message.experimental_attachments
              ?.filter((attachment: any) =>
                attachment.contentType.startsWith('image/')
              )
              .map((attachment: any, index: Number) => (
                <Image
                  className="rounded-2xl p-3"
                  width={200}
                  height={200}
                  key={`${message.id}-${index}`}
                  src={attachment.url}
                  alt={attachment.name as string}
                />
              ))}
            {message.experimental_attachments
              ?.filter((attachment: any) =>
                attachment.contentType?.startsWith('application/pdf')
              )
              .map((attachment: any, index: Number) => (
                <div
                  className="flex-col items-center justify-center"
                  key={`${message.id}-${index}`}
                >
                  <File />
                  {attachment.name}
                </div>
              ))}
            {/* <Button
                        onClick={() =>
                          console.log(message.experimental_attachments)
                        }
                      >
                        Clique
                      </Button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default UserMessage;
