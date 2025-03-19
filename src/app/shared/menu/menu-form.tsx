'use client';

import { useModal } from '@/app/shared/modal-views/use-modal';
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Title } from '@/components/ui/text';

import Spinner from '@/components/ui/spinner';
import Upload from '@/components/ui/upload';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

import { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { PiXBold } from 'react-icons/pi';

import { useCreateFaqs, useUpdateFaqs } from '@/framework/faqs';
import DOMPurify from 'isomorphic-dompurify';

import QuillLoader from '@/components/loader/quill-loader';
import dynamic from 'next/dynamic';
import FormGroup from '../form-group';
import { Checkbox } from 'rizzui';
import { PageFormInput, PageFormSchema } from '@/utils/validators/pages-form.schema copy';
import { useCreatePage, useUpdatePage } from '@/framework/pages';
import { MenuFormInput, MenuFormSchema } from '@/utils/validators/menu-form.schema';
import { useCreateMenu, useUpdateMenu } from '@/framework/menu';



const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function UpdateCreateMenu({
  text,
  initValues,
}: {
  text?: any;
  initValues?: any;
}) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const { mutate: update } = useUpdateMenu();
  const { mutate: create, isPending } = useCreateMenu();
  const [isoading, setLoading] = useState(false);
  let [imageError, setImageError] = useState(0);
  const [isImageData, setImage] = useState(initValues ? initValues?.image : null);
  const [show_in_home_page, setshow] = useState<number>(
    initValues ? initValues.active : 0
  );


  const handleFileUpload = (event: any, type: 'Image' | 'File') => {
    setLoading(true);
    const file = event.target.files?.[0];
    const formData = new FormData();
    formData.append('attachment[]', file);
    axios
      .post(process.env.NEXT_PUBLIC_ATTACHMENT_URL as string, formData, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Cookies.get('auth_token')}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        if (type === 'Image') {
          setImage(response.data.data);
        }
        toast.success(`${type} Uploaded successfully`);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Please Try Again');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSubmit: SubmitHandler<MenuFormInput> = (data) => {
    if (initValues) {
      update({
        ...data,
        id: initValues.id,
        active:show_in_home_page
      });
    } else {
      create({...data,active:show_in_home_page});
    }
    setReset({
      roleName: '',
    });

    closeModal();
  };

  return (
    <>
      <Form<MenuFormInput>
        resetValues={reset}
        onSubmit={onSubmit}
        validationSchema={MenuFormSchema}
        useFormProps={{
          defaultValues: initValues,
        }}
        className="flex flex-grow flex-col gap-6 overflow-y-auto p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
      >
        {({
          register,
          getValues,
          control,
          setValue,
          formState: { errors, isLoading },
        }) => {
          return (
            <>
              <div className="flex items-center justify-between">
                <Title as="h4" className="font-semibold">
                  {initValues ? 'Update Menu' : 'Add Menu Item'}
                </Title>
                <ActionIcon size="sm" variant="text" onClick={closeModal}>
                  <PiXBold className="h-auto w-5" />
                </ActionIcon>
              </div>

              <Input
                label={'Name EN'}
                placeholder={'Name EN'}
                {...register('name.en')}
                error={errors.name?.en?.message}
              />
              <Input
                label={'Name AR'}
                placeholder={'Name AR'}
                {...register('name.ar')}
                error={errors.name?.ar?.message}
              />
              <Input
                label={'Link AR'}
                placeholder={'Link AR'}
                {...register('link.ar')}
                error={errors.link?.ar?.message}
              />
              <Input
                label={'Link EN'}
                placeholder={'Link EN'}
                {...register('link.en')}
                error={errors.link?.en?.message}
              />

            


              <FormGroup
                title="Active"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <div className="col-span-full">
                  <div className="flex flex-wrap gap-3 px-1">
                    <Checkbox
                      key={1}
                      label={'Show'}
                      checked={show_in_home_page == 1}
                      // value={permission.id}
                      onChange={() => setshow(show_in_home_page ? 0 : 1)}
                    />
                    <Checkbox
                      key={0}
                      label={'Hide'}
                      checked={show_in_home_page == 0}
                      // value={permission.id}
                      onChange={() => setshow(show_in_home_page ? 0 : 1)}
                    />
                  </div>
                </div>
              </FormGroup>
              {/* <FormGroup
                title="Image"
                className="relative pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                {isoading && (
                  <div className="absolute z-10 m-auto flex h-[100%] w-[100%] items-center justify-center ">
                    <Spinner size="xl" />
                  </div>
                )}
                <Upload
                  title="image"
                  accept="img"
                  onChange={(e) => {
                    setImageError(0);
                    handleFileUpload(e, 'Image');
                  }}
                />
                {imageError ? (
                  // "faried Error"
                  <p className="rizzui-input-error-text mt-0.5 text-xs text-red">
                    Image Requerd
                  </p>
                ) : (
                  ''
                )}
              </FormGroup> */}

              <div className="flex items-center justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={closeModal}
                  className="w-full @xl:w-auto"
                >
                  {'Cancel'}
                </Button>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full @xl:w-auto"
                >
                  {initValues ? 'Update Menu' : 'Create Menu Item'}
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </>
  );
}
