# aneka

Aneka is a lightweight utility toolkit for everyday JavaScript and Node.js work.
It provides practical helpers for common tasks like object parsing, deep defaults,
text formatting, pagination, ID generation, time conversion, and array/object manipulation.

Built as an ESM-first package, aneka is designed for projects that prefer
small, focused utilities over large all-in-one frameworks.

## Why aneka?

- Daily-use helpers in one package, with consistent function style
- Safe and practical parsing tools for environment/config values
- Utilities for strings, arrays, objects, and async timing flows
- Works well for backend services, scripts, CLIs, and shared utility layers

## Install

```bash
npm install aneka
```

## Quick start

```js
import { parseObject, defaultsDeep, paginate, titleize } from 'aneka'

const cfg = parseObject('{"port":"3000","enabled":"true"}', { parseValue: true })
// => { port: 3000, enabled: true }

const merged = defaultsDeep({ db: { host: 'localhost' } }, { db: { pool: 10 } })
// => { db: { host: 'localhost', pool: 10 } }

const page = paginate([{ id: 1 }, { id: 2 }, { id: 3 }], { page: 1, limit: 2 })
// => { data: [{ id: 1 }, { id: 2 }], page: 1, limit: 2, count: 3, pages: 2 }

titleize('the captain of the sea')
// => 'The Captain of the Sea'
```

## Hire Me

I'm the author of [Bajo Framework](https://bajo.app).

If you have a Bajo Framework-based project and need a professional service or assistance, please <a href="https://github.com/ardhi#professional-service">click here</a>. I'd be happy to work on it at a competitive price and with fast turnaround!

## Support Me

Please support me using the channels below. Your donation will motivate me to work faster and more diligently on future development.

<a href="https://github.com/sponsors/ardhi">
  <img src="https://img.shields.io/badge/Github-slategrey?style=flat&logo=github" height="50">
</a>
<a href="https://www.paypal.com/ncp/payment/EWLERL7SCUU64">
  <img src="https://img.shields.io/badge/Paypal-blue?style=flat&logo=paypal" height="50">
</a>

<p>
<div><img alt="bc1qwtv78cwp9ef8hnqaw84fxg5856l0pggqe32g6f" src="static/bitcoin.jpeg" width="150" height="150" /><br>Bitcoin</div>
</p>

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).