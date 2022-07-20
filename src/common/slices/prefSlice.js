import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
export const prefSlice = createSlice({
  name: "prefrence",
  initialState: {
    taskData: [
      {
        columnName: "Grocery Store",
        columnId: uuidv4(),
        tasks: [
          {
            name: "Italian Bread",
            id: uuidv4()
          },
          {
            name: "Italian Bread",
            id: uuidv4()
          },
          {
            name: "Italian Bread",
            id: uuidv4()
          },
          {
            name: "Italian Bread",
            id: uuidv4()
          },
          {
            name: "Italian Bread",
            id: uuidv4()
          }

        ]
      },

    ],
    column: [
      {
        name: "To Do",
        columnId: uuidv4()
      }
    ],
    tasks: [

    ]

  },
  reducers: {
    addColumn: (state, action) => {
      state.column.push({
        name: `Column ${state.column.length + 1}`,
        columnId: uuidv4(),
      })
    },
    editColumnName: (state, action) => {
      console.log("coming here")
      // console.log("coming jere")
      const { columnId, columnName } = action.payload
      console.log("🚀 ~ file: prefSlice.js ~ line 59 ~ columnId, columnName", columnId, columnName);
      // console.log("🚀 ~ file: prefSlice.js ~ line 59 ~ action.payload", action.payload);
       state.column.forEach((data, index) => {
        if (data.columnId === columnId) {
          state.column[index].name = columnName
        }
      })
    },
    deleteColumn: (state, action) => {
      console.log("comin ghere")
      const { columnId } = action.payload
      state.column = state.column.filter(data => data.columnId !== columnId)
    },
    addTasks: (state, action) => {
      const { columnId, taskName } = action.payload
      console.log("🚀 ~ file: prefSlice.js ~ line 53 ~ columnId , taskName", columnId, taskName);
      state.tasks.push({
        columnId,
        taskName,
        taskId: uuidv4()
      })
      console.log("🚀 ~ file: prefSlice.js ~ line 59 ~ state.tasks", state.tasks);
    },

    editTasks: () => {

    },
    removeTasks: (state, action) => {
      const { taskId } = action.payload
      console.log("🚀 ~ file: prefSlice.js ~ line 73 ~ action.payload", action.payload);
      console.log("🚀 ~ file: prefSlice.js ~ line 73 ~ taskId", taskId);
      state.tasks = state.tasks.filter(data => data.taskId !== taskId)
    },
    changeTaskColumn :(state, action)=>{
      console.log("coming in pref")
      const { columnId ,taskId} = action.payload
      console.log("🚀 ~ file: prefSlice.js ~ line 94 ~ columnId ,taskId", columnId ,taskId);
      state.tasks.forEach((data,index)=>{
        if(taskId===data.taskId){
          state.tasks[index].columnId=columnId
        }
      })
      
    }



  },
  devTools: true,
});
export const { addColumn, editColumnName, deleteColumn, addTasks, editTasks, removeTasks, changeTaskColumn} =
  prefSlice.actions;
// export const selectCount = (state) => state.languagekey.languagekey;
export const getAllColumn = (state) => state.prefrence.column;
export const getAllTasks = (state) => state.prefrence.tasks;

export default prefSlice.reducer;
