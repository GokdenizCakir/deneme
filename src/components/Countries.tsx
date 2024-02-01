import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../queries/countriesQueries';
import { Country, CountriesInterface } from '../interface/interface';
import { Link } from 'react-router-dom';

export default function Countries({
  countryFilter,
  continentFilter,
  currencyFilter,
}: CountriesInterface) {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  let countriesDatabase: Country[] = data.countries;

  if (continentFilter) {
    countriesDatabase = data.countries.filter(
      (country: Country) => country.continent!.name === continentFilter
    );
  }

  if (currencyFilter) {
    countriesDatabase = data.countries.filter((country: Country) => {
      if (country.currency) {
        return country.currency
          .toLowerCase()
          .trim()
          .includes(currencyFilter.toLowerCase().trim());
      }
      return false; // Add this line to satisfy eslint
    });
  }

  if (currencyFilter && continentFilter) {
    countriesDatabase = data.countries.filter((country: Country) => {
      if (country.currency) {
        return (
          country.currency
            .toLowerCase()
            .trim()
            .includes(currencyFilter.toLowerCase().trim()) &&
          country.continent!.name === continentFilter
        );
      }
      return false; // Add this line to satisfy eslint
    });
  }

  let contentToDisplay: any = <p>No country found!</p>;
  if (countriesDatabase.length > 0) {
    contentToDisplay = countriesDatabase.map((country: Country) => {
      return country.name
        ?.toLowerCase()
        .includes(countryFilter!.toLowerCase().trim()) ? (
        <div key={country.code}>
          <Link to={`/details/${country.name}`}>{country.name}</Link>
          <p className='ml-2'>{country.emoji}</p>
          <p>
            Alpha2Code: <span>{country.code}</span>
          </p>
          <p>
            Languages:{' '}
            {country.languages!.map((language: any) => {
              return <span key={language.name}>{language.name} </span>;
            })}
          </p>
          <p>
            Currency: <span>{country.currency}</span>
          </p>
          <p>
            Continent: <span>{country.continent!.name}</span>
          </p>
        </div>
      ) : null;
    });
  }

  return (
    <section className='d-flex flex-column mt-2'>
      <h2 className='pt-4 text-light'>List of countries:</h2>
      <div className='countriesList d-flex flex-column mt-2'>
        {contentToDisplay}
      </div>
    </section>
  );
}
