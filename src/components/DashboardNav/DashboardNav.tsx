import styles from "./dashboardnav.module.scss"
import Link from "next/link"

const DashboardNav = () => {
  return (
    <aside className={styles.dashboard}>
        <h1 className="h-12 text-center leading-10">Logo</h1>
        <nav className="bg-stone-500 text-white text-center rounded-xl mt-4">
            <ul className="">
                <li><Link href={"/dashboard"}><span>Dashboard</span></Link></li>
                <li><Link href={"/activities"}><span>Activities</span></Link></li>
                <li><Link href={"/insights"}><span>Insights</span></Link></li>
                <li><Link href={"/settings"}><span>Settings</span></Link></li>
                <li><Link href={"/account"}><span>Account</span></Link></li>
            </ul>
        </nav>
    </aside>
  )
}

export default DashboardNav