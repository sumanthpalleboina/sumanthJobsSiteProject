import {BsFillStarFill} from 'react-icons/bs'
import {MdLocationOn, MdWork} from 'react-icons/md'
import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {jobItem} = props
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobItem
  return (
    <Link to={`/jobs/${id}`} className="jobCard-link">
      <li className="job-card">
        <div className="company-with-job-titleAndRating-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-rating-container">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <BsFillStarFill className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-employment-salary">
          <div className="location-employment-container">
            <div className="location-container">
              <MdLocationOn className="location-icon" />
              <p className="location">{location}</p>
            </div>
            <div className="employment-container">
              <MdWork className="employment-icon" />
              <p className="employment-type">{employmentType}</p>
            </div>
          </div>
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <div className="description-div">
          <h1 className="description-head">Description</h1>
          <p className="job-summary">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobCard
