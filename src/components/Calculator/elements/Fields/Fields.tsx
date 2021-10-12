import { Control, UseFormRegister } from 'react-hook-form';
import { Range } from 'components/Calculator/elements';
import { TCalculatorForm } from 'constants/types';
import useCalculate from 'hooks/useCalculate';
import styles from './Fields.module.scss';

interface FieldsProps {
  control: Control<TCalculatorForm>;
  pokemon: '1' | '2';
  register: UseFormRegister<TCalculatorForm>;
}

const EV = {
  label: 'EV',
  max: 255,
};

const IV = {
  label: 'IV',
  max: 31,
};

const T: Record<string, 'attacker' | 'defender'> = {
  '1': 'attacker',
  '2': 'defender',
};

function Fields({ control, pokemon, register }: FieldsProps): JSX.Element {
  const result = useCalculate(control);

  return (
    <section className={styles.container}>
      <details open={false}>
        <summary>
          HP <output>{result[T[pokemon]].stats.hp}</output>
        </summary>
        <fieldset className={styles.fieldset}>
          <Range control={control} name={`ivhp${pokemon}`} register={register} {...IV} />
          <Range control={control} name={`evhp${pokemon}`} register={register} {...EV} />
        </fieldset>
      </details>
      <details open={false}>
        <summary>
          ATK <output>{result[T[pokemon]].stats.atk}</output>
        </summary>
        <fieldset className={styles.fieldset}>
          <Range control={control} name={`ivatk${pokemon}`} register={register} {...IV} />
          <Range control={control} name={`evatk${pokemon}`} register={register} {...EV} />
        </fieldset>
      </details>
      <details open={false}>
        <summary>
          DEF <output>{result[T[pokemon]].stats.def}</output>
        </summary>
        <fieldset className={styles.fieldset}>
          <Range control={control} name={`ivdef${pokemon}`} register={register} {...IV} />
          <Range control={control} name={`evdef${pokemon}`} register={register} {...EV} />
        </fieldset>
      </details>
      <details open={false}>
        <summary>
          SP. ATK <output>{result[T[pokemon]].stats.spa}</output>
        </summary>
        <fieldset className={styles.fieldset}>
          <Range control={control} name={`ivspatk${pokemon}`} register={register} {...IV} />
          <Range control={control} name={`evspatk${pokemon}`} register={register} {...EV} />
        </fieldset>
      </details>
      <details open={false}>
        <summary>
          SP. DEF <output>{result[T[pokemon]].stats.spd}</output>
        </summary>
        <fieldset className={styles.fieldset}>
          <Range control={control} name={`ivspdef${pokemon}`} register={register} {...IV} />
          <Range control={control} name={`evspdef${pokemon}`} register={register} {...EV} />
        </fieldset>
      </details>
      <details open={false}>
        <summary>
          SPEED <output>{result[T[pokemon]].stats.spe}</output>
        </summary>
        <fieldset className={styles.fieldset}>
          <Range control={control} name={`ivspeed${pokemon}`} register={register} {...IV} />
          <Range control={control} name={`evspeed${pokemon}`} register={register} {...EV} />
        </fieldset>
      </details>
    </section>
  );
}

export default Fields;
