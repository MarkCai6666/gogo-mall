import PaymentClient from './PaymentClient';

export default function PaymentPage({ params }: { params: { orderId: string } }) {
  return <PaymentClient orderId={params.orderId} />;
} 