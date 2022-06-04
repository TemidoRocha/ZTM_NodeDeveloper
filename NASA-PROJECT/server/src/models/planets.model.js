const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const habitablePlanets = [];

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

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..', 'data', 'kepler_data.csv'))
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on('error', (err) => {
        reject(err);
      })
      .on('end', () => {
        console.log('Planets loaded');
        resolve();
      });
  });
}

module.exports = {
  planets: habitablePlanets,
  loadPlanetsData,
};
