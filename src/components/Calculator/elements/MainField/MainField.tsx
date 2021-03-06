import { useState } from 'react';
import { Controller, UseFormReturn, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Radio from 'semantic-ui-react/dist/commonjs/addons/Radio';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import { ButtonController } from 'components/Calculator/elements';
import { TERRAIN, WEATHER, WEATHER_EXCLUSIONS } from 'constants/calculator';
import type { TCalculatorForm } from 'constants/types';
import styles from './MainField.module.scss';

interface MainFieldProps {
  form: UseFormReturn<TCalculatorForm, object>;
}

function MainField({ form }: MainFieldProps): JSX.Element {
  const { t } = useTranslation('calculator');
  const calcGen = useWatch({ control: form.control, name: 'calculatorGen' });
  const { control } = form;
  const [show, setShow] = useState(false);
  return (
    <div className={styles.container}>
      <Button
        color="grey"
        data-testid="field-settings"
        disabled={calcGen <= 2}
        onClick={() => setShow((prevState) => !prevState)}
        toggle
        type="button"
      >
        {t('field')}
      </Button>
      {show && (
        <div className={styles.popup}>
          {calcGen > 2 && (
            <div>
              <label htmlFor="gameType">{t('game_type')}:</label>
              <Controller
                control={control}
                name="gameType"
                render={({ field: { onChange, value } }) => (
                  <>
                    <Radio
                      className={styles.radio}
                      checked={value === 'Singles'}
                      data-testid="gameType-singles"
                      label={t('singles')}
                      name="gameType"
                      onChange={(e, data) => onChange(data.value)}
                      value="Singles"
                    />
                    <Radio
                      className={styles.radio}
                      checked={value === 'Doubles'}
                      data-testid="gameType-doubles"
                      label={t('doubles')}
                      name="gameType"
                      onChange={(e, data) => onChange(data.value)}
                      value="Doubles"
                    />
                  </>
                )}
              />
            </div>
          )}
          {calcGen > 5 && (
            <div>
              <label htmlFor="terrain">{t('terrain')}:</label>
              <Controller
                control={control}
                name="terrain"
                render={({ field: { onChange, value } }) => (
                  <>
                    {TERRAIN.map((tera) => {
                      return (
                        <Radio
                          className={styles.radio}
                          checked={tera === value}
                          data-testid={`terrain-${tera}`}
                          key={`terrain-${tera}`}
                          label={tera}
                          name="terrain"
                          onChange={(e, data) => onChange(data.value)}
                          value={tera}
                        />
                      );
                    })}
                  </>
                )}
              />
            </div>
          )}
          {calcGen > 1 && (
            <div>
              <label htmlFor="weather">{t('weather')}:</label>
              <Controller
                control={control}
                name="weather"
                render={({ field: { onChange, value } }) => (
                  <>
                    {WEATHER.reduce((weathers, type) => {
                      if (!WEATHER_EXCLUSIONS[String(calcGen)].includes(type)) {
                        weathers.push(
                          <Radio
                            className={styles.radio}
                            checked={type === value}
                            data-testid={`weather-${type}`}
                            key={`weather-${type}`}
                            label={type}
                            name="weather"
                            onChange={(e, data) => onChange(data.value)}
                            value={type}
                          />
                        );
                      }
                      return weathers;
                    }, [])}
                  </>
                )}
              />
            </div>
          )}
          {calcGen > 3 && <ButtonController control={control} label="Gravity" name="isGravity" />}
        </div>
      )}
    </div>
  );
}

export default MainField;
