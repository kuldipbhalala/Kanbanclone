import React, { useEffect, useRef, useState } from 'react'
import Card from './Card'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { addTasks, changeTaskColumn, deleteColumn, editColumnName } from '../common/slices/prefSlice'
import { AiOutlineClose } from 'react-icons/ai'
const ColumnCard = ({ columnId, tasks, name }) => {
    const [taskName, setTaskName] = useState("")
    const [list, setList] = useState(tasks)
    const [columnName, setColumnName] = useState(name)
    const dispatch = useDispatch()
    const dragItem = useRef();
    const dragOverItem = useRef();
    useEffect(() => {
        setList(tasks)
    }, [tasks])
    const handleAdd = (e) => {
        e.preventDefault()
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
    const onDrop = (e) => {
        let id = e.dataTransfer.getData("id");
        dispatch(changeTaskColumn({ columnId, taskId: id }))
    };
    return (
        <div key={columnId} className='column_card_wrapper' onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, columnId)}>
            <div className='header_inner'>
                <h1 onBlur={handleEditColumn} suppressContentEditableWarning={true} onInput={(e) => { setColumnName(e.target.innerText) }} contentEditable={true}>{name}</h1>
                <AiOutlineClose onClick={handleDeleteColumn} size={20} className='close_icon' />
            </div>
            {list.length !== 0 && list.map((data, index) => (
                <Card key={data.taskId} dragItem={dragItem} dragOverItem={dragOverItem} name={data.taskName} setList={setList} tasks={list} index={index} taskId={data.taskId} columnId={columnId} />
            ))
            }
            <form onSubmit={handleAdd}>

                <div className='add_tasks_input'>
                    <input required value={taskName} onChange={(e) => { setTaskName(e.target.value) }} className='add_tasks_input' placeholder='Add Tasks' type="text" />
                    <button type="submit">
                        <AiOutlinePlusCircle size={20} className='add_tasks' />
                    </button>
                </div>
            </form>

        </div>
    )
}

export default ColumnCard