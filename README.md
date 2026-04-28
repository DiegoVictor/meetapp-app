# [App] Meetapp
[![Travis (.org)](https://img.shields.io/travis/DiegoVictor/meetapp-app?logo=travis&style=flat-square)](https://travis-ci.org/DiegoVictor/meetapp-app)
[![react-native](https://img.shields.io/badge/react--native-0.63.4-61dafb?style=flat-square&logo=react)](https://reactnative.dev/)
[![styled-components](https://img.shields.io/badge/styled_components-4.4.1-db7b86?style=flat-square&logo=styled-components)](https://styled-components.com/)
[![eslint](https://img.shields.io/badge/eslint-7.16.0-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)
[![airbnb-style](https://flat.badgen.net/badge/style-guide/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![jest](https://img.shields.io/badge/jest-26.6.3-brightgreen?style=flat-square&logo=jest)](https://jestjs.io/)
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

The first build must be through USB connection, so connect your device (or just open your emulator) and run:
```
meetapp-app$ yarn react-native run-android
```
In the next times yuu can just run the Metro Bundler server:
```
meetapp-app$ yarn start
```

# APK
Is possible to install the app in a Android device directly from Google play:
* [MeetApp](https://play.google.com/store/apps/details?id=com.blockcode.meetapp)
