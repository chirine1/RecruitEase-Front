

import BlogList from "@/components/blog-meu-pages/blog-list";

import MetaComponent from "@/components/common/MetaComponent";
import BlogListCandidate from "@/components/blog-meu-pages/blog-list-cand"
const metadata = {
  title: 'Blog List  || RecruitEase - Job Borad ',
  description:
    'RecruitEase - Job Borad ',
  
}



const BlogListPageCand = () => {
  return (
    <>
    <MetaComponent meta={metadata} />

      <BlogListCandidate/>
    </>
  );
};

export default BlogListPageCand