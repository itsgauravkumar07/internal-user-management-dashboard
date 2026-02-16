export default function Table({ columns, data, renderActions }){
    return(
        <div className="bg-slate-300/5 rounded-lg overflow-hidden">
             <table className="text-slate-300 table-fixed w-full">
                <thead className="bg-slate-800 text-sm text-left">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className="px-5">
                                {col.label}
                            </th>
                        ))}
                        {renderActions && <th className="py-4 px-10 text-end">Active</th>}
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
                            <td className="py-4 px-5 text-end">
                                {renderActions(row)} 
                            </td>
                        )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    )
}