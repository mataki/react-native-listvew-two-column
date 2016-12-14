import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  Dimensions,
} from 'react-native';

class App extends React.Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      isLoading: true,
      dataSource: ds.cloneWithRows([1, 2]),
    };

    this.itemWidth = (Dimensions.get('window').width - 20) / 2;
    this.renderRow = this.renderRow.bind(this)
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
    const image = data.images[0]
    return (
      <View style={{ backgroundColor: 'white', margin: 5, width: this.itemWidth, height: 200, borderRadius: 2, overflow: 'hidden' }}>
        <Image source={{ uri: image.url }} style={{ flex: 1, height: 50 }}/>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 5 }}>{data.name}</Text>
          <Text style={{ fontSize: 11, color: '#555555'}}>{data.genres.slice(0, 3).join(', ')}</Text>
        </View>
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
        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        />
    );
  }
}

Exponent.registerRootComponent(App);
