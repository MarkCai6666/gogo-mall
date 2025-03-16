import EditAddressClient from './EditAddressClient';

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function EditAddressPage(props: PageProps) {
  return <EditAddressClient id={props.params.id} />;
} 