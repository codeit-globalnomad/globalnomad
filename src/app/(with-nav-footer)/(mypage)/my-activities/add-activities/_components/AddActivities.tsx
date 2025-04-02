'use client';

import { useForm, Controller, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createActivitySchema, CreateActivityParams } from '@/lib/types/activities';
import Input from '@/components/Input';
import Button from '@/components/Button';
import ScheduleList from './SchduleList';
import ImageUploader from './ImageUploader';
import { useState } from 'react';
import { useCreateActivity } from '@/lib/hooks/useActivities';
import FilterDropdown from '@/components/FilterDropdown';
import arrowFilterDropdown2 from '@/assets/icons/arrow-filter-dropdown2.svg';
import AddressFind from './AddressFind';
import { toast } from 'react-toastify';

export default function AddActivitiesForm() {
  const { mutate: createActivity, isPending } = useCreateActivity();

  const categoryOptions = [
    { label: '문화 · 예술', onClick: () => {} },
    { label: '식음료', onClick: () => {} },
    { label: '스포츠', onClick: () => {} },
    { label: '투어', onClick: () => {} },
    { label: '관광', onClick: () => {} },
    { label: '웰빙', onClick: () => {} },
  ];

  const methods = useForm<CreateActivityParams>({
    mode: 'onChange',
    resolver: zodResolver(createActivitySchema),
    defaultValues: {
      title: '',
      category: '',
      description: '',
      address: '',
      schedules: [],
      subImageUrls: [],
      bannerImageUrl: '',
    },
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = methods;

  const [bannerImageUrl, setBannerImageUrl] = useState<string>('');
  const [subImageUrls, setSubImageUrls] = useState<string[]>([]);

  const onSubmit = (data: CreateActivityParams) => {
    const finalData = {
      ...data,
      bannerImageUrl,
      subImageUrls,
    };

    createActivity(finalData);
    toast.success('내 체험 등록 성공');
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        className='space-y-6'
        onSubmit={handleSubmit(onSubmit, (invalidData) => {
          console.log(invalidData);
        })}
      >
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>내 체험 등록</h2>
          <Button type='submit' disabled={isPending || !isValid} className='px-[20px] py-[11px]'>
            {isPending ? '등록 중...' : '등록하기'}
          </Button>
        </div>

        <Input
          label='제목'
          placeholder='제목을 입력하세요'
          {...register('title')}
          error={errors.title?.message as string}
        />

        <label className='text-black-100 inline-flex items-center gap-1 text-lg font-medium'>카테고리</label>
        <Controller
          control={control}
          name='category'
          render={({ field }) => (
            <FilterDropdown
              label='카테고리'
              options={categoryOptions}
              onSelect={(option) => field.onChange(option?.label || '')}
              icon={arrowFilterDropdown2}
              buttonClassName='border lg:w-[792px] w-[343px] md:w-[429px] text-black-100 border-gray-800 rounded-lg md:justify-between px-[15px] py-[15px]'
              dropdownClassName='rounded-xl lg:w-[792px] w-[343px] md:w-[429px] border border-gray-300 bg-white drop-shadow-sm'
              optionClassName='text-md md:text-lg h-[41px] lg:w-[792px] w-[343px] md:w-[429px] leading-[41px] md:h-[58px] md:leading-[58px]'
              includeAllOption={false}
              iconVisibleOnMobile={false}
              value={field.value}
            />
          )}
        />
        {errors.category && <p className='text-sm text-red-500'>{errors.category.message}</p>}

        <Input
          label='설명'
          placeholder='설명을 입력해주세요'
          className='h-[260px]'
          {...register('description')}
          error={errors.description?.message as string}
        />

        <Controller
          control={control}
          name='address'
          render={({ field }) => (
            <AddressFind value={field.value} onChange={field.onChange} error={errors.address?.message as string} />
          )}
        />

        <Input
          label='가격'
          placeholder='숫자만 입력'
          type='number'
          {...register('price', { valueAsNumber: true })}
          error={errors.price?.message as string}
        />

        <div>
          <label className='text-black-100 inline-flex items-center gap-1 text-lg font-medium'>
            예약 가능한 시간대
          </label>
          <Controller
            control={control}
            name='schedules'
            render={({ field }) => (
              <ScheduleList value={field.value} onChange={field.onChange} error={errors.schedules?.message as string} />
            )}
          />
        </div>

        <div>
          <label className='text-black-100 inline-flex items-center gap-1 text-lg font-medium'>배너 이미지</label>
          <ImageUploader
            value={bannerImageUrl}
            onChange={(url) => {
              setBannerImageUrl(url as string);
              setValue('bannerImageUrl', url as string, { shouldValidate: true });
            }}
            single
          />
        </div>

        <div className='mb-[32px]'>
          <label className='text-black-100 inline-flex items-center gap-1 text-lg font-medium'>
            소개 이미지 (최대 4장)
          </label>
          <ImageUploader
            value={subImageUrls}
            onChange={(urls) => {
              setSubImageUrls(urls as string[]);
              setValue('subImageUrls', urls as string[], { shouldValidate: true });
            }}
            multiple
            limit={4}
          />
        </div>
      </form>
    </FormProvider>
  );
}
