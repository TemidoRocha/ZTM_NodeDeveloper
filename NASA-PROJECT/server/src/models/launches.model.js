const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: 'Keppler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('Decembe 27, 2030'),
  destination: 'Kepler-442 b',
  customer: ['NASA', 'ZTM'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

module.exports = { getAllLaunches };
