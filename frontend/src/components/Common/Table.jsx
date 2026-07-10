export default function Table({ headers, data }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {headers?.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((row, idx) => (
          <tr key={idx}>
            {Object.values(row).map((cell, i) => (
              <td key={i}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
