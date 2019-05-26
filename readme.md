## value-domain dynamic DNS with local
### startup

```bash
echo 'module.exports = {
  domain: 'example.com',
  token: 'secret',
};' > app/.env.js
```

```
vi ~/bin/get-local
ifconfig | grep broadcast | awk '{print $2}'
```

```
npm i
npm run lint
npm start
```
