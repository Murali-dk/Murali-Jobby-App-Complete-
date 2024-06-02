import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  fail: 'FAIL',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
}

class FilterGroup extends Component {
  state = {apiStatus: apiStatusConstants.initial, profileObj: {}}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfie = data => {
    const updatedObj = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }
    this.setState({
      profileObj: updatedObj,
      apiStatus: apiStatusConstants.success,
    })
  }

  getFail = () => {
    this.setState({apiStatus: apiStatusConstants.fail})
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.getProfie(data)
    } else {
      this.getFail()
    }
  }

  getProfile = () => {
    const {profileObj} = this.state
    return (
      <div className="profile-con">
        <img src={profileObj.profileImageUrl} alt="profile" />
        <h1 className="name"> {profileObj.name} </h1>
        <p className="bio"> {profileObj.shortBio} </p>
      </div>
    )
  }

  getLoader = () => (
    <div data-testid="loader" className="filter-loader-con">
      <Loader type="ThreeDots" color="#ffffff" width={50} height={50} />
    </div>
  )

  renderRetry = () => {
    this.getProfileDetails()
  }

  getFailBtn = () => (
    <div className="filter-loader-con">
      <button className="button" type="button" onClick={this.renderRetry}>
        {' '}
        Retry{' '}
      </button>
    </div>
  )

  changeSalary = event => {
    const {salaryChange} = this.props
    salaryChange(event.target.id)
  }

  getResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getProfile()
      case apiStatusConstants.fail:
        return this.getFailBtn()
      case apiStatusConstants.inProgress:
        return this.getLoader()
      default:
        return null
    }
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    const {typeChange} = this.props
    return (
      <div className="filter-grp-con">
        <div className="details-con">{this.getResult()}</div>
        <hr />
        <div className="employment-type-con">
          <h1 className="filter-heading"> Type of Employment </h1>
          <ul className="filter-list-con">
            {employmentTypesList.map(eachType => {
              const changeType = event => {
                typeChange(event.target.id)
              }
              return (
                <li className="filter-item" key={eachType.employmentTypeId}>
                  <input
                    type="checkbox"
                    id={eachType.employmentTypeId}
                    onChange={changeType}
                    className="filter-inputs"
                  />
                  <label className="label" htmlFor={eachType.employmentTypeId}>
                    {' '}
                    {eachType.label}{' '}
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
        <hr />
        <div className="salary-range-con">
          <h1 className="filter-heading"> Salary Range </h1>
          <ul className="filter-list-con">
            {salaryRangesList.map(eachSalary => (
              <li className="filter-item" key={eachSalary.salaryRangeId}>
                <input
                  type="radio"
                  name="salary"
                  className="filter-inputs"
                  id={eachSalary.salaryRangeId}
                  value={eachSalary.value}
                  onChange={this.changeSalary}
                />
                <label className="label" htmlFor={eachSalary.salaryRangeId}>
                  {' '}
                  {eachSalary.label}{' '}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default FilterGroup
