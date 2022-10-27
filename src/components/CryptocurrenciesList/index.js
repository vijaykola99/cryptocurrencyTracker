import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CryptocurrencyItem from '../CryptocurrencyItem'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CryptocurrenciesList extends Component {
  state = {apiStatus: apiConstants.initial, data: []}

  componentDidMount() {
    this.getApiCall()
  }

  getApiCall = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const url = 'https://apis.ccbp.in/crypto-currency-converter'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const apiCallData = data.map(eachItem => ({
        currencyName: eachItem.currency_name,
        usdValue: eachItem.usd_value,
        euroValue: eachItem.euro_value,
        id: eachItem.id,
        currencyLogo: eachItem.currency_logo,
      }))
      this.setState({data: apiCallData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onRetryApiCall = () => {
    this.getApiCall()
  }

  renderLoader = () => (
    <div className="loader">
      <Loader type="Rings" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="loader">
      <h1 className="heading">Failed To Get Data </h1>
      <button
        onClick={this.onRetryApiCall}
        className="retry-button"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {data} = this.state
    return (
      <>
        <h1 className="heading">Cryptocurrency Tracker</h1>
        <img
          className="image"
          src="https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png"
          alt="cryptocurrency"
        />
        <ul className="coins-container">
          <div className="categories">
            <p>coin Type</p>
            <div className="usd-euro-container">
              <p>USD</p>
              <p>EURO</p>
            </div>
          </div>
          {data.map(eachItem => (
            <CryptocurrencyItem key={eachItem.id} data={eachItem} />
          ))}
        </ul>
      </>
    )
  }

  renderUiBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.inProgress:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderUiBasedOnApiStatus()}</>
  }
}
export default CryptocurrenciesList
