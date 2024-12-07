import { Loader2, Trash } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { deleteHistory } from '@/app/app/chat/__actions/chat';
import { useToast } from '@/hooks/use-toast';
import { useHistoryStore } from '@/store/history';

const HistoryItem = ({ item }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const { removeHistory }: any = useHistoryStore();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteHistory(item.id);
      removeHistory(item.id);
      toast({
        title: 'Histórico excluído',
      });
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="flex justify-between w-full ">
          <Link href={`/app/chat/${item.id}`}>
            <span className="truncate">{item.title.slice(0, 16) + '...'}</span>
          </Link>
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Trash onClick={() => handleDelete()} />
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p>{item.title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HistoryItem;
