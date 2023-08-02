import { useAppDispatch } from "@/store/hooks"
import { Activity, Status, deleteActivity, updateActivity } from "@/store/slices/activitySlice"
import { call } from "@/utils/call"
import { getCookie, setCookie } from "@/utils/cookie"
import validStartActivity from "@/utils/startActivityCheck"
import { usePathname, useRouter } from "next/navigation"
import styles from "./styles.module.scss"
import { BiPlay, BiCheck, BiHourglass } from "react-icons/bi"


interface IProps {
  activity: Activity
}

const ActivityPageListItem: React.FC<IProps> = ({ activity }) => {

  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  function goToActivityPage(id: string){
    router.push(`/dashboard/activities/${id}`)
  }

  // Sum the activity total using the JS reduce method
  const activityTotal = (activity: Activity) => activity.items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)

  async function removeActivity(activity: Activity){
    if(activity.startTime && !activity.endTime) {
        return alert("This activity is still active. Please complete the activity before you can delete it.")
    }

    const confirmDelete = confirm("Are You sure")

    if(!confirmDelete) return

    const response = await call(`activity/delete/${activity.id}`, "DELETE")

    if(!response.error){
        dispatch(deleteActivity(activity))
    }
  }

  async function startActivity(activity: Activity | undefined){
      console.log("Before Start Function")
      const startedActivity = getCookie<Activity>("activeActivity")

      if(!activity) return alert("No activity Found!")

      const validActivity = validStartActivity(activity, startedActivity)

      if(validActivity.error) return alert(validActivity.message)

      // // The current activity has not been started yet - call the API to start activity
      if(!activity.startTime){
          const response = await call<Activity>(`/activity/start/${activity.id}`, "POST")

          if(response.error) return alert("Activity could not be started.")
          // Set the current activity as the active activity.
          setCookie("activeActivity", JSON.stringify(activity), "30d")
          dispatch(updateActivity(response.data))
      }

      router.push(`${pathname}/${activity.id}/start`)
      console.log("After Start Function")
  }

  // Create a tailwind class to reflect correct color based on Status of Activity
  function statusColor(status: Status): string {
    let styleClass = ""

    switch (status) {
      case "Active":
        styleClass = "text-emerald-500 font-bold"
        break
      case "Pending":
        styleClass = "text-yellow-500 font-bold"
        break
      case "Finished":
        styleClass ="text-blue-500 font-bold"
        break
    }

    return styleClass
  }

  return (
    <div key={activity.id}  className={`border-slate-300 border-solid border-2 rounded-md cursor-pointer hover:border-sky-700`}>
        <div onClick={() => goToActivityPage(activity.id)}>
            <div className={styles.name}>{activity.name}</div>
            <div className={`${styles.status} ${statusColor(activity.status)} flex items-center`}>
              <div className="w-20">{activity.status}</div>
              
              <div className={`ml-2 ${statusColor(activity.status)}`}>
                {activity.status === "Active" && <BiPlay  />}
                {activity.status === "Finished" && <BiCheck />}
                {activity.status === "Pending" && <BiHourglass size={15} />}
              </div>
             
            </div>
            <div className={styles.items}>{activity.items?.length || 0}</div>
            <div>{activityTotal(activity)}</div>
        </div>
        <div className={styles.buttonContainer}>
            <button className="text-sky-700" onClick={() => startActivity(activity)}>
                <span className="bg-sky-700 text-white py-1 px-3 rounded-md">
                    {activity.startTime && !activity.endTime ? "Continue" : "Start"}
                </span>
            </button>
            <button className="text-red-500" onClick={() => removeActivity(activity)}>
                {/* <FaRegTimesCircle /> */}
                <span className="bg-slate-500 text-white py-1 px-3 rounded-md">Delete</span>
            </button>
        </div>
    </div>
  )
}

export default ActivityPageListItem