import styles from "./tiles.module.scss"


const Tiles = () => {
  return (
    <div className={styles.tiles}>
        <div className="spent">
            <div>Total Spent</div>
            <div>1</div>
        </div>
        <div className="activities">
            <div>Total Activities</div>
            <div>1</div>
        </div>
        <div className="items-p-activity">
            <div>Average Items Per Activity</div>
            <div>1</div>
        </div>
        <div className="spent-p-activity">
            <div>Average Spent Per Activity</div>
            <div>1</div>
        </div>
    </div>
  )
}

export default Tiles