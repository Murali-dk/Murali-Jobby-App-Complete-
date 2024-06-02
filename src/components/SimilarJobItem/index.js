import {RiStarSFill} from 'react-icons/ri'
import {IoLocation} from 'react-icons/io5'
import {FaSuitcase} from 'react-icons/fa'
import './index.css'

const SimilarJobItem = props => {
  const {details} = props
  const {title, rating, companyLogoUrl} = details
  const {employmentType, jobDescription, location} = details
  return (
    <li>
      <div className="similar-job-item">
        <div>
          <div className="similar-top-part">
            <img
              src={companyLogoUrl}
              alt="similar job company logo"
              className="company-logo"
            />
            <div className="similar-title-rating">
              <h1 className="similar-title"> {title} </h1>
              <p className="rating">
                {' '}
                <RiStarSFill className="star" /> {rating}{' '}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h1 className="desc"> Description </h1>
          <p className="fail-desc"> {jobDescription} </p>
        </div>
        <div className="similar-mid-part">
          <p className="simialr-loc-type-text">
            {' '}
            <IoLocation /> {location}{' '}
          </p>
          <p className="similar-loc-type-text">
            {' '}
            <FaSuitcase /> {employmentType}{' '}
          </p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
