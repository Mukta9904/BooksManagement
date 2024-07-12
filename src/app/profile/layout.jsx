import Navbar from "../components/Navbar/page";
import SideNavbar from "../components/SideNavbar/page";

export default function ProfileLayout({ children }) {
   
  return (
    <div className="flex w-full bg-gradient-to-br from-indigo-800 from-20% via-sky-900 via-50% to-emerald-600 to-100% h-[100vh]">
     <SideNavbar/>
      <div className="flex flex-col w-full">
         <Navbar className='w-full h-96' />
       <main className="overflow-auto">{children}</main>
      </div>
    </div>
  );
}
