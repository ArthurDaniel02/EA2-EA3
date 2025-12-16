export default function TabelaTurmas({ listaTurmas, aoExcluir }) {
    return (
        <table className="min-w-full bg-white border">
            <thead>
                <tr className="bg-gray-200">
                    <th className="p-2 text-left">Código</th>
                    <th className="p-2 text-left">Nome</th>
                    <th className="p-2 text-left">Professor</th>
                    <th className="p-2 text-center">Ações</th>
                </tr>
            </thead>
            <tbody>
                {listaTurmas.map((turma) => (
                    <tr key={turma.id} className="border-t">
                        <td className="p-2">{turma.codigo}</td>
                        <td className="p-2">{turma.nome}</td>
                        <td className="p-2 text-gray-600">{turma.professor ? turma.professor.nome : "N/A"}</td>
                        <td className="p-2 text-center">
                            <button onClick={() => aoExcluir(turma.id)} className="text-red-600 font-bold hover:underline">
                                X
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}