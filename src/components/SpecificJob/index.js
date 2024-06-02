import {RiStarSFill} from 'react-icons/ri'
import {IoLocation} from 'react-icons/io5'
import {FaSuitcase} from 'react-icons/fa'
import {BsBoxArrowUpRight} from 'react-icons/bs'
import SkillCard from '../SkillCard'
import './index.css'

const SpecificJob = props => {
  const {details, skills, lifeAtCompany} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = details
  return (
    <div className="job-item">
      <div className="top-part">
        <img
          src={companyLogoUrl}
          alt="job details company logo"
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
          <p>
            {' '}
            <IoLocation /> {location}{' '}
          </p>
          <p>
            {' '}
            <FaSuitcase /> {employmentType}{' '}
          </p>
        </div>
        <p> {packagePerAnnum} </p>
      </div>
      <hr />
      <div>
        <div className="heading-link">
          <h1 className="desc"> Description </h1>
          <a href={companyWebsiteUrl} target="_balnk" className="anchor">
            {' '}
            Visit <BsBoxArrowUpRight />
          </a>
        </div>
        <p className="job-details-desc"> {jobDescription} </p>
        <h1 className="desc"> Skills </h1>
        <ul className="skills-con">
          {skills.map(eachSkill => (
            <SkillCard details={eachSkill} key={eachSkill.name} />
          ))}
        </ul>
        <div className="life-con">
          <div>
            <h1 className="desc"> Life at Company </h1>
            <p className="job-details-desc"> {lifeAtCompany.description} </p>
          </div>
          <img
            src={lifeAtCompany.imageUrl}
            alt="life at company"
            className="life-img"
          />
        </div>
      </div>
    </div>
  )
}

export default SpecificJob
