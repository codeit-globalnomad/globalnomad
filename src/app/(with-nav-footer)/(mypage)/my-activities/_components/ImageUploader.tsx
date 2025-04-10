import { toast } from 'react-toastify';
import { useRef } from 'react';
import { useUploadActivityImage } from '@/lib/hooks/useActivities';
import Image from 'next/image';
import Button from '@/components/Button';

interface ImageUploaderProps {
  value: string | string[];
  onChange: (val: string | string[]) => void;
  single?: boolean;
  multiple?: boolean;
  limit?: number;
}

export default function ImageUploader({
  value,
  onChange,
  single = false,
  multiple = false,
  limit,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadImage } = useUploadActivityImage();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
      toast.error('지원되지 않는 형식이거나 5MB를 초과했습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const { activityImageUrl } = await uploadImage(formData);
      if (single) {
        onChange(activityImageUrl);
      } else {
        const updated = Array.isArray(value) ? [...value, activityImageUrl] : [activityImageUrl];
        onChange(updated);
      }
    } catch {
      toast.error('이미지 업로드에 실패했습니다.');
    }
  };

  const handleRemove = (index: number) => {
    if (single) {
      onChange('');
      return;
    }

    if (!Array.isArray(value)) return;

    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  const images = Array.isArray(value) ? value : value ? [value] : [];

  return (
    <div className='mt-[8px] flex flex-wrap gap-4'>
      {(limit === undefined || images.length < limit) && (
        <div
          onClick={handleClick}
          className='flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-gray-400 bg-white'
        >
          <span className='text-3xl text-gray-400'>+</span>
          <span className='text-sm text-gray-500'>이미지 등록</span>
        </div>
      )}

      <input
        type='file'
        accept='image/*'
        multiple={multiple}
        ref={inputRef}
        onChange={handleChange}
        className='hidden'
      />

      {images.map((img, idx) => (
        <div key={idx} className='relative h-32 w-32'>
          <Image src={img} className='h-full w-full rounded object-cover' fill alt='preview' />
          <Button
            type='button'
            onClick={() => handleRemove(idx)}
            className='absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 items-center justify-center rounded-full px-2 text-2xl font-semibold text-white'
          >
            ×
          </Button>
        </div>
      ))}
    </div>
  );
}
