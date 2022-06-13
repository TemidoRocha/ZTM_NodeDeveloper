const launches = new Map();

let latesFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Keppler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('Decembe 27, 2030'),
  target: 'Kepler-442 b',
  customer: ['NASA', 'ZTM'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
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

module.exports = { getAllLaunches, addNewLaunch };