import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

type Pokemon = {
  id: string;
  name: string;
  number: number;
  weight: object;
  height: object;
  types: [string];
  classification: string;
  resistant: [string];
  weaknesses: [string];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
};

export const GET_POKEMON = gql`
  query pokemon($id: String, $name: String){
    pokemon(id: $id, name: $name){
      id
      number
      name
      weight{
        minimum
        maximum
      }
      height{
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemon = (id: string | null, name: string | null) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON, {
    variables: {
      id: id,
      name: name
    },
  });

  const pokemon: Pokemon = data?.pokemon

  return {
    pokemon,
    ...queryRes,
  };
};
