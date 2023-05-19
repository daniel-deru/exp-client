import { FaSearch, FaUserCircle } from "react-icons/fa"


const Header = () => {
  return (
    <header className='pt-4 h-12 flex justify-between'>
        <div className="bg-slate-100 p-2 rounded-3xl flex items-center w-1/4">
          <FaSearch className="mr-2 text-slate-400"/>
          <input type="text" placeholder="Search Something..." className="bg-transparent w-full outline-none"/>
        </div>
        <div className="flex items-center">
          <div className="mr-3">Daniel de Ru</div>
          <FaUserCircle className="text-3xl text-emerald-500"/>
        </div>
    </header>
  )
}

export default Header