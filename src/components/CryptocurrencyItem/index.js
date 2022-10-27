import './index.css'

const CryptocurrencyItem = props => {
  const {data} = props
  return (
    <li className="list-background">
      <div className="logo-container">
        <img className="logo" src={data.currencyLogo} alt={data.currencyName} />
        <p>{data.currencyName}</p>
      </div>
      <div className="usd-euro-container">
        <p className="usd-value">{data.usdValue}</p>
        <p>{data.euroValue}</p>
      </div>
    </li>
  )
}

export default CryptocurrencyItem
