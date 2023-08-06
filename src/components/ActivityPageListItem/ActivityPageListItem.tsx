import { useAppDispatch } from "@/store/hooks"
import { Activity, Status, deleteActivity, updateActivity } from "@/store/slices/activitySlice"
import { call } from "@/utils/call"
import { getCookie, setCookie } from "@/utils/cookie"
import validStartActivity from "@/utils/startActivityCheck"
import { usePathname, useRouter } from "next/navigation"
import styles from "./styles.module.scss"
import { BiPlay, BiCheck, BiHourglass } from "react-icons/bi"
import { MdDelete, MdOutlineDelete } from "react-icons/md"
import { VscDebugContinue, VscDebugStart } from "react-icons/vsc"
import startActivity from "@/shared/startActivity"


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

  async function startActivityCallback(activity: Activity | undefined){

    if(!activity) return alert("There is no activity")
    if(activity.status === "Finished") return alert("This activity has already been finished")

    // Make the necessary API Calls and validation checks
    await startActivity(activity, dispatch)

    router.push(`${pathname}/${activity?.id}/start`)
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
            <div>{new Date(activity.createdAt).getDate()}</div>
            <div>{activityTotal(activity)}</div>
            <div className={`${styles.status} ${statusColor(activity.status)} flex items-center`}>
              <div className="w-20">{activity.status}</div>           
              <div className={`ml-2 ${statusColor(activity.status)}`}>
                {activity.status === "Active" && <BiPlay  />}
                {activity.status === "Finished" && <BiCheck />}
                {activity.status === "Pending" && <BiHourglass size={15} />}
              </div>     
            </div>
            
        </div>

        <div className={styles.buttonContainer}>
            <button className="text-sky-700" onClick={() => startActivityCallback(activity)}>
                <span className={`${styles.mobile} ${activity.status === "Active" ? styles.statusActive : styles.statusPending} mr-2`}>
                  {activity.status === "Active" ? <VscDebugContinue/> : <VscDebugStart />}
                </span>
                <span className={`bg-sky-700 text-white py-1 px-3 rounded-md ${styles.desktop}`}>
                    {activity.startTime && !activity.endTime ? "Continue" : "Start"}
                </span>
            </button>
            <button className="text-red-500" onClick={() => removeActivity(activity)}>
                <span className={styles.mobile}><MdOutlineDelete /></span>
                <span className={`bg-slate-500 text-white py-1 px-3 rounded-md ${styles.desktop}`}>Delete</span>
            </button>
        </div>
    </div>
  )
}

export default ActivityPageListItem