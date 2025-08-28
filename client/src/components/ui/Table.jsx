export function Table({ children }) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow">
      <table className="w-full text-left border-collapse">{children}</table>
    </div>
  );
}

export function TableHead({ children }) {
  return <thead className="bg-gray-100">{children}</thead>;
}

export function TableRow({ children }) {
  return <tr className="border-b hover:bg-gray-50">{children}</tr>;
}

export function TableHeader({ children }) {
  return (
    <th className="px-4 py-2 text-sm font-semibold text-gray-700">
      {children}
    </th>
  );
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableCell({ children }) {
  return <td className="px-4 py-2 text-sm text-gray-600">{children}</td>;
}
