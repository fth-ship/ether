module.exports = exports = {
  install: {
    usage: '-i, --install [path]',
    description: 'Run the main task of the generator to create the bulding.'
  },
  use: {
    usage: '-u, --use [path]',
    description: 'Alone, has the same behavior of install.'
  },
  make: {
    usage: '-m, --make [name]',
    description: 'Use with -u to perform an task registed in the etherfile of the context.'
  }
};
