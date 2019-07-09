## value-domain dynamic DNS with local
### startup

```bash
echo "module.exports = {
  domain: 'example.com',
  token: 'secret',
};" > app/.env.js
```

```
echo "ifconfig | grep broadcast | awk '{print $2}'" > ~/bin/get-local
```

```
npm i
npm run lint
npm start
```
