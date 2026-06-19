# [App] Meetapp
[![AppVeyor](https://img.shields.io/appveyor/build/diegovictor/meetapp-app?logo=appveyor&style=flat-square)](https://ci.appveyor.com/project/DiegoVictor/meetapp-app)
[![react-native](https://img.shields.io/badge/react--native-0.81.5-61dafb?style=flat-square&logo=react)](https://reactnative.dev/)
[![styled-components](https://img.shields.io/badge/styled_components-6.4.2-db7b86?style=flat-square&logo=styled-components)](https://styled-components.com/)
[![eslint](https://img.shields.io/badge/eslint-7.16.0-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)
[![airbnb-style](https://flat.badgen.net/badge/style-guide/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![jest](https://img.shields.io/badge/jest-30.4.2-brightgreen?style=flat-square&logo=jest)](https://jestjs.io/)
[![coverage](https://img.shields.io/codecov/c/gh/DiegoVictor/meetapp-app?logo=codecov&style=flat-square)](https://codecov.io/gh/DiegoVictor/meetapp-app)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://github.com/DiegoVictor/meetapp-app/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

This app version allow users to edit your profile, see available meetups, subscribe and unsubscribe to them. All the resources used by this application comes from its [`API`](https://github.com/DiegoVictor/meetapp-api).

## Table of Contents
* [Screenshots](#screenshots)
* [Installing](#installing)
  * [Configuring](#configuring)
    * [.env](#env)
    * [API](#api)
* [Usage](#usage)
  * [OS](#os)
* [Running the tests](#running-the-tests)
  * [Coverage report](#coverage-report)

# Screenshots
Click to expand.<br>
<img src="https://raw.githubusercontent.com/DiegoVictor/meetapp-app/master/screenshots/signin.jpg" width="32%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/meetapp-app/master/screenshots/signup.jpg" width="32%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/meetapp-app/master/screenshots/dashboard.jpg" width="32%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/meetapp-app/master/screenshots/subscribe.jpg" width="32%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/meetapp-app/master/screenshots/profile.jpg" width="32%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/meetapp-app/master/screenshots/subscriptions.jpg" width="32%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/meetapp-app/master/screenshots/unsubscribe.jpg" width="32%" />

# Installing
Easy peasy lemon squeezy:
```
$ yarn
```
Or:
```
$ npm install
```
> Was installed and configured the [`eslint`](https://eslint.org/) and [`prettier`](https://prettier.io/) to keep the code clean and patterned.

## Configuring
Configure your environment variables and remember to start the [API](https://github.com/DiegoVictor/meetapp-api) before to start this app.

### .env
In this file you may configure the API's url. Rename the `.env.example` in the root directory to `.env` then just update with your settings.

key|description|default
---|---|---
API_URL|API's url with version (v1)|`http://localhost:3333/v1`

### API
Start the [`API`](https://github.com/DiegoVictor/meetapp-api) (see its README for more information). In case of any change in the API's port or host remember to update the `.env`'s `API_URL` property too.
> Also, maybe you need run reverse command to the API's port: `adb reverse tcp:3333 tcp:3333`

# Usage
The first build must be through USB connection, so connect your device (or just open your emulator) and run:
```
$ yarn android
```
Or:
```
$ npm run android
```
> For iOS use ios instead of android

In the next times you can just start the Metro Bundler server:
```
$ yarn start
```
Or:
```
$ npm run start
```
> See for more information in [Running On Device](https://reactnative.dev/docs/running-on-device).

## OS
This app was tested only with Android through USB connection and [Genymotion](https://www.genymotion.com/) (Emulator), is strongly recommended to use the same operational system, but of course you can use an emulator or a real device connected through wifi or USB.

# Running the tests
[Jest](https://jestjs.io/) was the choice to test the app, to run:
```
$ yarn test
```
Or:
```
$ npm run test
```

## Coverage report
You can see the coverage report inside `tests/coverage`. They are automatically created after the tests run.
