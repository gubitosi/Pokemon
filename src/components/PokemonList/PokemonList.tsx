import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon, useGetPokemons } from '../../hooks/useGetPokemons';
import { useGetPokemon } from '../../hooks/useGetPokemon';
import { SearchBox } from '../SearchBox/SearchBox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSearchParams } from 'react-router-dom';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [ pokemonsFiltered, setPokemonsFiltered ] = useState<Pokemon[]>(pokemons);

  const [searchParams, setSearchParams] = useSearchParams();

  const pokemonId = searchParams.get('id')
  const pokemonName = searchParams.get('name')
  const { pokemon, loading: singlePokemonLoading } = useGetPokemon(pokemonId, pokemonName);

  const handleDialogOpen = (pkmn: Pokemon) => {
    setSearchParams({dialog: 'true', id: pkmn?.id, name: pkmn?.name});
  };

  const handleDialogClose = () => {
    setSearchParams({});
  };

  useEffect(() => {
    setPokemonsFiltered(pokemons);
  }, [pokemons]);

  return (
    <div className={classes.root}>
      <SearchBox pokemons={pokemons} setPokemonsFiltered={setPokemonsFiltered}/>
      {loading && <div>Loading...</div>}
      {pokemonsFiltered.map((pkmn) => (
        <div className={classes.pokemon} key={pkmn.id}>
          <Button className={classes.button} variant='contained' color='primary' onClick={() => handleDialogOpen(pkmn)}>
            <div>
              <img className={classes.image} src={pkmn.image}/>
              <div>{pkmn.number}. {pkmn.name}</div>
              <div>Types: {pkmn.types.join(', ')}</div>
            </div>
          </Button>

        </div>
      ))}
      {searchParams.get('dialog') ? <Dialog
        open={!!searchParams.get('dialog') && !singlePokemonLoading}
        onClose={handleDialogClose}
        aria-labelledby="dialog-title"
      >
        <DialogTitle className={classes.dialogTitle} id="alert-dialog-title">
          {`${pokemon?.number}. ${pokemon?.name}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Classification: ${pokemon?.classification}`}
          </DialogContentText>
          <DialogContentText>
            {`Flee Rate: ${pokemon?.fleeRate}`}
          </DialogContentText>
          <DialogContentText>
            {`Maximum CP: ${pokemon?.maxCP}`}
          </DialogContentText>
          <DialogContentText>
            {`Maximum HP: ${pokemon?.maxHP}`}
          </DialogContentText>
          <DialogContentText>
            {`Types: ${pokemon?.types?.join(', ')}`}
          </DialogContentText>
          <DialogContentText>
            {`Resistant: ${pokemon?.resistant?.join(', ')}`}
          </DialogContentText>
          <DialogContentText>
            {`Weaknesses: ${pokemon?.weaknesses?.join(', ')}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog> : null}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },
    pokemon: {
      marginBottom: '30px'
    },
    button: {
      minWidth: '392px !important',
      paddingTop: '16px !important'
    },
    image: {
      borderRadius: '4px'
    },
    dialogTitle: {
      color: 'black'
    }
  },
  { name: 'PokemonList' }
);
