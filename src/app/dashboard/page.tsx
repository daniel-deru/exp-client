import DashboardNav from "@/components/DashboardNav/DashboardNav"
import Tiles from "@/components/Tiles/Tiles"
import Header from "@/components/Header"
import ActivityList from "@/components/ActivityList"

const Dashboard = () => {
  return (
    <div className="flex">
        <DashboardNav />
        <div>
          <Header />
          <Tiles />
          <ActivityList />
        </div>
    </div>
  )
}

export default Dashboard