import styles from "./style.module.scss"
import { useAppSelector } from "@/store/hooks"
import { selectActivities, Activity } from "@/store/slices/activitySlice"

const ActivityList = () => {


  const activities = useAppSelector(selectActivities)


  return (
    <div className={styles.activityList}>
        <div className="flex items-center">
            <div className="text-xl">Activities For This Month</div>
            <button className="ml-4 bg-sky-500 py-1 px-4 rounded-md text-white">Add New</button>
        </div>
        <section className="mt-4">
          {activities.map((activity: Activity) => (
            <div className="my-2 flex w-full justify-between">
              <div>{activity.name}</div>
              <div>{new Date(activity.createdAt).toUTCString()}</div>
              <div>{activity.status}</div>
            </div>
          ))}
        </section>
    </div>
  )
}

export default ActivityList