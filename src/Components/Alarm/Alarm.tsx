import {AlarmSvg} from "../../assets/assets.tsx";
import s from "./Alarm.module.css"
import AlarmMain from "../AlarmMain/AlarmMain.tsx";

const Alarm = () => {
    return (
        <div className={s.mainContainer}>
            <h2 className={s.textAlarm}>Будильник</h2>
            <AlarmSvg width={300} />
            <AlarmMain />

        </div>
    );
};

export default Alarm;