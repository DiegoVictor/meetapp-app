# API
Clone and configure the API:
* [API](https://github.com/DiegoVictor/meetapp-api)
> For more information about the API installation and configuration just follow its README instructions.

Remember to update the `src/services/api.js` with the same server url and port configured in the API. Start the API server case you don't have did it yet:
```
meetapp-api$ yarn dev
```

# OS
This app was tested only with Android through USB connection, is strongly recommended to use the same operational system, but of course you can use an emulator or a real device connected through wifi or USB.

# Reactotron
This project is configured with [Reactotron](https://github.com/infinitered/reactotron), just open the Reactotron GUI before the app is up and running, after start the app Reactotron will identify new connections.

# Start up
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
