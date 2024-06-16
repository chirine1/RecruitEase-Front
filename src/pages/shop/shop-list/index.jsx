
import ShopList from "@/components/shop/shop-list";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Shop List || RecruitEase - Job Borad ",
  description:
    'RecruitEase - Job Borad ',
};

const ShopListPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <ShopList />
    </>
  );
};

export default ShopListPage
