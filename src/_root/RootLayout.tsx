import LeftSideBar from "@/components/shared/LeftSidebar"
import Topbar from "@/components/shared/Topbar"
import { Outlet } from "react-router-dom"
import Bottombar from "./pages/Bottombar"


const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
      <Topbar />
      <LeftSideBar />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  )
}

export default RootLayout