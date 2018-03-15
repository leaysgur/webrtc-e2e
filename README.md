# webrtc-e2e

by `testcafe`(= not using `selenium`).

### Setup

```sh
# prepare your key
echo "window.__SKYWAY_KEY__ = '<YOUR_KEY_HERE>';" >> ./src/shared/key.js

# then run all tests
npm run test
# or run specified test
npm run test ./tests/2.js

# for dev
npm run _server
npm run _tc chrome ./tests/3.js
```

### Contents

- 1: Vanilla P2P:Media
- 2: SkyWay P2P:Media
- 3: SkyWay P2P:Data
- 4: SkyWay P2P:Media replaceStream
- 5: SkyWay MeshRoom
- 6: SkyWay SfuRoom
