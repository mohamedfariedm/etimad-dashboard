'use client';

import DateCell from '@/components/ui/date-cell';
import { HeaderCell } from '@/components/ui/table';
import Link from 'next/link';
import DeletePopover from '../delete-popover';
import { ActionIcon } from 'rizzui';
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
    dataIndex: 'name',
    key: 'name',
    width: 200,
    hidden: 'name',
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
    title: <HeaderCell title="Mobile Number" align="center" />,
    dataIndex: 'mobile_number',
    key: 'mobile_number',
    width: 200,
    hidden: 'mobile_number',

    render: (_: string, row: any) => (
      <div className="w-full  text-center">{row?.phone} </div>
    ),
  },
  {
    title: <HeaderCell title="Message" align="center" />,
    dataIndex: 'type',
    key: 'type',
    width: 200,
    hidden: 'type',

    render: (_: string, row: any) => (
      <div className="w-full  text-center">{row?.message} </div>
    ),
  },
  {
    title: <HeaderCell title="Reason" align="center" />,
    dataIndex: 'type',
    key: 'type',
    width: 200,
    hidden: 'type',

    render: (_: string, row: any) => (
      <div className="w-full  text-center">{row?.reson} </div>
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
  // {
  //   title: <HeaderCell title="" align="center" />,
  //   dataIndex: 'id',
  //   key: 'id',
  //   width: 200,
  //   hidden: 'id',
  //   render: (_: string, row: any) => (
  //     <Link
  //       className="mx-auto block w-fit hover:underline"
  //       href={`/Companyregister/${row?.id}`}
  //     >
  //       View More
  //     </Link>
  //   ),
  // },
];
