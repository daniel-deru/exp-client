
import { useEffect } from "react"
import styles from "./style.module.scss"
import { Activity, selectActivities } from "@/store/slices/activitySlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import fetchActivities from "@/utils/fetchActivities"


interface Props {
  getActivity?: (activity: Activity) => Activity
}

const ActivityList: React.FC<Props> = ({ getActivity }) => {

  const dispatch = useAppDispatch()
  const activities = useAppSelector(selectActivities)

  useEffect(() => {
    fetchActivities(activities, dispatch)
  }, [])

  return (
    <div className={styles.activityList}>
        <section className="mt-4">
          {activities.map((activity: Activity) => (
            <div 
              className={`my-2 flex w-full justify-between ${getActivity && "hover:bg-sky-100"}`} 
              onClick={() => getActivity ? getActivity(activity) : null}
              key={activity.id}
            >
              <div className="truncate">{activity.name}</div>
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