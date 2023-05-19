import styles from "./style.module.scss"

const ActivityList = () => {
  return (
    <div className={styles.activityList}>
        <div className="flex items-center">
            <div>Activities For This Month</div>
            <button className="ml-4 bg-emerald-500 py-1 px-4 rounded-md text-white">Add New</button>
        </div>
    </div>
  )
}

export default ActivityList