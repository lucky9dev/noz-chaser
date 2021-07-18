import React from 'react';
import useStore from 'store';
import POKEMON from 'constants/pokemon';
import { TPokemon } from 'constants/types';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import styles from './Pokemon.module.scss';

interface PokemonProps {
  alreadyEncountered: boolean;
  encounterId: number;
  pokemon: TPokemon;
}

const Pokemon: React.FC<PokemonProps> = React.memo(
  ({ alreadyEncountered, encounterId, pokemon }) => {
    const changePokemon = useStore((state) => state.changePokemon);
    const onChange = (e: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
      const foundPokemon = POKEMON.find((poke) => poke.value === data.value);
      changePokemon(encounterId, foundPokemon);
    };

    return (
      <label className={styles.label}>
        <div className={styles.innerLabel}>
          Pokémon: {alreadyEncountered && <span>(Dupe)</span>}
        </div>
        <Dropdown
          aria-label="Pokémon selector"
          basic
          className={styles.pokemonSelect}
          fluid
          inline
          icon={alreadyEncountered ? 'exclamation triangle' : undefined}
          labeled
          lazyLoad
          onChange={onChange}
          options={POKEMON}
          placeholder="Select..."
          search
          selection
          value={pokemon?.value ?? null}
        />
      </label>
    );
  }
);

export default Pokemon;
