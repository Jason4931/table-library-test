import { ViewDescriptions } from "@/app/ui/ViewDescriptions"
import MainLayout from "@/app/layout/mainlayout";

export default function ViewData() {
  return (
    <>
      <MainLayout>
        <ViewDescriptions
          storageKey="tableData"
          url='/test'
        />
      </MainLayout>
    </>
  );
}