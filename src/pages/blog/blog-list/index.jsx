

import BlogList from "@/components/blog-meu-pages/blog-list";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Blog List  || RecruitEase - Job Borad ',
  description:
    'RecruitEase - Job Borad ',
  
}



const BlogListpage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />

      <BlogList />
    </>
  );
};

export default BlogListpage