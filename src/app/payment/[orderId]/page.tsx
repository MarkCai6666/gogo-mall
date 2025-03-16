import PaymentClient from './PaymentClient';

export default async function PaymentPage({ params }: { params: { orderId: string } }) {
  return <PaymentClient orderId={params.orderId} />;
} 