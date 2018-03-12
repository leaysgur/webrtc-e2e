# webrtc-e2e

by `testcafe`(= not using `selenium`).

```sh
# prepare your key
echo "window.__SKYWAY_KEY__ = '<YOUR_KEY_HERE>';" >> ./pages/key.js

# then run all tests
npm run test
# or run specified test
npm run test ./tests/2.js
```
