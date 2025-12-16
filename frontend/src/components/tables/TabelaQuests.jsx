export default function TabelaQuests({ listaQuests, aoExcluir }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b text-left">Título</th>
                        <th className="py-2 px-4 border-b text-center">XP</th>
                        <th className="py-2 px-4 border-b text-center">Turma Vinculada</th>
                        <th className="py-2 px-4 border-b text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listaQuests.map((quest) => (
                        <tr key={quest.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">{quest.titulo}</td>
                            <td className="py-2 px-4 border-b text-center">{quest.xpReward} XP</td>
                            <td className="py-2 px-4 border-b text-center text-blue-600 font-medium">
                                {quest.turma ? quest.turma.nome : "Sem Vínculo"}
                            </td>
                            
                            <td className="py-2 px-4 border-b text-center">
                                <button 
                                    onClick={() => aoExcluir(quest.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                    {listaQuests.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center py-4 text-gray-500">Nenhuma missão cadastrada.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}