import { FaSearch, FaUserCircle } from "react-icons/fa"


const Header = () => {
  return (
    <header className='h-12 flex justify-between items-center px-4 mt-4 w-full'>

        <h1 className="text-center leading-10">Logo</h1>

        <div className="flex w-1/2 justify-between">
          <div className="bg-slate-200 p-2 rounded-3xl flex items-center w-8/12 mr-4">
            <FaSearch className="mr-2 text-slate-400"/>
            <input type="text" placeholder="Search Something..." className="bg-transparent w-full outline-none"/>
          </div>
          <div className="flex items-center">
            <div>Daniel de Ru</div>
            <FaUserCircle className="text-3xl text-slate-500 mx-3"/>
          </div>
        </div>

    </header>
  )
}

export default Header