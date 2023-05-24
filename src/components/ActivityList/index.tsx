import styles from "./style.module.scss"
import { useAppSelector } from "@/store/hooks"
import { selectActivities, Activity } from "@/store/slices/activitySlice"

const ActivityList = () => {


  const activities = useAppSelector(selectActivities)


  return (
    <div className={styles.activityList}>
        <section className="mt-4">
          {activities.map((activity: Activity) => (
            <div className="my-2 flex w-full justify-between">
              <div>{activity.name}</div>
              <div>{activity.items.length}</div>
              <div></div>
              <div>{activity.status}</div>
            </div>
          ))}
        </section>
    </div>
  )
}

export default ActivityList