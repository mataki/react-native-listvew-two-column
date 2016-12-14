import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';

class App extends React.Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      isLoading: true,
      dataSource: ds.cloneWithRows([1, 2]),
    };
  }

  componentWillMount() {
    fetch('https://api.spotify.com/v1/search?q=the&type=artist')
    .then(response => response.json())
    .then(response => {
      // console.log(response)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(response.artists.items),
        isLoading: false,
      });
    });
  }

  renderRow(data) {
    console.log(data)
    return (
      <View style={{ padding: 10, backgroundColor: 'white', margin: 5 }}>
        <Text>{data.name}</Text>
      </View>
    )
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>ロード中</Text>
        </View>
      )
    }
    return (
      <ListView
        style={{ flex: 1, paddingTop: 20, backgroundColor: '#dddddd' }}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        />
    );
  }
}

Exponent.registerRootComponent(App);
