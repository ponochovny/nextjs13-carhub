import { CarCard, CustomFilter, Hero, SearchBar } from '@/components'
import { fuels, yearsOfProduction } from '@/constants'
import { FilterProps } from '@/types'
import { fetchCars } from '@/utils'

export default async function Home({
	searchParams,
}: {
	searchParams: FilterProps
}) {
	const allCars = await fetchCars({
		manufacturer: searchParams.manufacturer || '',
		year: searchParams.year || new Date().getFullYear(),
		fuel: searchParams.fuel || '',
		limit: searchParams.limit || 10,
		model: searchParams.model || '',
	})

	const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars

	return (
		<main className='overflow-hidden'>
			<Hero />

			<div className='mt-12 padding-x padding-y max-width' id='discover'>
				<div className='home__text-container'>
					<h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
					<p>Explore the cars you might like</p>
				</div>
			</div>

			<div className='home__filters'>
				<SearchBar />

				<div className='home__filter-container'>
					<CustomFilter title='fuel' options={fuels} />
					<CustomFilter title='year' options={yearsOfProduction} />
				</div>

				{!isDataEmpty ? (
					<section>
						<div className='home__cars-wrapper'>
							{allCars?.map((car) => (
								<CarCard key={car} car={car} />
							))}
						</div>
					</section>
				) : (
					<div className='home__error-container'>
						<h2 className='text-black text-xl'>Ooops, no results</h2>
						<p>{allCars?.message}</p>
					</div>
				)}
			</div>
		</main>
	)
}
