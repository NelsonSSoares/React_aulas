import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [input , setInput] = useState("");
  const [editTask, setEditTask] = useState({
    enabled: false,
    task: ''
  })

  useEffect(()=>{
    const tasksLoaded = localStorage.getItem("Tarefas");
    if(tasksLoaded){
      setTasks(JSON.parse(tasksLoaded))
    }
    console.log(tasksLoaded);
    
  },[]);


  function handleRegister(){
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
    localStorage.setItem("Tarefas", JSON.stringify([...tasks, input]));

  }


  function handleSafeEdit(){
    const findIndex = tasks.findIndex(task => task === editTask.task);
    const allTasks = [...tasks];
    allTasks[findIndex] = input;
    setTasks(allTasks);
    setEditTask({
      enabled: false,
      task: ''
    });
    setInput('');
    localStorage.setItem("Tarefas", JSON.stringify(allTasks));
  }

  function handleDelete(item: string){
      const removetask = tasks.filter(task => task !== item)
      setTasks(removetask);
      localStorage.setItem("Tarefas", JSON.stringify(removetask));
  }
  function handleEdit(item : string){
    setInput(item)
    setEditTask({
      enabled: true,
      task: item
    });
  }

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <input type="text"
        placeholder='Digite o nome da tarefa'
        value={input}
        onChange={(e) => setInput(e.target.value)} />
      <hr/>
      <button onClick={handleRegister}>{editTask.enabled ?"Atualizar Tarefa": "Adicionar Tarefa"}</button>

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

export default App
