Run npm install

Then: 
npm install --save babel-cli@6.11.x babel-core@6.13.x  \
  babel-preset-es2015@6.13.x babel-preset-react@6.11.x ejs@2.5.x \
  express@4.14.x react@15.3.x react-dom@15.3.x react-router@2.6.x

  npm install --save-dev webpack@1.13.x babel-loader@6.2.x http-server@0.9.x

  Run the server:

  NODE_ENV=production node_modules/.bin/babel-node --presets react,es2015 src/server.js

Go to localhost:3000