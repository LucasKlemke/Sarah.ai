import type { Metadata } from 'next';
import '@/app/globals.css';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import AppSidebar from '../../components/app-sidebar';

export const metadata: Metadata = {
  title: 'Sarah.ai',
  description: 'AI web doctor',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
    // <div className="grid grid-cols-6  h-[100vh] ">
    //   <Sidebar className="border-r-2 border-gray-500 lg:visible sm:invisible w-3/4 col-span-1 p-2 ">
    //     <SidebarContent>
    //       <div className="text-center">
    //         <h1 className="sm:text-xl lg:text-3xl font-bold">Doctor AI</h1>
    //       </div>
    //       <div className="pt-5">
    //         <h1 className="sm:text-lg lg:text-xl">Histórico</h1>
    //         <div className="pl-3 rounded-2xl bg-white h-[80vh]">
    //           <p className="font-extralight">Consulta 1</p>
    //           <p className="font-extralight">Consulta 1</p>
    //           <p className="font-extralight">Consulta 1</p>
    //           <p className="font-extralight">Consulta 1</p>
    //         </div>
    //       </div>

    //       <div className="pt-4">
    //         <Link href="/chat">
    //           <Button className="w-full">Sobre</Button>
    //         </Link>
    //       </div>
    //     </SidebarContent>
    //   </Sidebar>
    //   <div className="col-span-5">
    //     <div className=" flex w-full justify-end">
    //       <Button variant="outline" size="icon">
    //         <SettingsIcon className="h-10 w-10" />
    //       </Button>
    //     </div>
    //     <div className="w-full gap-y-5 p-10 ">{children}</div>
    //   </div>
    // </div>
  );
}