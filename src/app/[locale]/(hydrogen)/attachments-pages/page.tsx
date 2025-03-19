'use client';
import PasswordSettingsView from '@/app/shared/attachmentspages/password-settings';
import PageHeader from '@/app/shared/page-header';
import ToggleSection from '@/app/shared/ToggleSectionHome';
import Spinner from '@/components/ui/spinner';
import { routes } from '@/config/routes';
import { usePages} from '@/framework/attachments';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfileSettingsFormPage() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  if (!params.get('section_id')) params.set('section_id', '1');
  const { data, isLoading } = usePages(params.get('page_id') || '1');
  console.log('section data', data);
  let [key,setKey]=useState(0)

  const pageHeader = {
    title: `${data?.data?.name?.en+" Introduction Screen"}`,
    breadcrumb: [
      {
        href: routes.pages.index,
        name: 'Home',
      },
      {
        name: `${data?.data?.name?.en+" Introduction Screen"}`,
      },
    ],
  };

  useEffect(()=>{
    setKey(key+1)
  },[params.get('section_id')])

  return (
    <>
      {isLoading ? (
        <div className="m-auto">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <PageHeader
            title={pageHeader.title}
            breadcrumb={pageHeader.breadcrumb}
          ></PageHeader>
          {params.get('page_id')=="1"&&(

<ToggleSection
              // key={key}
              page_id={data?.data?.id}
              section_id={data?.data?.id || '1'}
              active={data?.section?.active ?? 1}
              priority={data?.section?.priority ?? 1}
              titleEn={data?.data?.name?.en}
              titleAr={data?.data?.name?.ar}
              sliders={data?.data?.sliders}
              slug={data?.data?.slug}
              service={true}
            />

          )}
              <PasswordSettingsView
                settings={{
                  title: data?.data?.title?data?.data?.title:{en:"",ar:""},
                  description: data?.data?.description? data.data?.description : {en:"",ar:""},
                  sliders: data?.data?.sliders ? data?.data?.sliders[0] : null,
                }}
                formData={data?.data}
              />
              <br />
              <hr />
              <br />
        </>
      )}
    </>
  );
}
