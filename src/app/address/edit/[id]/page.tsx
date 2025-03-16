import EditAddressClient from './EditAddressClient';

export default function EditAddressPage({
  params,
}: {
  params: { id: string };
}) {
  return <EditAddressClient id={params.id} />;
} 