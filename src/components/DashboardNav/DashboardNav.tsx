import styles from "./dashboardnav.module.scss"
import Link from "next/link"
import { FaHome, FaShoppingCart, FaTasks, FaChartLine, FaUserAlt, FaTimes } from "react-icons/fa"
import { BsGearFill } from "react-icons/bs"
import { motion } from "framer-motion"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { selectNavState, toggleNav } from "@/store/slices/navSlice"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

const DashboardNav = () => {
  const showNav = useAppSelector(selectNavState)
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  return (
    <motion.aside 
      className={`${styles.dashboard} ${showNav ? styles.open : styles.closed}`}
    >
        <nav className="text-center">
            <div className="flex p-4 justify-end text-3xl">
              <FaTimes onClick={() => dispatch(toggleNav())}/>
            </div>
            <ul className="">
                <li className={pathname === "/dashboard" ? styles.active : ""}>
                  <Link href={"/dashboard"} onClick={() => dispatch(toggleNav())}>
                    <FaHome />
                    <div>Home</div>
                  </Link>
                </li>
                <li className={pathname === "/dashboard/activities" ? styles.active : ""}>
                  <Link href={"/dashboard/activities"} onClick={() => dispatch(toggleNav())}>
                    <FaShoppingCart />
                    <div>Activities</div>
                  </Link>
                </li>
                <li className={pathname === "/dashboard/shopping" ? styles.active : ""}>
                  <Link href={"/dashboard/shopping"} onClick={() => dispatch(toggleNav())}>
                    <FaTasks />
                    <div>Shopping List</div>
                  </Link>
                </li>
                <li className={pathname === "/dashboard/insights" ? styles.active : ""}>
                  <Link href={"/dashboard/insights"} onClick={() => dispatch(toggleNav())}>
                    <FaChartLine />
                    <div>Insights</div>
                  </Link>
                </li>
                <li className={pathname === "/dashboard/settings" ? styles.active : ""}>
                  <Link href={"/dashboard/settings"} onClick={() => dispatch(toggleNav())}>
                    <BsGearFill />
                    <div>Settings</div>
                  </Link>
                </li>
                <li className={pathname === "/dashboard/account" ? styles.active : ""}>
                  <Link href={"/dashboard/account"} onClick={() => dispatch(toggleNav())}>
                    <FaUserAlt />
                    <div>Account</div>
                  </Link>
                </li>
            </ul>
        </nav>
    </motion.aside>
  )
}

export default DashboardNav