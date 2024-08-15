const Forecast = ({ prediction, author }) => {
  return (
    <li className="forecast-li">
        <p className="forecast-prediction">{author.first_name} {author.last_name}: {`${(prediction * 100).toFixed(0)}%`}</p>
    </li>
  )
}

export default Forecast