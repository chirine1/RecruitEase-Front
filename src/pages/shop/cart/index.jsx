
import Cart from "@/components/shop/cart";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Cart || RecruitEase - Job Borad ",
  description:
    'RecruitEase - Job Borad ',
};

const CartPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Cart />
    </>
  );
};

export default CartPage
