'use client';

import { FormProvider, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createActivitySchema, CreateActivityParams } from '@/lib/types/activities';
import Input from '@/components/Input';
import Button from '@/components/Button';
import ScheduleList from './SchduleList';
import ImageUploader from './ImageUploader';
import FilterDropdown from '@/components/FilterDropdown';
import arrowFilterDropdown2 from '@/assets/icons/arrow-filter-dropdown2.svg';
import AddressFind from './AddressFind';
import { useEffect, useState } from 'react';

type ActivityFormProps = {
  onSubmit: (data: CreateActivityParams) => void;
  isSubmitting?: boolean;
  defaultValues?: Partial<CreateActivityParams>;
  mode?: 'create' | 'edit';
};

export default function ActivityForm({
  onSubmit,
  isSubmitting = false,
  defaultValues,
  mode = 'create',
}: ActivityFormProps) {
  const methods = useForm<CreateActivityParams>({
    mode: 'onChange',
    resolver: zodResolver(createActivitySchema),
    defaultValues: {
      title: '',
      category: '',
      description: '',
      address: '',
      price: undefined,
      schedules: [],
      subImageUrls: [],
      bannerImageUrl: '',
      ...defaultValues,
    },
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = methods;

  const [bannerImageUrl, setBannerImageUrl] = useState<string>(defaultValues?.bannerImageUrl || '');
  const [subImageUrls, setSubImageUrls] = useState<string[]>(defaultValues?.subImageUrls || []);

  useEffect(() => {
    setValue('bannerImageUrl', bannerImageUrl);
    setValue('subImageUrls', subImageUrls);
  }, [bannerImageUrl, subImageUrls, setValue]);

  const categoryOptions = [
    { label: '문화 · 예술', onClick: () => {} },
    { label: '식음료', onClick: () => {} },
    { label: '스포츠', onClick: () => {} },
    { label: '투어', onClick: () => {} },
    { label: '관광', onClick: () => {} },
    { label: '웰빙', onClick: () => {} },
  ];

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((data) =>
          onSubmit({
            ...data,
            bannerImageUrl,
            subImageUrls,
          }),
        )}
      >
        <div className='flex w-full max-w-[792px] items-center justify-between'>
          <h2 className='text-2xl font-bold'>{mode === 'create' ? '내 체험 등록' : '내 체험 수정'}</h2>
          <Button type='submit' disabled={isSubmitting || !isValid} className='px-[16px] py-[10px] text-lg font-bold'>
            {isSubmitting ? '처리 중...' : mode === 'create' ? '등록하기' : '수정하기'}
          </Button>
        </div>
        <div className='space-y-6'>
          <Input
            label='제목'
            className='bg-white'
            placeholder='제목을 입력하세요'
            {...register('title')}
            error={errors.title?.message}
          />
          <label className='text-black-100 mb-[8px] inline-flex items-center gap-1 text-lg font-medium'>카테고리</label>
          <Controller
            control={control}
            name='category'
            render={({ field }) => (
              <FilterDropdown
                label='카테고리'
                options={categoryOptions}
                onSelect={(option) => field.onChange(option?.label || '')}
                icon={arrowFilterDropdown2}
                buttonClassName='border max-w-[792px] min-w-[343px] w-full text-black-100 border-gray-800 rounded-md md:justify-between px-[15px] py-[12px]'
                dropdownClassName='rounded-xl max-w-[792px] min-w-[343px] w-full border border-gray-300 bg-white drop-shadow-sm'
                optionClassName='text-md md:text-lg h-[41px] max-w-[792px] min-w-[343px] w-full leading-[41px] md:h-[58px] md:leading-[58px]'
                includeAllOption={false}
                iconVisibleOnMobile={false}
                value={field.value}
              />
            )}
          />
          {errors.category && <p className='text-sm text-red-100'>{errors.category.message}</p>}
          <label className='text-black-100 mb-[8px] inline-flex items-center gap-1 text-lg font-medium'>설명</label>
          <textarea
            className='h-[260px] w-full rounded-[4px] border border-gray-800 bg-white px-4 py-3 focus:border-green-100 focus:ring-1 focus:ring-green-100 focus:outline-none'
            placeholder='설명을 입력해주세요'
            {...register('description')}
          />
          {errors.description && <p className='text-sm text-red-100'>{errors.description.message}</p>}
          <Controller
            control={control}
            name='address'
            render={({ field }) => (
              <AddressFind value={field.value} onChange={field.onChange} error={errors.address?.message} />
            )}
          />
          <Input
            label='가격'
            placeholder='숫자만 입력'
            type='number'
            onWheel={(e) => e.currentTarget.blur()}
            {...register('price', { valueAsNumber: true })}
            error={errors.price?.message}
            className='appearance-none bg-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
          />
          <div>
            <label className='text-black-100 inline-flex items-center gap-1 text-lg font-medium'>
              예약 가능한 시간대
            </label>
            <Controller
              control={control}
              name='schedules'
              render={({ field }) => (
                <ScheduleList value={field.value} onChange={field.onChange} error={errors.schedules?.message} />
              )}
            />
          </div>
          <div>
            <label className='text-black-100 inline-flex items-center gap-1 text-lg font-medium'>배너 이미지</label>
            <ImageUploader value={bannerImageUrl} onChange={(url) => setBannerImageUrl(url as string)} single />
          </div>
          <div className='mb-[32px]'>
            <label className='text-black-100 inline-flex items-center gap-1 text-lg font-medium'>
              소개 이미지 (최대 4장)
            </label>
            <ImageUploader
              value={subImageUrls}
              onChange={(urls) => setSubImageUrls(urls as string[])}
              multiple
              limit={4}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
