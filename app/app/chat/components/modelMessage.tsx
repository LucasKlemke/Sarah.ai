'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { RefreshCcw, Trash } from 'lucide-react';
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ subsets: ['latin'] });

const ModelMessage = ({
  message,
  handleDelete,
  reload,
  isLoading,
}: {
  message: any;
  handleDelete: (id: string) => void;
  reload: () => void;
  isLoading: Boolean;
}) => {
  return (
    <div className="self-start flex gap-x-2 w-2/3">
      <div>
        <pre className={`${montserrat.className} whitespace-pre-line`}>
          {message.content
            .split('**')
            .map((part: string, index: any) =>
              index % 2 === 1 ? <b key={index}>{part}</b> : part
            )}
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
  );
};

export default ModelMessage;
