require('core');
const env = require('./env');

const app = {
  domain: '-local',
  url: 'https://dyn.value-domain.com/cgi-bin/dyn.fcg',
  headers: {
    accept: ['text/html',
      'application/xhtml+xml',
      'application/xml;q=0.9',
      'image/webp',
      'image/apng',
      '*/*;q=0.8',
      'application/signed-exchange;v=b3',
    ].join(','),
    'accept-language': 'ja,en-US;q=0.9,en;q=0.8',
    'cache-control': 'max-age=0',
    'upgrade-insecure-requests': '1',
  },
  async getAddress() {
    const ips = process.argv;
    ips.shift();
    ips.shift();
    app.host = ips.shift();
    return ips;
  },
  async postAddress(host, ip) {
    logger.info({ host, ip });
    await fetch(`${app.url}?d=${env.domain}&p=${env.token}&h=${host}&i=${ip}`, {
      credentials: 'include',
      headers: app.headers,
      referrer: 'https://dyn.value-domain.com/cgi-bin/dyn.fcg?',
      referrerPolicy: 'no-referrer-when-downgrade',
      body: null,
      method: 'GET',
      mode: 'cors',
    })
    .then(res => res.text())
    .then(text => logger.info(text));
  },
  async setAddress(ips) {
    let delay = 0;
    for (const index in ips) {
      if ({}.hasOwnProperty.call(ips, index)) {
        const ip = ips[index];
        setTimeout(
          () => app.postAddress(`${app.host}${index}${app.domain}`, ip),
          (delay++) * 5000,
        );
      }
    }
  },
  main() {
    return app.getAddress()
    .then(ips => app.setAddress(ips));
  },
  start() {
    app.main()
    .catch(logger.error);
  },
};
app.start();
