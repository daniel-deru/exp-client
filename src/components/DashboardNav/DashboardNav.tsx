import styles from "./dashboardnav.module.scss"
import Link from "next/link"

const DashboardNav = () => {
  return (
    <aside className={styles.dashboard}>
        <nav className="text-center rounded-xl mt-4 bg-slate-300">
            <ul className="">
                <li><Link href={"/dashboard"}><span>Home</span></Link></li>
                <li><Link href={"/dashboard/activities"}><span>Activities</span></Link></li>
                <li><Link href={"/dashboard/shopping"}><span>Shopping List</span></Link></li>
                <li><Link href={"/dashboard/insights"}><span>Insights</span></Link></li>
                <li><Link href={"/dashboard/settings"}><span>Settings</span></Link></li>
                <li><Link href={"/dashboard/account"}><span>Account</span></Link></li>
            </ul>
        </nav>
    </aside>
  )
}

export default DashboardNav