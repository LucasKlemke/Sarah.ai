'use client';
import { getHistory } from '@/app/app/chat/__actions/chat';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useHistoryStore } from '@/store/history';
import { createClient } from '@/utils/supabase/client';

import { Home, Info, Plus, Trash } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const items = [
  {
    title: 'Item 1',
    url: '#',
    icon: Home,
  },
  {
    title: 'Item 2',
    url: '#',
    icon: Home,
  },
  {
    title: 'Item 3',
    url: '#',
    icon: Home,
  },
];

const footerItems = [
  {
    title: 'Sobre',
    url: '/app/about',
    icon: Info,
  },
];

export default function AppSidebar() {
  // const { history, removeHistory }: any = useHistoryStore();
  const supabase = createClient();

  const [history, setHistory] = useState(null);
  async function getUserId() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.id) throw new Error('User not found');

    return user?.id;
  }

  useEffect(() => {
    const getHistoryItems = async () => {
      const userId = await getUserId();
      const historyData = await getHistory(userId);
      setHistory(historyData);
    };

    getHistoryItems()
  }, []);
  // const history = null

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href={'/app/chat'}>
          <Button className="flex w-full" variant="outline">
            Novo Chat <Plus />
          </Button>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Histórico</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {history?.map((item: any) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <div className="flex w-full justify-between">
                      <Link
                        href={`/app/chat/${item.id}`}
                        className="truncate ..."
                      >
                        <span>{item.title}</span>
                      </Link>
                      <Trash
                        className="cursor-pointer hover:scale-105"
                        // onClick={() => removeHistory(item.id)}
                      />
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {footerItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
