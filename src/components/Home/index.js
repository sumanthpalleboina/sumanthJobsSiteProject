import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="Home-container">
      <h1 className="heading">Find The Job That Fits Your Life</h1>
      <div className="description-container">
        <p className="para">
          Millions of people are searching for jobs, salary, information,
          company reviews. Find the job that fits your abilities and potential.
        </p>
      </div>
      <Link to="/jobs">
        <button type="button" className="findJobs-btn">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)

export default Home
