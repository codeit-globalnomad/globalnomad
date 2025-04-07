import EditActivityPage from './_components/EditActivity';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams= await params;
  const activityId = Number(resolvedParams.id);

  return (
    <>
      <EditActivityPage activityId={activityId} />
    </>
  );
}
