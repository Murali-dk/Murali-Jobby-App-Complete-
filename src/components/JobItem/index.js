import {Link} from 'react-router-dom'
import {RiStarSFill} from 'react-icons/ri'
import {IoLocation} from 'react-icons/io5'
import {FaSuitcase} from 'react-icons/fa'
import './index.css'

const JobItem = props => {
  const {details} = props
  const {id, title, rating, packagePerAnnum, companyLogoUrl} = details
  const {employmentType, jobDescription, location} = details
  return (
    <li>
      <Link to={`/jobs/${id}`} className="link-el">
        <div className="job-item">
          <div>
            <div className="top-part">
              <img
                src={companyLogoUrl}
                alt="company logo"
                className="company-logo"
              />
              <div className="title-rating">
                <h1 className="title"> {title} </h1>
                <p className="rating">
                  {' '}
                  <RiStarSFill className="star" /> {rating}{' '}
                </p>
              </div>
            </div>
            <div className="mid-part">
              <div className="loc-type">
                <p className="loc-type-text">
                  {' '}
                  <IoLocation /> {location}{' '}
                </p>
                <p className="loc-type-text">
                  {' '}
                  <FaSuitcase /> {employmentType}{' '}
                </p>
              </div>
              <p> {packagePerAnnum} </p>
            </div>
          </div>
          <hr />
          <div>
            <h1 className="desc"> Description </h1>
            <p className="fail-desc"> {jobDescription} </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
