import MainLayout from "@/app/layout/mainlayout";
import FormRepeater from "@/app/ui/forms/FormRepeater";

let formItem = [
  {
    name: "makan",
    required: true,
    message: "For eat",
    placeholder: "halo"
  },
  {
    name: "makan1",
    required: true,
    message: "For eat1",
    placeholder: "halo1"
  },
  {
    name: "makan2",
    required: true,
    message: "For eat2",
    placeholder: "halo2"
  },
]

export default function FormsPage() {
  return (
    <MainLayout>
      <FormRepeater formItem={formItem} formListName="tryings" />
    </MainLayout>
  );
}
