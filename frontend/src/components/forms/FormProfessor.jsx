import { useState } from "react";
import Professor from "../../objetos/entidades/Professor.mjs";

export default function FormProfessor({ aoSalvar }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [especialidade, setEspecialidade] = useState("");
    const [nivel, setNivel] = useState("Iniciante"); 

    const manipularEnvio = (e) => {
        e.preventDefault();

        const novoProf = new Professor(null, nome, email, especialidade, nivel);
        
        aoSalvar(novoProf);
        
        setNome("");
        setEmail("");
        setEspecialidade("");
    };

    return (
        <form onSubmit={manipularEnvio} className="bg-gray-100 p-4 rounded shadow mb-6 border-l-4 border-blue-500">
            <h3 className="font-bold mb-3 text-gray-700">Novo Professor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                    type="text" 
                    placeholder="Nome Completo"
                    className="border p-2 rounded w-full"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                />
                <input 
                    type="email" 
                    placeholder="E-mail"
                    className="border p-2 rounded w-full"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="text" 
                    placeholder="Especialidade (Ex: Matemática)"
                    className="border p-2 rounded w-full"
                    value={especialidade}
                    onChange={e => setEspecialidade(e.target.value)}
                    required
                />
                <select 
                    className="border p-2 rounded w-full"
                    value={nivel}
                    onChange={e => setNivel(e.target.value)}
                >
                    <option value="Iniciante">Nível Iniciante</option>
                    <option value="Mestre">Nível Mestre</option>
                    <option value="Doutor">Nível Doutor</option>
                    <option value="Arquimago">Nível Arquimago (RPG)</option>
                </select>

                <button type="submit" className="col-span-1 md:col-span-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    Cadastrar Professor
                </button>
            </div>
        </form>
    );
}