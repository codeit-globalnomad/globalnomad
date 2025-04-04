import EditActivityPage from './_components/EditActivity';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const activityId = Number(id);

  return <EditActivityPage activityId={activityId} />;
}
