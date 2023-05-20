import { FaSearch, FaUserCircle } from "react-icons/fa"


const Header = () => {
  return (
    <header className='h-12 flex justify-end items-center mt-4'>
        <div className="bg-stone-200 p-2 rounded-3xl flex items-center w-4/12 mr-4">
          <FaSearch className="mr-2"/>
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