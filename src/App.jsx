import { useEffect, useState } from 'react'
import Navbar from './component/navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
 
  const [todo, setTodo]=useState("")
  const [todos, setTodos]=useState([])
  const [showfinished,setshowfinished]=useState(true)

  useEffect(()=>{
    let todoString=localStorage.getItem("todos")
    if(todoString){
    let todos=JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
  },[])

  const savetols=(params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const togglefinished =(e)=>{
    setshowfinished(!showfinished)

  }

  const handledit= (e,id) =>{
    let t= todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newtodos=todos.filter(item=>{
      return item.id!==id
    });
   
    setTodos(newtodos)
    savetols()

   
  }
  const handledelete=(e,id) =>{
    
    
    let newtodos=todos.filter(item=>{
      return item.id!==id
    });
   
    setTodos(newtodos)
    savetols()
  }


  const handleadd=() =>{
    setTodos([...todos,{id:uuidv4(), todo, iscompleted:false}])
    setTodo("")
    
    savetols()
  }
  const handlechange=(e) =>{
   setTodo(e.target.value)
  }
  const handlecheckbox=(e)=>{
    console.log(e,e.target)
    let id=e.target.name;
    console.log(`the id is ${id}`)
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    console.log(index)
    let newtodos=[...todos];
    newtodos[index].iscompleted=!newtodos[index].iscompleted;
    setTodos(newtodos)
    
    savetols()
  }

  return (
    <>
    <Navbar/>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-blue-300 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-xl'>iTask - Manage your todos at one place</h1>
          <div className="addtodo my-5 flex flex-col gap-4">
            <h2 className='text-lg font-bold'>Add a Todo</h2>
            <input  onChange={handlechange} value={todo} type="text" className='w-full rounded-full px-5 py-1 text-black' />
            <button onClick={handleadd} disabled={todo.length<=3}   className='bg-slate-800 hover:bg-slate-500 p-3 py-1 text-white rounded-md  font-bold disabled:bg-slate-700'>save</button>
          </div>
          <input className='m-y'  onChange={togglefinished} type="checkbox" checked={showfinished} />Show finished
          <h2 className='text-lg font-bold'>Your TODOs</h2>
          <div className="todos">
            {todos.length === 0 &&<div className='m-5'>no todos to display</div>}
            {todos.map(item=>{

            return (showfinished || !item.iscompleted) && <div key={item.id} className="todo flex md:w-1/2 my-3 justify-between ">
              <div className='flex gap-3'>
              <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.iscompleted}  id="" />
              <div className={item.iscompleted?"line-through":""}>{item.todo}</div>
              </div>
             
              <div className="buttons flex h-full ">
                <button onClick={(e)=>handledit(e,item.id)} className='bg-slate-800 hover:bg-slate-500 p-2 py-1 text-white rounded-md mx-1 font-bold'><FaEdit /></button>
                <button  onClick={(e)=>{handledelete(e,item.id)}}className='bg-slate-800 hover:bg-slate-500 p-2 py-1 text-white rounded-md mx-1 font-bold'><AiFillDelete /></button>
              </div>

            </div>
            })}
          </div>
        </div>
    
    </>
  )
}

export default App
