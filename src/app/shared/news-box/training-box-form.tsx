'use client';

import { useModal } from '@/app/shared/modal-views/use-modal';
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Title } from '@/components/ui/text';
import {
  BrandFormInput,
  BrandFormSchema,
} from '@/utils/validators/reports-form.schema';
import { useState,useEffect } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { PiXBold } from 'react-icons/pi';
import CreatableSelect from 'react-select';
import { Textarea } from 'rizzui';

import { DatePicker } from '@/components/ui/datepicker';
import { format } from "date-fns";
import Spinner from '@/components/ui/spinner';
import Upload from '@/components/ui/upload';
import { useCreateReport, useUpdateReport } from '@/framework/reports';
import { formatDate } from '@/utils/format-date';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import FormGroup from '../form-group';
import { useBrand, useCreateBrand, useUpdateBrand } from '@/framework/brand';
import { useTrainingbox } from '@/framework/training-box'
import {
  ServiceTrainingBoxFormInput,
  ServiceTrainingFormBoxSchema,
} from '@/utils/validators/service-training-form-box.schema';
import { useCreateTraining, useUpdatetraining } from '@/framework/training-box';

export default function UpdateCreateBrand({
  text,
  initValues,
}: {
  text?: any;
  initValues?: any;
}) {
  const { closeModal } = useModal();
  const [selectedDate, setSelectedDate] = useState<Date>(
    initValues?.date && !isNaN(new Date(initValues.date).getTime())
      ? new Date(initValues.date)
      : new Date()
  );
    

  const [active, setactive] = useState<number>(
    initValues ? initValues.active : 0
  );
  const { data: trainingPerantData, isLoading: isTrainingPerantLoading } = useTrainingbox();

  const [reset, setReset] = useState({});
  const { data, isLoading: loading } = useBrand();
  const { mutate: update } = useUpdatetraining();
  const { mutate: create, isPending } = useCreateTraining();
  const [isoading, setLoading] = useState(false);
  const [isImageData, setImage] = useState(initValues ? initValues?.image : null);
  let [imageError, setImageError] = useState(0);


 const [show, setshow] = useState<number>(
    initValues?.show_in_home_page ?? 1
  );
  useEffect(() => {
    if (initValues?.show_in_home_page !== undefined) {
      setshow(initValues.show_in_home_page);
    }
  }, [initValues?.show_in_home_page]);

  const typeOptions = trainingPerantData

  ? trainingPerantData.data.map((item: any) => ({
      value: item.id, 
      label: item.name.en, 
    }))
  : [];


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

  const onSubmit: SubmitHandler<ServiceTrainingBoxFormInput> = (data) => {
    console.log(data);

    const formattedDate = selectedDate ? format(selectedDate, "dd-MM-yyyy") : null;


      if (initValues) {
        // lang == 'en' ? setNameEn(data.name) : setNameAr(data.name)
        update({
          name: {
            en: data.nameEN,
            ar: data.nameAR,
          },
          active: active,
          // title: {
          //   en: data.titleEN,
          //   ar: data.titleAR,
          // },
          description: {
            en: data.descriptionEN,
            ar: data.descriptionAR,
          },
          // brands: data.brands.map((brand) => brand.value),
          image: isImageData || initValues.image,
          brand_id: initValues.id,
          type_id: data.type,
          show_in_home_page: show,
          date: formattedDate
        });
      } else {
        create({
          name: {
            en: data.nameEN,
            ar: data.nameAR,
          },
          active: active,
          type_id: data.type,
          // title: {
          //   en: data.titleEN,
          //   ar: data.titleAR,
          // },
          description: {
            en: data.descriptionEN,
            ar: data.descriptionAR,
          },
          show_in_home_page: show,
          // brands: data.brands.map((brand) => brand.value),
          image: isImageData,
          date: formattedDate
          // type_id: data.type
        });
      }
      setReset({
        roleName: '',
      });

      closeModal();
  };

  return (
    <>
      <Form<ServiceTrainingBoxFormInput>
        resetValues={reset}
        onSubmit={onSubmit}
        validationSchema={ServiceTrainingFormBoxSchema}
        useFormProps={{
          defaultValues: {
            nameEN: initValues?.name?.en || '',
            nameAR: initValues?.name?.ar || '',
            descriptionEN: initValues?.description?.en || '',
            descriptionAR: initValues?.description?.ar || '',
            // titleEN: initValues?.title?.en || '',
            // titleAR: initValues?.title?.ar || '',
            // brands: initValues
            //   ? initValues?.brands?.map((brand: any) => {
            //       return { label: brand.name.en, value: brand.id };
            //     })
            //   : [],
          },
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
                  {initValues ? 'Update Service' : 'Add a new Service'}
                </Title>
                <ActionIcon size="sm" variant="text" onClick={closeModal}>
                  <PiXBold className="h-auto w-5" />
                </ActionIcon>
              </div>
              <Input
                label={'Name EN'}
                placeholder={'Name EN'}
                {...register('nameEN')}
                error={errors.nameEN?.message}
              />
              <Input
                label={'Name AR'}
                placeholder={'Name AR'}
                {...register('nameAR')}
                error={errors.nameAR?.message}
              />
              <FormGroup
                title='Select Category'
                className=" @2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-11"
                >
               <Controller
            name="type"
            control={control}
            render={({ field: { value, onChange } }) => (
              <CreatableSelect
                styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        boxShadow: '',
                        borderColor: `${errors?.type?.message ? 'red' : 'none'}`,
                    }),
                }}
                placeholder={initValues?.type?.name?.ar}
                isMulti={false}
                className="w-full pt-2"
                closeMenuOnSelect={true}
                options={typeOptions} // البيانات من API
                value={typeOptions.find((option:any) => option.value === value)} // الربط مع القيمة المحددة
                onChange={(selectedOption: any) =>
                  onChange(selectedOption?.value)
                }
                isLoading={isTrainingPerantLoading} // عرض حالة التحميل
            />
            )}
          />
            </FormGroup>
               {/* <Input
                label={'Title EN'}
                placeholder={'Title EN'}
                {...register('titleEN')}
                error={errors.titleEN?.message}
              />
              <Input
                label={'Title AR'}
                placeholder={'Title AR'}
                {...register('titleAR')}
                error={errors.titleAR?.message}
              /> */}
              <Textarea
                label={'Description EN'}
                placeholder={'Description EN'}
                {...register('descriptionEN')}
                error={errors.descriptionEN?.message}
              />
              <Textarea
                label={'Description AR'}
                placeholder={'Description AR'}
                {...register('descriptionAR')}
                error={errors.descriptionAR?.message}
              />

              {/* <FormGroup
                title="Brands"
                className="pt-2 @2xl:pt-2 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  control={control}
                  name="brands"
                  render={({ field: { value, onChange } }) => (
                    <CreatableSelect
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          boxShadow: '',
                          borderColor: `${
                            errors?.brands?.message ? 'red' : 'none'
                          }`,
                        }),
                      }}
                      placeholder="Select Store"
                      isMulti
                      isLoading={loading}
                      className="w-full pt-2"
                      closeMenuOnSelect={true}
                      options={data?.data?.map((cat: any) => {
                        return { label: cat.name.en, value: cat.id };
                      })}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <span className="rizzui-input-error-text mt-0.5 text-xs text-red">
                  {errors?.brands?.message ? 'is Required' : ''}
                </span>
              </FormGroup> */}
                <FormGroup title="Date">
              <div className="col-span-full">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date | null) => setSelectedDate(date || new Date())}
                  dateFormat="dd-MM-yyyy"
                  className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none"
                />
              </div>
            </FormGroup>


              <FormGroup
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
                  <p className="rizzui-input-error-text mt-0.5 text-xs text-red">
                    Image Requerd
                  </p>
                ) : (
                  ''
                )}
              </FormGroup>
              <FormGroup
                title="Show In Home Page"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <div className="col-span-full">
                  <div className="flex flex-wrap gap-3 px-1">
                    <Checkbox
                      key={2}
                      label={'Show'}
                      checked={show === 1}
                      // value={permission.id}
                      onChange={() => setshow(1)}
                    />
                    <Checkbox
                      key={3}
                      label={'Hidden'}
                      checked={show === 0}
                      // value={permission.id}
                      onChange={() => setshow(0)}
                    />
                  </div>
                </div>
              </FormGroup>
            
              <FormGroup
                title="Activation"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <div className="col-span-full">
                  <div className="flex flex-wrap gap-3 px-1">
                    <Checkbox
                      key={1}
                      label={'Active'}
                      checked={active == 1}
                      // value={permission.id}
                      onChange={() => setactive(active ? 0 : 1)}
                    />
                    <Checkbox
                      key={0}
                      label={'Not Active'}
                      checked={active == 0}
                      // value={permission.id}
                      onChange={() => setactive(active ? 0 : 1)}
                    />
                  </div>
                </div>
              </FormGroup>
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
                  {initValues ? 'Update Service' : 'Create Service'}
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </>
  );
}
