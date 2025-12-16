export default function TabelaProfessores({ listaProfessores, aoExcluir }) {
    return (
        <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Nome</th>
                        <th className="py-3 px-4 text-left">Especialidade</th>
                        <th className="py-3 px-4 text-center">Nível</th>
                        <th className="py-3 px-4 text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listaProfessores.map((prof) => (
                        <tr key={prof.id} className="border-b hover:bg-gray-50 transition">
                            <td className="py-3 px-4 font-medium text-gray-800">
                                {prof.nome}
                                <div className="text-xs text-gray-500">{prof.email}</div>
                            </td>
                            <td className="py-3 px-4 text-gray-600">{prof.especialidade}</td>
                            <td className="py-3 px-4 text-center">
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                                    {prof.nivel}
                                </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                                <button 
                                    onClick={() => aoExcluir(prof.id)}
                                    className="text-red-500 hover:text-red-700 font-bold hover:bg-red-50 px-2 py-1 rounded"
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                    {listaProfessores.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center py-8 text-gray-500 italic">
                                Nenhum professor cadastrado ainda.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}