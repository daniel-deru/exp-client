import styles from "./dashboardnav.module.scss"

const DashboardNav = () => {
  return (
    <aside className={styles.dashboard}>
        <h1 className="h-12 text-center">Logo</h1>
        <nav className="bg-gray-200 text-center rounded-xl pt-8">
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