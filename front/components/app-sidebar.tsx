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

import { Cross, Home, Hospital, Info, Mail, Plus } from 'lucide-react';

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
  // {
  //   title: 'Contato',
  //   url: '#',
  //   icon: Mail,
  // },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Button className='flex' variant='outline'>Novo Chat <Plus/></Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Histórico</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {/* <item.icon /> */}
                      <span>{item.title}</span>
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
