import Forecast from '../forecast'

const Forecasts = ({ forecasts }) => {
    return (
        <ul className='forecasts-ul'>
            {forecasts.map((forecast) => {
                return (
                    <Forecast
                        key={forecast.id}
                        prediction={forecast.prediction}
                    />
                )
            })}
        </ul>
    )
}

export default Forecasts