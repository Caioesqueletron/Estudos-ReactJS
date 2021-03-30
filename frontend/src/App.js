import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import api from './services/api'

function App() {
    const [projects, setProjects] = useState([])
    //useState retorna um array com 2 posições
    //
    //1.Variavel com o seu valor inicial
    //2.Função para atualizarmos esse valor

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data)
        })
    },[])

    async function handleAddProject() {
       // setProjects([...projects, `Novo projeto ${Date.now()}`])
        //projects.push(`Novo projeto ${Date.now()}`)
        
      const response =  await api.post('projects',{
            title:`Novo projeto ${Date.now()}`,
            owner: "Caio"
        })

        const project = response.data;

        setProjects([...projects,project])
    
    }

    return (
        <div>

            <Header title="Homepage" />
            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>
            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        </div>


    )
}

export default App;