import InfoPage from "@/components/shared/info-page";
export const dynamic = 'force-dynamic';

export default async function Home({}) {
  return (
    <div className="">
      <InfoPage/>
    </div>
  );
}