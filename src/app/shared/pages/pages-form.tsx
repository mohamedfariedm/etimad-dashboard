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



const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function UpdateCreatePage({
  text,
  initValues,
}: {
  text?: any;
  initValues?: any;
}) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const { mutate: update } = useUpdatePage();
  const { mutate: create, isPending } = useCreatePage();
  const [isoading, setLoading] = useState(false);
  let [imageError, setImageError] = useState(0);
  const [isImageData, setImage] = useState(initValues ? initValues?.image : null);
  const [show_in_home_page, setshow] = useState<number>(
    initValues ? initValues.show_in_home_page : 0
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

  const onSubmit: SubmitHandler<PageFormInput> = (data) => {
    if (initValues) {
      update({
        ...data,
        id: initValues.id,
        type:"pages"
      });
    } else {
      create({...data,type:"pages","attachment": []});
    }
    setReset({
      roleName: '',
    });

    closeModal();
  };

  return (
    <>
      <Form<PageFormInput>
        resetValues={reset}
        onSubmit={onSubmit}
        validationSchema={PageFormSchema}
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
                  {initValues ? 'Update Page' : 'Add a new Page'}
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
                label={'Mini Description EN'}
                placeholder={'Mini Description EN'}
                {...register('title.en')}
                error={errors.title?.en?.message}
              />
              <Input
                label={'Mini Description AR'}
                placeholder={'Mini Description AR'}
                {...register('title.ar')}
                error={errors.title?.ar?.message}
              />

              <Controller
                control={control}
                name="description.en"
                render={({ field: { onChange, value } }) => (
                  <QuillEditor
                    value={DOMPurify.sanitize(value || '')}
                    onChange={onChange}
                    label="Description EN"
                    className="col-span-full [&_.ql-editor]:min-h-[100px]"
                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                  />
                )}
              />
              <Controller
                control={control}
                name="description.ar"
                render={({ field: { onChange, value } }) => (
                  <QuillEditor
                    value={DOMPurify.sanitize(value || '')}
                    onChange={onChange}
                    label="Description AR"
                    className="col-span-full [&_.ql-editor]:min-h-[100px]"
                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                  />
                )}
              />
 <Input
                label={'Slug'}
                placeholder={'Slug'}
                {...register('slug')}
                error={errors?.slug?.message}
              />


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
                  {initValues ? 'Update Page' : 'Create Page'}
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </>
  );
}
