import { FilterProps } from '@/types'

export async function fetchCars(filters: FilterProps) {
	const { manufacturer, year, model, limit, fuel } = filters

	const headers = {
		'X-RapidAPI-Key': '19d09f1bbbmsh8869a3919bf9e94p148cfdjsn789e373861c6',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
	}

	const response = await fetch(
		`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&model=${model}&limit=${limit}&year=${year}&fuel_type=${fuel}`,
		{
			headers,
		}
	)

	const result = await response.json()

	return result
}

export const calculateCarRent = (city_mpg: number, year: number) => {
	const basePricePerDay = 50 // Base rental price per day in dollars
	const mileageFactor = 0.1 // Additional rate per mile driven
	const ageFactor = 0.05 // Additional rate per year of vehicle age

	// Calculate additional rate based on mileage and age
	const mileageRate = city_mpg * mileageFactor
	const ageRate = (new Date().getFullYear() - year) * ageFactor

	// Calculate total rental rate per day
	const rentalRatePerDay = basePricePerDay + mileageRate + ageRate

	return rentalRatePerDay.toFixed(0)
}

export const generateCarImageUrl = () => {
	return 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
}

export const updateSearchParams = (type: string, value: string) => {
	const searchParams = new URLSearchParams(window.location.search)

	searchParams.set(type, value)

	const newPathname = `${window.location.pathname}?${searchParams.toString()}`

	return newPathname
}
