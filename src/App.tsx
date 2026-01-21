import { useState } from 'react';
import './App.css';

function App() {
  //const [signed, setSigned] = useState(false);

  const [username, setUsername] = useState("Nelson");

 
  return (

    <div>
      {username.length >= 5 && <h1>Username muito grande</h1>}
    



    {/*
      <button onClick={()=> setSigned(true)}>ENTRAR</button>

    {signed && <div>
       <h1>Bem vindo Nelson</h1>
       <p>usuario online!</p><br/>
      <button onClick={()=> setSigned(false)}>SAIR</button>

      </div>} */}

    {/*       {signed ? (
        <h1>Bem vindo Nelson</h1>
      ):(
        <h1>Nenhum usuario online</h1> 
        
      )} */}
      </div>
  );
}

export default App;
