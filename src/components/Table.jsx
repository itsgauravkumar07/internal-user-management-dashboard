export default function Table({ columns, data, renderActions }){
    return(
         <table className="bg-slate-300/5 text-slate-300 rounded-lg table-fixed w-full">
            <thead className="bg-slate-800 text-sm text-left">
                <tr>
                    {columns.map((col) => (
                        <th key={col.key}>
                            {col.data}
                        </th>
                    ))}
                    {renderActions && <th className="p-4">Active</th>}
                </tr>
            </thead>

            <tbody className="text-sm border border-white/10">
                {data.map((row) => (
                    <tr key={row.id} className="border border-white/2">
                       {columns.map((col) => (
                        <td key={col.key} className="py-4 px-5">
                            {row[col.key]}
                        </td>
                       ))}

                       {renderActions &&(
                        <td className="py-4 px-5">
                            {renderActions(row)}
                        </td>
                       )}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}