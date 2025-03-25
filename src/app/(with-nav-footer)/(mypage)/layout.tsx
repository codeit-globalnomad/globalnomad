import SideNavMenu from '@/components/SideNavMenu';

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex justify-center px-4 pt-10'>
      <div className='flex w-full max-w-[1140px] gap-10'>
        <SideNavMenu />
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
}
