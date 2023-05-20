import styles from "./dashboardnav.module.scss"

const DashboardNav = () => {
  return (
    <aside className={styles.dashboard}>
        <h1 className="h-12 text-center leading-10">Logo</h1>
        <nav className="bg-stone-500 text-white text-center rounded-xl mt-4">
            <ul className="">
                <li>Dashboard</li>
                <li>Activities</li>
                <li>Insights</li>
                <li>Settings</li>
                <li>Acount</li>
            </ul>
        </nav>
    </aside>
  )
}

export default DashboardNav