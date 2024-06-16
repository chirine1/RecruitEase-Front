
import OrderCompleted from "@/components/shop/order-completed";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Order Completed || RecruitEase - Job Borad ",
  description:
    'RecruitEase - Job Borad ',
};

const OrderCompletedPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <OrderCompleted />
    </>
  );
};

export default OrderCompletedPage
