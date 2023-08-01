export default function TableView({data}) {
  return (
    <div className="rounded-xl border bg-purple-700 w-full">
      <table className="table-auto w-full my-8">
        <thead>
          <tr>
            <th className="border-b text-white text-left p-4">Brand</th>
            <th className="border-b text-white text-left p-4">Model</th>
            <th className="border-b text-white text-left p-4">Unit Sold</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border-b p-4 bg-white">{item.brand}</td>
              <td className="border-b p-4 bg-white">{item.model}</td>
              <td className="border-b p-4 bg-white">{item.sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
