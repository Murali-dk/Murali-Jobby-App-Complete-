import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-con">
        <Header />
        <div className="text-con">
          <h1 className="home-heading"> Find The Job That Fits Your Life </h1>
          <p className="home-desc">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="button" onClick={this.getJobs}>
              {' '}
              Find Jobs{' '}
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
