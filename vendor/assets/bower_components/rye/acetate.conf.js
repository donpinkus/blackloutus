function config(acetate) {
  acetate.global('config', {
    environment: 'dev',
  });

  acetate.layout('**/*', 'layouts/_layout:content');
  acetate.options.src = 'source';
  acetate.options.dest = 'build';
}

module.exports = config;