import { Checkbox, Input } from 'rizzui';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useEditSectionSliders } from '@/framework/attachments';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import Spinner from '@/components/ui/spinner';
import Upload from '@/components/ui/upload';
import FormGroup from './form-group';

function ToggleSection({
  page_id,
  section_id,
  active,
  priority,
  titleEn,
  titleAr,
  slug,
  service,
  sliders
}: {
  page_id: any;
  section_id: any;
  active: number;
  priority: number;
  titleEn?: string;
  titleAr?: string;
  slug?: string;
  service?: boolean;
  sliders: any;
}) {
  const { mutate: update, isPending, isSuccess } = useEditSectionSliders();
  const [activation, setActivation] = useState<number>(active);
  const [sectionPeriorty, setSectionPeriorty] = useState<string>(String(priority));
  const [titleEnglish, setTitleEnglish] = useState<string>(titleEn === "Empty" ? "" : titleEn || '');
  const [titleArabic, setTitleArabic] = useState<string>(titleAr === "Empty" ? "" : titleAr || '');
  const [error, setError] = useState<string>('');
  const [link, setLink] = useState<string>(slug || ""); // State for link
  const [isLoading, setLoading] = useState(false);
  const [images, setImages] = useState<Array<any>>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUpdated, setIsUpdated] = useState(false); // لحل مشكلة التحديث بعد الرفع

  useEffect(() => {
    if (Array.isArray(sliders)) {
      setImages(sliders);
    }
  }, [sliders]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success('Section updated successfully');
  //     setIsUpdated(false); // إعادة ضبط حالة التحديث بعد الـ Update
  //   }
  // }, [isSuccess]);

  const handleFileUpload = async (event: any) => {
    setLoading(true);
    const files = event.target.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('attachment[]', files[i]);
    }

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_ATTACHMENT_URL as string, formData, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Cookies.get('auth_token')}`,
        },
      });

      const uploadedFiles = response.data.data;

      setImages((prevImages) => [...prevImages, ...uploadedFiles]); // دمج الصور الجديدة مع السابقة
      setIsUpdated(true); // تحديد أن هناك تحديث جديد

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      toast.success('Images uploaded successfully');
    } catch (error) {
      console.error(error);
      toast.error('Please try again');
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    update({
      section_id,
      page_id,
      active: activation,
      priority: Number(sectionPeriorty),
      slug:link,
      attachment: [...images], // تأكد من تمرير الصور المحدثة
    });

    setIsUpdated(false); // إعادة ضبط الحالة بعد التحديث
  };
console.log("images",images);

  return (
    <form onSubmit={onSubmit}>
      <FormGroup title="Upload Images" className="relative pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11">
        {isLoading && (
          <div className="absolute z-10 m-auto flex h-[100%] w-[100%] items-center justify-center">
            <Spinner size="xl" />
          </div>
        )}
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          ref={fileInputRef}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-200 transition"
        >
          Select Images
        </label>
      </FormGroup>

      <div className="mt-4">
        {images?.map((image, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2">
            <img src={image?.original} alt={`Uploaded ${index}`} className="w-16 h-16 object-cover rounded" />
            <Button variant="outline" size="sm" onClick={() => removeImage(index)}>
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="flex w-full flex-col items-start justify-between gap-7 border-b border-gray-200 pb-5 sm:flex-row sm:items-center mt-6">
        <Button
          isLoading={isPending || isLoading}
          type="submit"
          variant="solid"
          className={`dark:bg-gray-100 dark:text-white ${isUpdated ? 'bg-blue-500' : ''}`} // تحديث لون الزر عند الحاجة
        >
          {isUpdated ? 'Update (New Data)' : 'Update'}
        </Button>
      </div>
    </form>
  );
}

export default ToggleSection;
