import React, { useContext } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import AppContext from 'context/AppContext';
import { POKEMON } from 'constants/constant';
import { TPokemon } from 'constants/types';
import styles from './Pokemon.module.scss';

interface PokemonProps {
  encounterId: number;
  pokemon: TPokemon;
}

const Pokemon: React.FC<PokemonProps> = ({ encounterId, pokemon }) => {
  const { dispatch } = useContext(AppContext);
  const onChange = (e: unknown, selectedPokemon: TPokemon | string) => {
    if (typeof selectedPokemon !== 'string') {
      dispatch({ type: 'CHANGE_POKEMON', payload: { encounterId, pokemon: selectedPokemon } });
    }
  };

  return (
    <Autocomplete
      autoHighlight
      className={styles.pokemonSelect}
      classes={{ inputRoot: styles.pokemonSelect }}
      getOptionLabel={(option) => option.name}
      onChange={onChange}
      options={POKEMON}
      renderOption={(poke) => (
        <div className={styles.option}>
          <img src={poke.src} alt={poke.name} />
          {poke.name}
        </div>
      )}
      renderInput={(params) => (
        <div className={styles.label}>
          <TextField
            {...params}
            label="Choose a pokemon"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
          {pokemon && <img src={pokemon?.src} alt={pokemon?.name} />}
        </div>
      )}
      value={pokemon}
    />
  );
};

export default Pokemon;
