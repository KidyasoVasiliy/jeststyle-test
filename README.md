### Installation
To install the dependencies
```sh
    $ yarn install
```
To run the project with HTTP
```sh
    $ yarn start
```
To run the project with HTTPS.
` NOTE perhaps Google Chrome will block your local server because of the lack of SSL certificate,
click on the link in Google chrome ` [chrome://flags/#allow-insecure-localhost](chrome://flags/#allow-insecure-localhost) `Enabled option Allow invalid certificates for resources loaded from localhost.`
`
```sh
    $ yarn start:https
```
Build project
```sh
    $ yarn build
```
Run test
```sh
    $ yarn test
```
Run eject
```sh
    $ yarn eject
```
Check lint
```sh
    $ yarn lint
```

### To make requests to the server, in package.json prescribed
``"proxy": "https://comicvine.gamespot."``
Request to the server will only work when running the project on HTTPS
```sh
    $ yarn start:https
```

###  Build project
When familiarized with the source code, you can do ` yarn build ` and run a static server on your machine.
To make it work you install:
```sh
  $ npm install -g serve
```
Next, just run the command:
```sh
    $ yarn server:build
```
---
___
Completed the task of Kidyasov Vasiliy
###### Company EnjoyPro
