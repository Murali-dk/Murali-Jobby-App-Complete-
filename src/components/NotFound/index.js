import './index.css'

const NotFound = () => (
  <div className="not-found-con">
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not found"
      />
      <h1 className="n-f-heading"> Page Not Found </h1>
      <p className="n-f-desc">
        {' '}
        We are sorry, the page you requested could not be found.{' '}
      </p>
    </div>
  </div>
)

export default NotFound
