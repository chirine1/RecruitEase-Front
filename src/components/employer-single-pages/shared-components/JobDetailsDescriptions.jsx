import GalleryBox from "./GalleryBox";

const JobDetailsDescriptions = ({description}) => {
  return (
    <div className="job-detail">
      <h4>About Company</h4>
      <p>
        {description}
      </p>
      
    </div>
  );
};

export default JobDetailsDescriptions;
