import React, { useState, useEffect, useRef } from 'react';

const Pomodoro = () => {
    const [workTime, setWorkTime] = useState(25 * 60);
    const [breakTime, setBreakTime] = useState(5 * 60);
    const [isWorking, setIsWorking] = useState(true);
    const [timeLeft, setTimeLeft] = useState(workTime);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning && !isPaused) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prevTimeLeft) => {
                    if (prevTimeLeft === 0) {
                        setIsWorking(!isWorking);
                        return isWorking ? breakTime : workTime;
                    }
                    return prevTimeLeft - 1;
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning, isPaused, isWorking, workTime, breakTime]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleStart = () => {
        setIsRunning(true);
        setIsPaused(false);
    };

    const handlePause = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setIsRunning(false);
        setIsPaused(false);
        setTimeLeft(isWorking ? workTime : breakTime);
    };

    return (
        <>
            <div className='flex gap-4 py-6'>
                <div>
                    <h1 className='font-bold text-3xl text-[#1389FE]'>Pomodoro</h1>
                </div>
            </div>
            <div className='mt-12 flex justify-center flex-col items-center gap-6 w-full'>
                <h1 className='font-bold text-[#1389FE] text-xl' >{isWorking ? 'Tiempo de trabajo' : 'Tiempo de descanso'}</h1>
                <div className='p-10 border-2 border-[#1389FE] text-[#1389FE] rounded-full w-48 h-48 text-center content-center text-4xl border-dashed font-bold'>{formatTime(timeLeft)}</div>
                <div>
                    {!isRunning && (
                        <button className='bg-[#1389FE] text-white rounded-md px-4 py-2' onClick={handleStart}>
                            Iniciar
                        </button>
                    )}
                    {isRunning && (
                        <>
                            <button className='bg-[#1389FE] text-white rounded-md px-4 py-2 mr-4' onClick={handlePause}>
                                {isPaused ? 'Reanudar' : 'Pausar'}
                            </button>
                            <button className='bg-[#1389FE] text-white rounded-md px-4 py-2' onClick={handleReset}>
                                Resetear
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Pomodoro;