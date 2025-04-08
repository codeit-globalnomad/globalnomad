import EditActivityPage from './_components/EditActivities';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const activityId = Number(resolvedParams.id);

  return (
    <div className='mb-[40%]'>
      <EditActivityPage activityId={activityId} />
    </div>
  );
}
