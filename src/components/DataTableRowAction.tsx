import { Row } from '@tanstack/react-table';
import { Trash2 ,UserRoundPen   } from "lucide-react"


interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit: (value: TData) => void;
  onDelete: (value: TData) => void;
}

const DataTableRowActions = <TData,>({ row, onEdit, onDelete }: DataTableRowActionsProps<TData>) => {
  return (
    <div className=" flex gap-2  items-center hover: cursor-pointer " >
    <UserRoundPen onClick={ () => onEdit(row.original)} />
      <Trash2 color='red' onClick={ () => onDelete(row.original)}   />
</div>  
  );
};

export default DataTableRowActions;