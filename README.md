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
        icon: 'exit-to-app'
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

### Add new one:

| Name | Description | Type | Mandatory | Default Value |
| ---- | ----------- | ---- | --------- | ------------- |
|      |             |      |           |               |
|      |             |      |           |               |
|      |             |      |           |               |
