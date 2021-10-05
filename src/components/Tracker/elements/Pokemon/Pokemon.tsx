import React, { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import shallow from 'zustand/shallow';
import useStore from 'store';
import POKEMON from 'constants/pokemon';
import FILTERS from 'constants/filters';
import { TEncounter } from 'constants/types';
import { RULE_ALERTS } from 'constants/constant';
import { Evolve } from 'components/Tracker/elements';
import { PokemonSelector } from 'common';
import styles from './Pokemon.module.scss';

interface PokemonProps {
  encounter: TEncounter;
}

const Pokemon: React.FC<PokemonProps> = React.memo(({ encounter }) => {
  const changePokemon = useStore((state) => state.changePokemon);
  const duplicates = useStore(useCallback((state) => state.duplicates, []));
  const showAll = useStore(useCallback((state) => state.showAll, []));
  const games = useStore(useCallback((state) => state.games, []));
  const selectedGame = useStore(
    useCallback((state) => state.selectedGame, []),
    shallow
  );
  const rules = useStore(useCallback((state) => state.rules, []));
  const selectedRuleset = useStore(useCallback((state) => state.selectedRuleset, []));
  const foundPokemon = POKEMON.find((poke) => poke.value === encounter?.pokemon);

  const getAlertText = useCallback(
    (pokemonId) => {
      let alert = '';
      let teamCounter = 0;
      const genRule = rules[selectedRuleset]?.find((rule) => rule.type === 'GENERATION');
      const levelRule = rules[selectedRuleset]?.find((rule) => rule.type === 'LEVEL');
      const typeRule = rules[selectedRuleset]?.find((rule) => rule.type === 'TYPE');
      const foundPoke = POKEMON.find((poke) => poke.value === pokemonId);
      if (!foundPoke) {
        return '';
      }
      games[selectedGame?.value].encounters?.forEach((enc) => {
        if (
          duplicates &&
          !!pokemonId &&
          enc?.pokemon === pokemonId &&
          enc.id !== encounter?.id &&
          enc?.status?.value !== 5 &&
          encounter?.status?.value !== 5
        ) {
          alert = 'DUPE';
        }
        if (encounter?.status?.value === 7 && enc?.status?.value === 7) {
          teamCounter += 1;
        }
        if (
          (genRule?.content as number[])?.length > 0 &&
          !(genRule?.content as number[])?.includes(foundPoke?.generation)
        ) {
          alert = 'FORBIDDEN GEN';
        }
        if (levelRule?.content < encounter?.details?.level) {
          alert = 'OVERLEVELED';
        }
        if (
          (typeRule?.content as string[])?.length > 0 &&
          !(typeRule?.content as string[])?.includes(foundPoke?.type) &&
          !(typeRule?.content as string[])?.includes(foundPoke?.dualtype)
        ) {
          alert = 'FORBIDDEN TYPE';
        }
      });
      if (teamCounter > 6) {
        return 'TEAM OVER 6';
      }
      return alert;
    },
    [duplicates, encounter, games, rules, selectedGame, selectedRuleset]
  );

  const alertText = useMemo(() => {
    return getAlertText(encounter?.pokemon);
  }, [encounter?.pokemon, getAlertText]);

  const filter = useMemo(() => {
    return encounter?.filterKey && !showAll
      ? POKEMON.reduce((filtered, poke) => {
          if (
            FILTERS[encounter?.filterKey]?.includes(poke.text) ||
            encounter.pokemon === poke.value
          ) {
            filtered.push(poke.value);
          }
          return filtered;
        }, [])
      : false;
  }, [encounter, showAll]);

  const onChange = (pokemonId: number) => {
    changePokemon(encounter.id, pokemonId);
    const alert = getAlertText(pokemonId);
    if (!!alert && !toast.isActive(alert)) {
      toast.warn(RULE_ALERTS[alert], { toastId: alert });
    }
  };

  return (
    <div className={styles.pokemonSelect}>
      <div className={styles.innerLabel}>Pokémon: {!!alertText && <span>{alertText}</span>}</div>
      <div aria-label="Pokémon selector" className={styles.container}>
        <PokemonSelector filter={filter} handlePokemon={onChange}>
          {encounter?.pokemon ? (
            <div
              className={`${styles.selector} ${!!foundPokemon?.evolve ? styles.evolve : ''}`}
              data-testid={`pokemon-${encounter.id}`}
            >
              <img alt={foundPokemon.text} src={foundPokemon.image} />
              <span>{foundPokemon.text}</span>
            </div>
          ) : (
            <div className={styles.selector} data-testid={`pokemon-${encounter.id}`}>
              <span data-testid={`encounter-empty-${encounter.id}`}>Select...</span>
            </div>
          )}
        </PokemonSelector>
        {!!foundPokemon?.evolve && (
          <Evolve encounter={encounter} evolveIds={foundPokemon?.evolve} />
        )}
      </div>
    </div>
  );
});

export default Pokemon;
