import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import {IoSearch} from 'react-icons/io5'
import Header from '../Header'
import JobItem from '../JobItem'
import FilterGroup from '../FilterGroup'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  fail: 'FAIL',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
}

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

class Jobs extends Component {
  state = {
    typeVal: [],
    rangeVal: '',
    userInput: '',
    finalInput: '',
    apiStatus: apiStatusConstants.initial,
    jobslist: [],
  }

  componentDidMount() {
    this.getJobsInfo()
  }

  typeChange = newTypeVal => {
    const {typeVal} = this.state
    if (typeVal.includes(newTypeVal) === true) {
      this.setState(
        prevState => ({
          typeVal: prevState.typeVal.filter(eachVal => {
            if (eachVal !== newTypeVal) {
              return eachVal
            }
            return ''
          }),
        }),
        this.getJobsInfo,
      )
    } else {
      this.setState(
        prevState => ({typeVal: [...prevState.typeVal, newTypeVal]}),
        this.getJobsInfo,
      )
    }
  }

  salaryChange = newRangeVal => {
    this.setState({rangeVal: newRangeVal}, this.getJobsInfo)
  }

  inputVal = event => {
    this.setState({userInput: event.target.value})
  }

  takeInput = () => {
    const {userInput} = this.state
    this.setState({finalInput: userInput, userInput: ''}, this.getJobsInfo)
  }

  getUpdatedList = data => {
    const updatedJobData = data.jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      title: eachJob.title,
      rating: eachJob.rating,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
    }))
    return updatedJobData
  }

  onSuccess = data => {
    const updatedJobs = this.getUpdatedList(data)
    this.setState({
      apiStatus: apiStatusConstants.success,
      jobslist: updatedJobs,
    })
  }

  onFaliure = () => {
    this.setState({apiStatus: apiStatusConstants.fail})
  }

  getJobsInfo = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {typeVal, finalInput, rangeVal} = this.state
    const updatedType = typeVal.join()
    const url = `https://apis.ccbp.in/jobs?employment_type=${updatedType}&minimum_package=${rangeVal}&search=${finalInput}`
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
      this.onFaliure()
    }
  }

  retry = () => {
    this.getJobsInfo()
  }

  renderCommon = () => {
    const {userInput} = this.state
    return (
      <div className="search-input-con">
        <input
          value={userInput}
          type="search"
          className="search-input-el"
          placeholder="Search"
          onChange={this.inputVal}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
          onClick={this.takeInput}
        >
          <IoSearch color="#616e7c" aria-label="close" />
        </button>
      </div>
    )
  }

  renderSuccess = () => {
    const {jobslist} = this.state
    return (
      <div className="jobs-grp-con">
        <div className="md-search-con">{this.renderCommon()}</div>
        {jobslist.length === 0 ? (
          <div className="fail-content">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-jobs"
            />
            <h1 className="fail-heading"> No Jobs Found </h1>
            <p className="fail-desc">
              {' '}
              We could not find any jobs. Try other filters.{' '}
            </p>
          </div>
        ) : (
          <ul className="jobs-list">
            {jobslist.map(eachJob => (
              <JobItem details={eachJob} key={eachJob.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderFail = () => (
    <div className="fail-con">
      <div className="md-search-con">{this.renderCommon()}</div>
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

  renderProgress = () => (
    <div className="loader-con">
      <div className="md-search-con">{this.renderCommon()}</div>
      <div className="loader" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" width={50} height={50} />
      </div>
    </div>
  )

  getJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.fail:
        return this.renderFail()
      case apiStatusConstants.inProgress:
        return this.renderProgress()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobs-con">
        <Header />
        <div className="jobs-bottom-con">
          <div className="extra-search-con"> {this.renderCommon()} </div>
          <FilterGroup
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            typeChange={this.typeChange}
            salaryChange={this.salaryChange}
          />
          <div className="jobs-grp-con">{this.getJobs()}</div>
        </div>
      </div>
    )
  }
}

export default Jobs
