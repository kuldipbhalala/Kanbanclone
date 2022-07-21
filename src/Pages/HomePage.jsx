import React from 'react'
import Card from '../Components/Card'
import Header from '../Components/Header'
import ColumnCard from '../Components/ColumnCard';
import { useDispatch, useSelector } from 'react-redux';
import { addColumn, getAllColumn, getAllTasks } from '../common/slices/prefSlice';
import { AiOutlinePlus } from 'react-icons/ai'
const HomePage = () => {
    const column = useSelector(getAllColumn)
    const tasks = useSelector(getAllTasks)
    console.log("🚀 ~ file: HomePage.jsx ~ line 11 ~ HomePage ~ tasks", tasks);
    console.log("🚀 ~ file: HomePage.jsx ~ line 10 ~ HomePage ~ column", column);
    const dispacth = useDispatch()
    const handleAddColumn = () => {
        dispacth(addColumn())
    }
    return (
        <>
            <Header />
             <div className='main_wrapper'>
                {column.map((data) => (
                    <ColumnCard tasks={tasks.filter(taskData=>taskData.columnId===data.columnId)} columnId={data.columnId} name={data.name} />
                ))}
                <div className='plus_button' onClick={handleAddColumn}>
                    <AiOutlinePlus />
                </div>
                </div>

        </>
    )
}

export default HomePage 