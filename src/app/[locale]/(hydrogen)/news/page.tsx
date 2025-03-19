'use client';
import TableLayout from '@/app/[locale]/(hydrogen)/tables/table-layout';
import * as tr from '@/app/[locale]/dictionaries/index';
import ServicesForm from '@/app/shared/news/training-form';
import ServiceTable from '@/app/shared/news/table-training';
import Spinner from '@/components/ui/spinner';
import { useTraining } from '@/framework/news';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ClientReviewPage({
  params: { locale },
}: {
  params: { locale: any };
}) {
  const searchParams = useSearchParams();
//   const params = new URLSearchParams(searchParams);
//   if (!params.get('page')) params.set('page', '1');
//   if (!params.get('limit')) params.set('limit', '10');
  const { data, isLoading } = useTraining();
  const [selectedColumns, setSelectedColumns] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const text = String(locale) == 'ar' ? tr['ar'] : tr['en'];
  const pageHeader = {
    title: `Services Training`,
    breadcrumb: [
      {
        href: '/',
        name: ` Home`,
      },
      {
        name: `Services Training`,
      },
    ],
  };
  console.log(data);

  return (
    <>
      <>
        {
          <TableLayout
            title={pageHeader.title}
            exelbtn_tr={text.exel_btn}
            pdfbtn_tr={text.pdf_btn}
            breadcrumb={pageHeader.breadcrumb}
            data={{
              columns: selectedColumns
                .filter((column) => column !== 'checked' && column !== 'action')
                .map((column: String) =>
                  column.replace(/\./g, '_').replace(/\s/g, '_')
                ),
              rows: selectedRowKeys,
            }}
            fileName="reports"
            header="User,Created At"
            createName={'Create Service'}
            createElementButton={<ServicesForm text={text} />}
          >
            {isLoading ? (
              <div className="m-auto">
                <Spinner size="lg" />
              </div>
            ) : (
              <ServiceTable
                text_tr={text}
                // permitions={userRole?.data}
                name="NewsTableName"
                data={data?.data}
                getSelectedColumns={setSelectedColumns}
                getSelectedRowKeys={setSelectedRowKeys}
                totalItems={data?.data?.total}
              />
            )}
          </TableLayout>
        }
      </>
    </>
  );
}
