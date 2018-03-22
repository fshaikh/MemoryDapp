// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  ipfsProviderUrl: 'ipfs.infura.io',
  protocol: 'https',
  web3ProviderUrl: 'http://localhost:8545',
  txPrice: '0.001',
  abiUrl: './MemoryContract.json',
  fetchCount: 5
};
