import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="no-found-img"
      />
      <div>
        <h1 className="heading">Page Not Found</h1>
      </div>
      <div className="para-container">
        <p className="para">
          we’re sorry, the page you requested could not be found
        </p>
      </div>
    </div>
  </>
)
export default NotFound
