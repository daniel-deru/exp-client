import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa"
import styles from "./header.module.scss"
import { useAppDispatch } from "@/store/hooks"
import { toggleNav, selectNavState } from "@/store/slices/navSlice"
import { useEffect } from "react"


const Header = () => {

    const dispatch = useAppDispatch()

    return (
      <header className={styles.header}>

          <h1 className="text-center leading-10">Logo</h1>

          <div className="flex w-2/3 justify-between">
            <div className="p-2 w-8/12">
              <FaSearch className="mr-2 text-slate-400"/>
              <input type="text" placeholder="Search Something..." className="bg-transparent w-full outline-none"/>
            </div>
            <div className="flex items-center">
              <div>Daniel de Ru</div>
              <FaUserCircle className="text-3xl text-slate-500 mx-3"/>
            </div>
          </div>

          <div className="hidden">
            <FaBars onClick={() => dispatch(toggleNav())} className="cursor-pointer"/>
          </div>

      </header>
    )
}

export default Header