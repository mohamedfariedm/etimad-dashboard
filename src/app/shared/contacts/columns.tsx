'use client';

import DateCell from '@/components/ui/date-cell';
import { HeaderCell } from '@/components/ui/table';
import { ActionIcon, Tooltip } from 'rizzui';
import CreateButton from '../create-button';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '../delete-popover';
import TrashIcon from '@/components/icons/trash';

type Columns = {
  data: any[];
  permitions?: string[];
  sortConfig?: any;
  onDeleteItem: (id: string[]) => void;
  text_tr?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  permitions,
  sortConfig,
  text_tr,
  onDeleteItem,
  checkedItems,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 20,
    render: (_: string, row: any) => (
      <div className="flex items-center gap-3">
        
        <DeletePopover
          title={`Delete contact`}
          description={`Are you sure you want to delete this #${row.id} `}
          onDelete={() => onDeleteItem([row.id])}
        >
          <ActionIcon
            size="sm"
            variant="outline"
            aria-label={'Delete contact'}
            className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
          >
            <TrashIcon className="h-4 w-4" />
          </ActionIcon>
        </DeletePopover>
      </div>
    ),
  },
  {
    title: <HeaderCell title="Name" align="center" />,
    dataIndex: 'full_name',
    key: 'full_name',
    width: 200,
    hidden: 'full_name',
    render: (_: string, row: any) => (
      <div className="w-full  text-center">{row?.full_name} </div>
    ),
  },
  {
    title: <HeaderCell title="Email" align="center" />,
    dataIndex: 'email',
    key: 'email',
    width: 200,
    hidden: 'email',

    render: (_: string, row: any) => (
      <div className="w-full  text-center">{row?.email} </div>
    ),
  },
  {
    title: <HeaderCell title="Phone" align="center" />,
    dataIndex: 'phone',
    key: 'phone',
    width: 200,
    hidden: 'phone',

    render: (_: string, row: any) => (
      <div className="w-full  text-center">{row?.phone} </div>
    ),
  },
  {
    title: <HeaderCell title="Message" align="center" />,
    dataIndex: 'message',
    key: 'message',
    width: 200,
    hidden: 'message',
    render: (_: string, row: any) => (
      <Tooltip
        showArrow
        className=" "
        content={() => <div className="  max-w-[400px] ">{row?.message}</div>}
      >
        <div className="mx-auto line-clamp-2 max-w-[400px] text-center">
          {row?.message}
        </div>
      </Tooltip>
    ),
  },
  {
    title: (
      <HeaderCell
        title={text_tr.brands.created}
        sortable
        align="center"
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'created_at'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('created_at'),
    dataIndex: 'created_at',
    key: 'created_at',
    width: 80,
    render: (value: Date) => <DateCell date={value} />,
  },
];
