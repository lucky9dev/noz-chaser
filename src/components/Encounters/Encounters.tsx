import React, { useCallback, useMemo, useState } from 'react';
import shallow from 'zustand/shallow';
import { FixedSizeList, ListChildComponentProps as RowProps } from 'react-window';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import useStore from 'store';
import { Pokemon, Status } from 'components';
import styles from './Encounters.module.scss';

const Encounters: React.FC = React.memo(() => {
  const games = useStore(useCallback((state) => state.games, []));
  const text = useStore(useCallback((state) => state.text, []));
  const darkMode = useStore(useCallback((state) => state.darkMode, []));
  const duplicates = useStore(useCallback((state) => state.duplicates, []));
  const selectedGame = useStore(
    useCallback((state) => state.selectedGame, []),
    shallow
  );
  const clearEncounter = useStore(
    useCallback((state) => state.clearEncounter, []),
    shallow
  );
  const deleteEncounter = useStore(
    useCallback((state) => state.deleteEncounter, []),
    shallow
  );
  const [encounterToDelete, setEncounterToDelete] = useState<number>(null);
  const [confirm, setConfirm] = useState(false);

  const alreadyEncountered = useCallback(
    (pokemonId, encounterId) => {
      return games[selectedGame?.value].encounters?.some((enc) => {
        return enc?.pokemon?.value === pokemonId && enc.id !== encounterId;
      });
    },
    [games, selectedGame]
  );

  const filteredGames = useMemo(() => {
    return games[selectedGame?.value]?.encounters?.filter((enc) => {
      const upperCase = text?.toUpperCase();
      return (
        enc.location.toUpperCase()?.includes(upperCase) ||
        enc.status?.text.toUpperCase()?.includes(upperCase) ||
        enc.pokemon?.text?.toUpperCase()?.includes(upperCase)
      );
    });
  }, [games, selectedGame, text]);

  const handleClear = (encounterId: number) => {
    clearEncounter(encounterId);
  };

  const handleConfirm = (encounterId: number) => {
    setEncounterToDelete(encounterId);
    setConfirm(true);
  };

  const handleDelete = () => {
    deleteEncounter(encounterToDelete);
    setConfirm(false);
    setEncounterToDelete(null);
  };

  const renderRow: React.FC<RowProps> = ({ index, style }) => {
    const encounter = filteredGames[index];
    return (
      <div style={style} className={index % 2 === 0 ? styles.coloredRow : ''}>
        <div className={styles.row}>
          <span className={styles.location}>{encounter.location}</span>
          <Pokemon
            alreadyEncountered={
              !!encounter?.pokemon?.value && duplicates
                ? alreadyEncountered(encounter?.pokemon?.value, encounter?.id)
                : false
            }
            encounterId={encounter.id}
            pokemon={encounter.pokemon}
          />
          <Status encounterId={encounter.id} status={encounter.status} />
          <Button
            aria-label="reset encounter"
            basic
            className={styles.reset}
            compact
            icon
            inverted={darkMode}
            onClick={() => handleClear(encounter.id)}
            type="button"
          >
            <Icon name="repeat" />
          </Button>
          <Button
            aria-label="delete encounter"
            basic
            className={styles.delete}
            compact
            icon
            inverted={darkMode}
            onClick={() => handleConfirm(encounter.id)}
            type="button"
          >
            <Icon name="trash" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.table}>
      <div className={styles.list}>
        <FixedSizeList height={1000} itemCount={filteredGames?.length} itemSize={143} width="100%">
          {renderRow}
        </FixedSizeList>
      </div>
      <Confirm
        content="This will delete the encounter. Are you sure?"
        open={confirm}
        onCancel={() => setConfirm(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
});

export default Encounters;
