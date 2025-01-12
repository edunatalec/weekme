export interface Column<T> {
  name?: string;
  key?: keyof T;
  render?: (item: T) => React.ReactNode;
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
}

export const SearchTable = ({ data, columns }: Props<any>) => {
  return (
    <div className="mx-4 flex-1 overflow-auto rounded-md border">
      <table className="w-full table-auto text-left [&_td]:p-4 [&_th]:p-4 [&_tr]:border-b">
        <thead>
          <tr className="sticky top-0 bg-background">
            {columns.map((column, i) => (
              <th key={i}>{column.name}</th>
            ))}
          </tr>
        </thead>
        <tbody className="border-b">
          {data.map((item, i) => (
            <tr key={i} className="text-sm font-normal leading-normal">
              {columns.map((column, j) => {
                if (column.key === "id") {
                  return (
                    <td key={j} className="w-[320px] max-w-[320px] truncate">
                      {item[column.key]}
                    </td>
                  );
                }

                return (
                  <td key={j}>
                    {column.render ? column.render(item) : item[column.key!]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
