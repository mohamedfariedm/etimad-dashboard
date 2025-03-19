'use client';

import { useState, useEffect } from 'react';
import FormGroup from '@/app/shared/form-group';
// import { Form } from '@/components/ui/form';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Input, Button } from 'rizzui';
import { useUpdateServices } from '@/framework/serviceDetails';

interface Section {
  id: number;
  title: { ar: string; en: string } | null;
  slug: string | null;
  page_id: number;
  Posts: { id: number; section_id: number; title: { ar: string; en: string } }[];
}

interface ServiceData {
  id: number;
  name: { ar: string; en: string };
  slug: string;
  sections: Section[];
  created_at: string;
  updated_at: string;
}

export default function DataView({ data }: { data?: ServiceData }) {
  const { mutate: updateService } = useUpdateServices();
  const formMethods = useForm<ServiceData>({
    defaultValues: data || {
      id: 0,
      name: { ar: '', en: '' },
      slug: '',
      sections: [],
      created_at: '',
      updated_at: '',
    },
  });

  const { register, control, handleSubmit, setValue, getValues } = formMethods;
  const [titles, setTitles] = useState<{ ar: string; en: string }[]>([]);

  useEffect(() => {
    if (data) {
      const section32 = data.sections.find((sec) => sec.id === 32);
      setTitles(section32?.Posts.map((post) => post.title) || []);
    }
  }, [data]);

  const handleAddTitle = () => {
    setTitles([...titles, { ar: '', en: '' }]);
  };



  
  const handleTitleChange = (index: number, field: 'ar' | 'en', value: string) => {
    const newTitles = [...titles];
    newTitles[index][field] = value;
    setTitles(newTitles);
  };

  const onSubmit: SubmitHandler<ServiceData> = (formData) => {
    const updatedData = {
      ...formData,
      sections: formData.sections.map((sec) =>
        sec.id === 32 ? { ...sec, Posts: titles.map((t, i) => ({ id: i, section_id: 32, title: t })) } : sec
      ),
    };
    updateService(updatedData);
  };

  return (
    <form {...formMethods} onSubmit={handleSubmit(onSubmit)}>
      <div className="mx-auto w-full max-w-screen-2xl">
        <FormGroup title="Service Name (Arabic)">
          <Input type="text" className="col-span-full" {...register('name.ar')} />
        </FormGroup>

        <FormGroup title="Service Name (English)">
          <Input type="text" className="col-span-full" {...register('name.en')} />
        </FormGroup>

        {titles.length > 0 && (
          <FormGroup title="Section 32 - Titles">
            {titles.map((title, index) => (
              <div key={index} className="flex gap-4 mb-2">
                <Input
                  type="text"
                  className="col-span-full"
                  placeholder="Title (Arabic)"
                  value={title.ar}
                  onChange={(e) => handleTitleChange(index, 'ar', e.target.value)}
                />
                <Input
                  type="text"
                  className="col-span-full"
                  placeholder="Title (English)"
                  value={title.en}
                  onChange={(e) => handleTitleChange(index, 'en', e.target.value)}
                />
              </div>
            ))}
            <Button type="button" onClick={handleAddTitle} className="mt-2">
              + Add More Title
            </Button>
          </FormGroup>
        )}

        <FormGroup title="Created At">
          <Input type="text" className="col-span-full" value={data?.created_at} disabled />
        </FormGroup>
        <FormGroup title="Updated At">
          <Input type="text" className="col-span-full" value={data?.updated_at} disabled />
        </FormGroup>

        <Button type="submit" className="mt-4">Update Service</Button>
      </div>
    </form>
  );
}
