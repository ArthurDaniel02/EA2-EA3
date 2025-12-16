import { useState } from "react";
import Turma from "../../objetos/entidades/Turma.mjs";

export default function FormTurma({ aoSalvar, listaProfessores }) {
    const [nome, setNome] = useState("");
    const [codigo, setCodigo] = useState("");
    const [profId, setProfId] = useState("");

    const manipularEnvio = (e) => {
        e.preventDefault();
        const novaTurma = new Turma(null, nome, codigo, "2025.1", "Online", true, profId);
        aoSalvar(novaTurma);
        setNome("");
        setCodigo("");
    };

    return (
        <form onSubmit={manipularEnvio} className="bg-gray-100 p-4 rounded shadow mb-6">
            <h3 className="font-bold mb-3">Nova Turma</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input 
                    placeholder="Nome da Turma" 
                    className="border p-2 rounded"
                    value={nome} onChange={e => setNome(e.target.value)} required
                />
                <input 
                    placeholder="Código (Ex: T01)" 
                    className="border p-2 rounded"
                    value={codigo} onChange={e => setCodigo(e.target.value)} required
                />
                <select 
                    className="border p-2 rounded"
                    value={profId} onChange={e => setProfId(e.target.value)}
                    required
                >
                    <option value="">-- Selecione o Professor --</option>
                    {listaProfessores.map(p => (
                        <option key={p.id} value={p.id}>{p.nome}</option>
                    ))}
                </select>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-2">Salvar</button>
            </div>
        </form>
    );
}