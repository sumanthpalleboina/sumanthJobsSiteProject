import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import {HiOutlineLogin} from 'react-icons/hi'
import {MdLocationOn, MdWork} from 'react-icons/md'
import Header from '../Header'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN-PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    skills: [],
    lifeAtCompany: {},
    similarJobs: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiurl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiurl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        id: data.job_details.id,
        title: data.job_details.title,
        rating: data.job_details.rating,
        location: data.job_details.location,
        employmentType: data.job_details.employment_type,
        packagePerAnnum: data.job_details.package_per_annum,
        jobDescription: data.job_details.job_description,
        companyWebsiteUrl: data.job_details.company_website_url,
        skills: data.job_details.skills,
        lifeAtCompany: data.job_details.life_at_company,
      }
      const updatedSkills = updatedJobDetails.skills.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))
      const updatedlifeAtCompany = {
        description: updatedJobDetails.lifeAtCompany.description,
        imageUrl: updatedJobDetails.lifeAtCompany.image_url,
      }
      const updatedSimilarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        id: each.id,
        title: each.title,
        rating: each.rating,
        location: each.location,
        employmentType: each.employment_type,
        packagePerAnnum: each.package_per_annum,
        jobDescription: each.job_description,
      }))
      this.setState({
        jobDetails: updatedJobDetails,
        skills: updatedSkills,
        lifeAtCompany: updatedlifeAtCompany,
        similarJobs: updatedSimilarJobs,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  renderSkills = each => {
    const {name, imageUrl} = each
    return (
      <li className="skill-item" key={name}>
        <img src={imageUrl} className="skill-image" alt={name} />
        <p className="skill-name">{name}</p>
      </li>
    )
  }

  renderJobDetailsView = () => {
    const {jobDetails, skills, lifeAtCompany} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany
    return (
      <>
        <div className="jobDetails-card">
          <div className="company-with-job-titleAndRating-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
            <div className="description-with-url">
              <h1 className="description-head">Description</h1>
              <a className="anchor-style" href={companyWebsiteUrl}>
                <p className="Visit">Visit</p>
                <HiOutlineLogin className="visit-icon" />
              </a>
            </div>
            <p className="job-summary">{jobDescription}</p>
          </div>
          <h1 className="skills-head">Skills</h1>
          <ul className="skills-container">
            {skills.map(each => this.renderSkills(each))}
          </ul>
          <h1 className="life-at-company">Life at Company</h1>
          <div className="description-with-image">
            <p className="job-summary">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        {this.renderSimilarJobsList()}
      </>
    )
  }

  renderSimilarJobs = each => {
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      jobDescription,
      id,
    } = each
    return (
      <li className="similar-job-card" key={id}>
        <div className="company-with-job-titleAndRating-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
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
        <div className="description-div">
          <h1 className="description-head">Description</h1>
          <p className="job-summary">{jobDescription}</p>
        </div>
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
      </li>
    )
  }

  renderSimilarJobsList = () => {
    const {similarJobs} = this.state
    return (
      <>
        <h1 className="similar-jobs">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobs.map(each => this.renderSimilarJobs(each))}
        </ul>
      </>
    )
  }

  onClickRetry = () => {
    this.getJobDetails()
  }

  renderJobsFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="went-wrong">Oops! Something Went Wrong</h1>
      <p className="failure-msg">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-btn" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderJobDetailsView()
      case apiConstants.inProgress:
        return this.renderLoading()
      case apiConstants.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobDetails-container">{this.renderViews()}</div>
      </>
    )
  }
}
export default JobItemDetails
