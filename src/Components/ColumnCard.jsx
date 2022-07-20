import React, { useEffect, useState } from 'react'
import Card from './Card'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { addTasks, changeTaskColumn, deleteColumn, editColumnName } from '../common/slices/prefSlice'
const ColumnCard = ({ columnId, tasks, name }) => {
    const [taskName, setTaskName] = useState("")
    const [list , setList] = useState(tasks)
    const [columnName, setColumnName] = useState(name)
    const dispatch = useDispatch()
    useEffect(()=>{
        setList(tasks)
    },[tasks])
    const handleAdd = () => {
        if (taskName !== "") {

            dispatch(addTasks({ columnId, taskName }))
            setTaskName("")
        }
    }
    const handleDeleteColumn = () => {

        dispatch(deleteColumn({ columnId }))
    }
    const handleEditColumn = () => {
        dispatch(editColumnName({ columnId, columnName }))
    }
    const onDragOver = (e) => {
        e.preventDefault();
    };
    const onDrop = (e, cat) => {
        console.log("coming ")
        let id = e.dataTransfer.getData("id");
        dispatch(changeTaskColumn({columnId ,taskId:id}))
        // let tasks = this.state.tasks.filter((task) => {
        //     if (task.name == id) {
        //         task.category = cat;
        //         if (cat == "complete") {
        //             task.bgColor = "#e57373";
        //         } else {
        //             task.bgColor = "#9fa8da";
        //         }
        //     }
        //     return task;
        // });

        // this.setState({ ...this.state.tasks, tasks });
    };
    return (
        <div className='column_card_wrapper' onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, columnId)}>
            <h1 onBlur={handleEditColumn} onInput={(e) => { setColumnName(e.target.innerText) }} contentEditable={true}>{name}</h1>
            {list.length !== 0 && list.map((data ,index) => (
                <Card name={data.taskName} setList={setList} tasks={list} index={index} taskId={data.taskId} columnId={columnId} />
            ))
            }
            <div className='add_tasks_input'>
                <input value={taskName} onChange={(e) => { setTaskName(e.target.value) }} className='add_tasks_input' placeholder='Add Tasks' type="text" />
                <AiOutlinePlusCircle onClick={handleAdd} size={20} className='add_tasks' />
            </div>
            <button className='delete_button' onClick={handleDeleteColumn}>Delete</button>
        </div>
    )
}

export default ColumnCard