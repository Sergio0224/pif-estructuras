import React, { createContext, useEffect, useState } from 'react'

export const UserDataContext = createContext()

export const UserData = ({ children }) => {
    const [user, setUser] = useState({});
    const [subjects, setSubjects] = useState([]);
    const [isUserEmpty, setIsUserEmpty] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [notes, setNotes] = useState([]);
    const [tasksNotifications, setTasksNotifications] = useState(false);
    const [lowGradeAlert, setLowGradeAlert] = useState(false);

    useEffect(() => {
        if (Object.keys(user).length <= 0) {
            let userString = localStorage.getItem("user");
            if (userString !== null) {
                const parsedUser = JSON.parse(userString);
                setUser(parsedUser);
                setIsUserEmpty(Object.keys(parsedUser).length <= 0);
            }
        }
    }, [])

    return (
        <UserDataContext.Provider
            value={
                {
                    user,
                    setUser,
                    isUserEmpty,
                    setIsUserEmpty,
                    subjects,
                    setSubjects,
                    tasks,
                    setTasks,
                    notes,
                    setNotes,
                    tasksNotifications, 
                    setTasksNotifications,
                    lowGradeAlert, 
                    setLowGradeAlert
                }
            }>
            {children}
        </UserDataContext.Provider>
    )
}