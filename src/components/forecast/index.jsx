const Forecast = ({ prediction }) => {
  return (
    <li className="forecast-li">
        <p className="forecast-prediction">{`${prediction * 100}%`}</p>
    </li>
  )
}

export default Forecast