'use client';
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

import { Home, Info, Plus } from 'lucide-react';

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
    url: '#',
    icon: Info,
  },
];

let history: string | string[] = localStorage.getItem('history') as string;
if (history) {
  history = JSON.parse(history as string);
  console.log(history);
}

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Button className="flex" variant="outline">
          Novo Chat <Plus />
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Histórico</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {history?.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <a href={item.id}>
                      {/* <item.icon /> */}
                      <span>{item.content[0].content}</span>
                    </a>
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
