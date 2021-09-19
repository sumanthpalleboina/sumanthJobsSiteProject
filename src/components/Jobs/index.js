import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobCard from '../JobCard'
import Profile from '../Profile'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN-PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    employmentType: [],
    minimumPackage: '',
    search: '',
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {employmentType, minimumPackage, search} = this.state
    const updatedEmploymentType = employmentType.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${updatedEmploymentType}&minimum_package=${minimumPackage}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const {jobs} = await response.json()
    console.log(jobs)
    const updatedJobsList = jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      title: each.title,
      id: each.id,
      rating: each.rating,
      location: each.location,
      employmentType: each.employment_type,
      packagePerAnnum: each.package_per_annum,
      jobDescription: each.job_description,
    }))
    if (response.ok === true) {
      this.setState({
        jobsList: updatedJobsList,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  renderNojobsView = () => (
    <div className="jobs-failure-container">
      {this.renderSearchBarLg()}
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt=" no jobs"
          className="failure-img"
        />
        <h1 className="went-wrong">No Jobs Found</h1>
        <p className="failure-msg">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    </div>
  )

  renderJobsSuccessView = () => {
    const {jobsList} = this.state
    const showJobsPage = jobsList.length > 0
    return showJobsPage ? (
      <>
        <div className="job-cards-with-searchbar-container">
          {this.renderSearchBarLg()}
          <ul className="jobCards-containers">
            {jobsList.map(each => (
              <JobCard key={each.id} jobItem={each} />
            ))}
          </ul>
        </div>
      </>
    ) : (
      this.renderNojobsView()
    )
  }

  changeTitleSearch = event => {
    this.setState({search: event.target.value})
  }

  clickSearchIcon = () => {
    this.getJobsList()
  }

  renderSearchBarLg = () => (
    <div className="searchBar-container-lg">
      <input
        type="search"
        className="search-input"
        placeholder="Search"
        onChange={this.changeTitleSearch}
      />
      <button
        type="button"
        testid="searchButton"
        className="search-button"
        onClick={this.clickSearchIcon}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  renderSearchBarSm = () => (
    <div className="searchBar-container-sm">
      <input
        type="search"
        className="search-input"
        placeholder="Search"
        onChange={this.changeTitleSearch}
      />
      <button
        type="button"
        testid="searchButton"
        className="search-button"
        onClick={this.clickSearchIcon}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  changeEmployment = event => {
    console.log(event.target.value)
    if (event.target.checked !== false) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, event.target.value],
        }),
        this.getJobsList,
      )
    } else {
      this.setState(
        PrevState => ({
          employmentType: PrevState.employmentType.filter(
            each => each !== event.target.value,
          ),
        }),
        this.getJobsList,
      )
    }
  }

  renderEmploymentType = each => {
    const {label, employmentTypeId} = each
    return (
      <li className="type" key={employmentTypeId}>
        <input
          type="checkbox"
          id={employmentTypeId}
          className="checkbox-input"
          value={employmentTypeId}
          onClick={this.changeEmployment}
        />
        <label htmlFor={employmentTypeId} className="employment-label">
          {label}
        </label>
      </li>
    )
  }

  clickSalary = event => {
    console.log(event.target.value)
    this.setState({minimumPackage: event.target.value}, this.getJobsList)
  }

  renderSalaryType = each => {
    const {label, salaryRangeId} = each
    return (
      <li className="type" key={salaryRangeId}>
        <input
          type="radio"
          id={salaryRangeId}
          className="checkbox-input"
          name="salary"
          value={salaryRangeId}
          onChange={this.clickSalary}
        />
        <label htmlFor={salaryRangeId} className="employment-label">
          {label}
        </label>
      </li>
    )
  }

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getJobsList()
  }

  renderJobsFailureView = () => (
    <div className="jobs-failure-container">
      {this.renderSearchBarLg()}
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
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderJobsSuccessView()
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
        <div className="route-container">
          <div className="profile-and-filtering-container">
            {this.renderSearchBarSm()}
            <Profile />
            <hr />
            <h1 className="Type-of-employment-head">Type of Employment</h1>
            <ul className="employment-types-container">
              {employmentTypesList.map(each => this.renderEmploymentType(each))}
            </ul>
            <hr />
            <h1 className="Type-of-employment-head">Salary Range</h1>
            <ul className="employment-types-container">
              {salaryRangesList.map(each => this.renderSalaryType(each))}
            </ul>
          </div>
          {this.renderViews()}
        </div>
      </>
    )
  }
}
export default Jobs
