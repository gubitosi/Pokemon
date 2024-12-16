import React from 'react';
import TextField from "@mui/material/TextField";
import { createUseStyles } from 'react-jss';
import { Pokemon } from '../../hooks/useGetPokemons';

type SearchBoxProps = {
  pokemons: Pokemon[],
  setPokemonsFiltered: React.Dispatch<React.SetStateAction<Pokemon[]>>
}

export const SearchBox = ({pokemons, setPokemonsFiltered} : SearchBoxProps) => {
  const classes = useStyles();

  return (
    <form className={classes.searchBox}>
      <TextField
        id="searchbox"
        onInput={(e) => {
          const filteredPokemons = pokemons.filter(pokemon => {
            const pokemonName = pokemon.name.toLowerCase();
            const searchText = (e.target as HTMLInputElement).value.toLowerCase();
            return pokemonName.includes(searchText);
          })
          setPokemonsFiltered(filteredPokemons);
        }}
        sx={{
          input: {
            color: "white",
          },
          label: {
            color: "white"
          },
          fieldSet: {
            borderColor: "white !important",
            borderWidth: "1px !important"
          }
        }}
        label="Enter a Pokémon"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
  </form>
  );
};

const useStyles = createUseStyles(
  {
    searchBox: {
      marginBottom: '30px'
    },
  },
  { name: 'SearchBox' }
);
