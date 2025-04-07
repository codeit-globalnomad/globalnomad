import EditActivityPage from './_components/EditActivity';

type PageProps = {
  params: {
    id: number;
  };
};

export default function Page({ params }: PageProps) {
  const activityId = Number(params.id); // string → number 변환
  return <EditActivityPage activityId={activityId} />;
}
