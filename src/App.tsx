import { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [input , setInput] = useState("");
  const [editTask, setEditTask] = useState({
    enabled: false,
    task: ''
  })

  const inputRef = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);

  useEffect(()=>{
    const tasksLoaded = localStorage.getItem("Tarefas");
    if(tasksLoaded){
      setTasks(JSON.parse(tasksLoaded));
    }
    console.log(tasksLoaded);
    
  },[]);

  useEffect(()=>{
    if(firstRender.current){
      firstRender.current = false
      return
    }
  
    localStorage.setItem("Tarefas", JSON.stringify(tasks));
  },[tasks])

  const handleRegister = useCallback(()=>{
     inputRef.current?.focus();
    

    if(!input){
      alert('Preencha sua trefa')
      return
    }

    if(editTask.enabled){
      handleSaveEdit();
      return
    }
    setTasks(tasks => [...tasks, input])
    setInput("")
  },[input, tasks])

  /* function handleRegister(){
    inputRef.current?.focus();
    

    if(!input){
      alert('Preencha sua trefa')
      return
    }

    if(editTask.enabled){
      handleSafeEdit();
      return
    }
    setTasks(tasks => [...tasks, input])
    setInput("")
    //localStorage.setItem("Tarefas", JSON.stringify([...tasks, input]));
    
  } */


  function handleSaveEdit(){
    const findIndex = tasks.findIndex(task => task === editTask.task);
    const allTasks = [...tasks];
    allTasks[findIndex] = input;
    setTasks(allTasks);
    setEditTask({
      enabled: false,
      task: ''
    });
    setInput('');
//    localStorage.setItem("Tarefas", JSON.stringify(allTasks));
  }

  function handleDelete(item: string){
      const removetask = tasks.filter(task => task !== item)
      setTasks(removetask);
//      localStorage.setItem("Tarefas", JSON.stringify(removetask));
  }
  function handleEdit(item : string){
    setInput(item)
    setEditTask({
      enabled: true,
      task: item
    });
  }

  const totalTask = useMemo(()=>{
    return tasks.length
  },[tasks]);

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <input 
        ref={inputRef}
        type="text"
        placeholder='Digite o nome da tarefa'
        value={input}
        onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleRegister}>{editTask.enabled ?"Atualizar Tarefa": "Adicionar Tarefa"}</button>
      <hr/>
      <strong>Você tem {totalTask} tarefas</strong>
      <br/><br/>
      {tasks.map((item, index) =>(
        <section key={index}>
          <span>{item}</span>
          <button onClick={()=> handleEdit(item)}>Editar</button>
          <button onClick={()=> handleDelete(item)}>Excluir</button>
          </section>
      ))}
    </div>
  )
}

export default App;
