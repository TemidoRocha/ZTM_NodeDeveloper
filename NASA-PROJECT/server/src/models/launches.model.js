const launchesDB = require('./launches.mongo');
const planets = require('./planets.mongo');

const launches = new Map();

let latesFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Keppler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('Decembe 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['NASA', 'ZTM'],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

function existsLaunchId(launchId) {
  return launches.has(launchId);
}

async function getAllLaunches() {
  return await launchesDB.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new Error('No matching planet found');
  }
  await launchesDB.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

function addNewLaunch(launch) {
  latesFlightNumber++;
  launches.set(
    latesFlightNumber,
    Object.assign(launch, {
      flightNumber: latesFlightNumber,
      customer: ['NASA', 'Zero To Mastery'],
      upcoming: true,
      success: true,
    })
  );
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = { existsLaunchId, getAllLaunches, addNewLaunch, abortLaunchById };
