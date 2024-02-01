import { gql } from '@apollo/client';

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      currency
      emoji
      languages {
        code
        name
      }
      continent {
        code
        name
      }
    }
  }
`;

const GET_COUNTRIES_WITH_CURRENCY = gql`
  query {
    countries {
      code
      currency
    }
  }
`;

const GET_COUNTRIES_BY_CONTINENT = gql`
  query {
    continents {
      code
      name
      countries {
        code
        name
        currency
      }
    }
  }
`;

const GET_COUNTRIES_WITH_DETAILS = gql`
  query {
    countries {
      code
      name
      currency
      emoji
      capital
      languages {
        code
        name
      }
      continent {
        code
        name
      }
    }
  }
`;

export {
  GET_COUNTRIES,
  GET_COUNTRIES_WITH_CURRENCY,
  GET_COUNTRIES_BY_CONTINENT,
  GET_COUNTRIES_WITH_DETAILS,
};
