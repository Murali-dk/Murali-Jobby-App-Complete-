import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import SpecificJob from '../SpecificJob'
import SimilarJobItem from '../SimilarJobItem'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  fail: 'FAIL',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class JobDetails extends Component {
  state = {
    jobDetails: {},
    lifeAtCompany: {},
    similarJobs: [],
    skills: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getEachJobData()
  }

  getUpdatedObject = data => {
    const updatedObject = {
      companyLogoUrl: data.company_logo_url,
      companyWebsiteUrl: data.company_website_url,
      employmentType: data.employment_type,
      id: data.id,
      jobDescription: data.job_description,
      location: data.location,
      packagePerAnnum: data.package_per_annum,
      rating: data.rating,
      title: data.title,
      lifeAtCompany: {
        description: data.life_at_company.description,
        imageUrl: data.life_at_company.image_url,
      },
      skills: data.skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      })),
    }

    return updatedObject
  }

  getUpdatedSimilarJobsList = data => {
    const updatedJobData = data.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      title: eachJob.title,
      rating: eachJob.rating,
      location: eachJob.location,
    }))
    return updatedJobData
  }

  onSuccess = data => {
    const updatedData = this.getUpdatedObject(data.job_details)
    const similarJobsList = this.getUpdatedSimilarJobsList(data.similar_jobs)
    this.setState({
      jobDetails: updatedData,
      similarJobs: similarJobsList,
      skills: updatedData.skills,
      lifeAtCompany: updatedData.lifeAtCompany,
      apiStatus: apiStatusConstants.success,
    })
  }

  onFail = () => {
    this.setState({apiStatus: apiStatusConstants.fail})
  }

  getEachJobData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data)
    } else {
      this.onFail()
    }
  }

  getFullJobDetails = () => {
    const {jobDetails, similarJobs, skills, lifeAtCompany} = this.state
    return (
      <div className="job-details-con">
        <Header />
        <div className="inner-job-details">
          <SpecificJob
            details={jobDetails}
            skills={skills}
            lifeAtCompany={lifeAtCompany}
          />
          <div>
            <h1 className="similar-jobs-heading"> Similar Jobs </h1>
            <ul className="similar-jobs">
              {similarJobs.map(eachJob => (
                <SimilarJobItem details={eachJob} key={eachJob.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  retry = () => {
    this.getEachJobData()
  }

  getFailJobDetailsPage = () => (
    <div className="jd-fail-content">
      <Header />
      <div className="fail-content">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="fail-image"
        />
        <h1 className="fail-heading"> Oops! Something Went Wrong </h1>
        <p className="fail-desc">
          {' '}
          we cannot seem to find the page you are looking for.{' '}
        </p>
        <button type="button" className="button" onClick={this.retry}>
          {' '}
          Retry{' '}
        </button>
      </div>
    </div>
  )

  getInProgressJobDetailsPage = () => (
    <div className="jd-fail-con">
      <Header />
      <div className="jd-loader" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" width={50} height={50} />
      </div>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getFullJobDetails()
      case apiStatusConstants.fail:
        return this.getFailJobDetailsPage()
      case apiStatusConstants.inProgress:
        return this.getInProgressJobDetailsPage()
      default:
        return null
    }
  }
}

export default JobDetails
