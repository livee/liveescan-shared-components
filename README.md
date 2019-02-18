# liveescan-shared-components

A set of shared components for both liveescan and liveescan-pro.

## Components

### Searchbar

Props list:

| Name          | Description                                                    | Type   | Mandatory | Default Value |
| ------------- | -------------------------------------------------------------- | ------ | --------- | ------------- |
| searchText    | The placeholder for the input                                  | string | yes       | x             |
| cancelText    | The text for the cancel button                                 | string | yes       | x             |
| searchPattern | The actual value of the input                                  | string | yes       | x             |
| onChangeText  | Event triggered when user is typing. It returns the typed text |        |           | x             |

## SettingsList

Props list:

| Name    | Description                                 | Type  | Mandatory | Default Value |
| ------- | ------------------------------------------- | ----- | --------- | ------------- |
| items   | The list of items\*                         | array | yes       | []            |
| onPress | Event triggered when user clicks on an item |       |           | x             |

\* Here is an example of the payload:

```js
[
  {
    label: `Compte`,
    data: [
      {
        label: `Déconnexion`,
        desc: `Déconnectez-vous`,
        icon: 'exit-to-app' // or a react-native component
      }
    ]
  }
];
```

### OpenSourceList

| Name  | Description          | Type | Mandatory | Default Value |
| ----- | -------------------- | ---- | --------- | ------------- |
| items | The list of items \* |      |           |               |

\* Here is an example of the payload:

```js
[
  {
    name: '@expo/react-native-action-sheet',
    text: 'The MIT License (MIT)\n\nCopyright (c) 2015 Expo\n\n [..]'
  }
];
```

### Header:

| Name            | Description                            | Type   | Mandatory | Default Value |
| --------------- | -------------------------------------- | ------ | --------- | ------------- |
| backgroundColor | The background color of the header bar | RGB    | yes       |               |
| title           | The header's title                     | string | yes       |               |

### Icon:

| Name      | Description                                       | Type   | Mandatory | Default Value |
| --------- | ------------------------------------------------- | ------ | --------- | ------------- |
| code      | The font code of the icon                         | string | yes       | x             |
| iconStyle | React-native StyleSheet object to custom the icon | Object | no        | {}            |
|           |                                                   |        |           |               |

### Notification:

| Name           | Description                                                | Type     | Mandatory | Default Value   |
| -------------- | ---------------------------------------------------------- | -------- | --------- | --------------- |
| position       | The position of the notification (top / bottom)            | string   | yes       | x               |
| duration       | The time to show the notification                          | int      | yes       | 4000            |
| type           | The type of notification (success / error / warning)       | string   | yes       | x               |
| translate      | The react-i18next object to get translations               | object   | yes       | x               |
| onDismissClick | event fired when the notification must be closed           | callback | no        | N/A             |
| colors         | An object with the following keys: success, error, warning | object   | no        | See source code |
| icons          | An object with the following keys: success, error, warning | object   | no        | See source code |

### Add new one:

| Name | Description | Type | Mandatory | Default Value |
| ---- | ----------- | ---- | --------- | ------------- |
|      |             |      |           |               |
|      |             |      |           |               |
|      |             |      |           |               |
