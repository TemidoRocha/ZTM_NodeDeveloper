const { parse } = require('csv-parse');

const fs = require('fs');

const habitablePlanet = [];

/**
 * https://www.centauri-dreams.org/2015/01/30/a-review-of-the-best-habitable-planet-candidates/
 *
 * @param {*} planet
 * @returns { boolean }
 *
 */
function isHabitablePlanet(planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

fs.createReadStream('kepler_data.csv')
  .pipe(
    parse({
      comment: '#',
      columns: true,
    })
  )
  .on('data', (data) => {
    if (isHabitablePlanet(data)) {
      habitablePlanet.push(data);
    }
  })
  .on('error', (err) => {
    console.log(err);
  })
  .on('end', () => {
    const planetNames = habitablePlanet.map((planet) => planet.keplerName);
    console.log(`
      There are ${habitablePlanet.length} habitable planets:
      ${planetNames}
    `);
    console.log('done');
  });
