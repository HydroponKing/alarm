import s from './AlarmMain.module.css';
import {useEffect, useState} from "react";
import alarmSound from '../../assets/lezginka.mp3'



const AlarmMain = () => {

    const [minutesAlarm, setMinutesAlarm] = useState('')
    const [hourAlarm, setHourAlarm] = useState('')

    const [isTimerOpen, setIsTimerOpen] = useState(true)
    const [isCancelopen, setIsCancelopen] = useState(false)

    const [audio] = useState(new Audio(alarmSound))

    const [isError, setIsError] = useState('')

    useEffect(() => {
        let interval: number | undefined;
        if (isCancelopen) {
           interval = setInterval(()=>{
                const now = new Date();
                const currentHour = now.getHours();
                const currentMinute = now.getMinutes();
                if (currentHour === Number(hourAlarm) && currentMinute === Number(minutesAlarm)) {
                    audio.play()
                }
            }, 3000)
        }
        return () => {clearInterval(interval);}
    },[isCancelopen, hourAlarm, minutesAlarm, audio])


    const handleSetTimer = () => {
        const hours = Number(hourAlarm)
        const minutes = Number(minutesAlarm)
        if (hourAlarm.trim() === '' || minutesAlarm.trim() === '') {
            setIsError("Введи время долбоеб")
            console.log("введи время долбоеб")
            return;
        }

        if (hours >= 0 && hours < 23 && minutes >= 0 && minutes <= 59 ) {
            setIsTimerOpen(false);
            setIsCancelopen(true);
        }else {
            setIsError("Введи нормально пж")
            console.log('Ошибка времени ты ебень блять даун просто пиздец')
        }
    }

    const handleClearTimer = () => {
        audio.pause()
        audio.currentTime = 0
        setIsTimerOpen(true);
        setIsCancelopen(false);
        setHourAlarm('')
        setMinutesAlarm('')
    }

    return (
        <div>
            {isTimerOpen &&
                <div className={s.mainContainerAlarm}>
                    <div className={s.alarmInputs}>
                        <input className={s.inputTime}
                               type="number"
                               min={0}
                               max={23}
                               placeholder={"час"}
                               onChange={(event) => setHourAlarm(event.target.value)}
                        />
                        <p>:</p>
                        <input className={s.inputTime}
                               type="number"
                               min={0}
                               max={59}
                               placeholder={"мин"}
                               onChange={(event) => setMinutesAlarm(event.target.value)}
                        />
                    </div>
                    {isError &&
                        <div className={s.errorBlock}>
                            <p className={s.errorText}> {isError}</p>
                        </div>
                    }
                    <div>
                        <button
                            onClick={handleSetTimer}
                            className={s.buttonAlarm}
                        >Подтвердить</button>
                    </div>
                </div>
            }
            {isCancelopen &&
                <div>
                    <div className={s.mainContainerAlarm}>
                        <div className={s.timeMessageBlock}>
                            <p className={s.timeMessageText}>Ваш будильник зализгинит в</p>
                            <div className={s.timeMessageTimeContainer}>
                                <p className={s.timeMessageTime}>{hourAlarm} : {minutesAlarm}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClearTimer}
                            className={s.buttonAlarm}
                        >Отменить</button>
                    </div>
                </div>
            }

        </div>
    );
};

export default AlarmMain;