import PaymentClient from './PaymentClient';

interface PageProps {
  params: {
    orderId: string;
  };
}

export default async function PaymentPage({ params }: PageProps) {
  return <PaymentClient orderId={params.orderId} />;
} 