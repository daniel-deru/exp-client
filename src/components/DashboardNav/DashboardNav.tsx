import styles from "./dashboardnav.module.scss"
import Link from "next/link"
import { FaHome, FaShoppingCart, FaTasks, FaChartLine, FaUserAlt } from "react-icons/fa"
import { BsGearFill } from "react-icons/bs"
import { motion } from "framer-motion"
import { useAppSelector } from "@/store/hooks"
import { selectNavState } from "@/store/slices/navSlice"
import { useEffect } from "react"

const variants = {
  closed: {
    x: "-100%"
  },
  open: {
    x: 0
  }
}

const DashboardNav = () => {


  const showNav = useAppSelector(selectNavState)


  useEffect(() => {
    console.log(showNav)
  }, [showNav])

  return (
    <motion.aside 
      className={`${styles.dashboard} ${showNav ? styles.open : styles.closed}`}
    >
        <nav className="text-center rounded-xl mt-4 bg-slate-300">
            <ul className="">
                <li>
                  <Link href={"/dashboard"}>
                    <FaHome />
                    <div>Home</div>
                  </Link>
                </li>
                <li>
                  <Link href={"/dashboard/activities"}>
                    <FaShoppingCart />
                    <div>Activities</div>
                  </Link>
                </li>
                <li>
                  <Link href={"/dashboard/shopping"}>
                    <FaTasks />
                    <div>Shopping List</div>
                  </Link>
                </li>
                <li>
                  <Link href={"/dashboard/insights"}>
                    <FaChartLine />
                    <div>Insights</div>
                  </Link>
                </li>
                <li>
                  <Link href={"/dashboard/settings"}>
                    <BsGearFill />
                    <div>Settings</div>
                  </Link>
                </li>
                <li>
                  <Link href={"/dashboard/account"}>
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