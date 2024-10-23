import CountriesTable from '@/components/CountriesTable';
import GlobalChart from '@/components/GlobalChart';
import GlobalStats from '@/components/GlobalStats';
import ThemeSwitcher from '@/components/ThemeSwitcher';

export default function HomePage() {
	return (
		<main className="hero">
			<div className="hero-body">
				<h1 className="title has-text-centered mb-6">COVID-19 Dashboard</h1>
				<ThemeSwitcher />

				<h2 className="subtitle has-text-centered">Global data </h2>

				<GlobalStats />

				<div className='columns'>
					<div className='column is-three-fifths'>
						<GlobalChart />
					</div>
					<div className='column '>
						<h2 className="subtitle has-text-centered">COVID-19 data by Country</h2>
						<div className='box'>
							<CountriesTable />
						</div>
					</div>
				</div>


			</div>
		</main>
	);
}
