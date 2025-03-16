import PaymentClient from './PaymentClient';

interface PageProps {
  params: {
    orderId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PaymentPage(props: PageProps) {
  return <PaymentClient orderId={props.params.orderId} />;
} 