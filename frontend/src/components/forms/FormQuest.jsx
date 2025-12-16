import { useState } from "react";
import Quest from "../../objetos/entidades/Quest.mjs";

export default function FormQuest({ aoSalvar, listaTurmas }) {
    const [titulo, setTitulo] = useState("");
    const [xp, setXp] = useState(100);
    const [turmaId, setTurmaId] = useState("");

    const manipularEnvio = (e) => {
        e.preventDefault();
        
        if (!turmaId) {
            alert("Selecione uma turma para vincular a missão!");
            return;
        }
        const novaQuest = new Quest(null, titulo, "Sem descrição", xp, new Date(), "Normal", turmaId);
        
        aoSalvar(novaQuest);
        
        setTitulo("");
        setXp(100);
    };

    return (
        <form onSubmit={manipularEnvio} className="bg-gray-100 p-4 rounded shadow mb-6">
            <h3 className="font-bold mb-3">Nova Missão</h3>
            <div className="flex gap-4">
                <input 
                    type="text" 
                    placeholder="Título da Missão"
                    className="border p-2 rounded w-full"
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                    required
                />
                <input 
                    type="number" 
                    placeholder="XP"
                    className="border p-2 rounded w-24"
                    value={xp}
                    onChange={e => setXp(e.target.value)}
                    required
                />
                <select 
                    className="border p-2 rounded w-full"
                    value={turmaId}
                    onChange={e => setTurmaId(e.target.value)}
                    required
                >
                    <option value="">-- Selecione a Turma --</option>
                    {listaTurmas.map((turma) => (
                        <option key={turma.id} value={turma.id}>
                            {turma.nome} ({turma.codigo})
                        </option>
                    ))}
                </select>

                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    Salvar
                </button>
            </div>
        </form>
    );
}