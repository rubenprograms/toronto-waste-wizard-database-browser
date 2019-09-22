import React, { Component } from 'react';
import './css/App.css';
import './css/Record.css';
import './css/Favourites.css';
import Header from './Components/Header/Header';
import SearchBox from './Components/SearchBox/SearchBox';
import QueryResults from './Components/QueryResults/QueryResults';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { wasteSystemData: [], wasteSystemDataRetrieved: false, matchesToQuery: [], favouritedRecords: {}, userHasSearched: false };
    this.fetchData = this.fetchData.bind(this);
    this.queryWasteDatabase = this.queryWasteDatabase.bind(this);
    this.favouritingHandler = this.favouritingHandler.bind(this);
  }

  componentDidMount() {
    // Get data:
    this.fetchData();
  }

  fetchData() {
    // For anyone reviewing my code, the sole reason why I am using the XMLHttpRequest object for 
    // making this HTTP GET request is that I wanted to master this object's API since I, in the past,
    // had struggled with it. I am aware of 'better' ways of making HTTP requests, though, like the fetch API.
    var getTorontoWasteSystemData = new XMLHttpRequest();
    var requestURL = 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000';
    getTorontoWasteSystemData.open('GET', requestURL, true);
    getTorontoWasteSystemData.setRequestHeader('Accept', 'application/json');
    const APP_COMPONENT = this;
    getTorontoWasteSystemData.onreadystatechange = function () {
      if (getTorontoWasteSystemData.readyState === 4 && getTorontoWasteSystemData.status === 200) {
        var responseType = getTorontoWasteSystemData.responseType;
        var response = getTorontoWasteSystemData.responseText;
        if (responseType.length === 0 || responseType === 'text') {
          response = JSON.parse(response);
        }
        // Before setting the state, add IDs and favourite status:
        var initializedData = APP_COMPONENT.initializeFavouriteStatus(APP_COMPONENT.initializeIDs(response));
        APP_COMPONENT.setState({ wasteSystemData: initializedData, wasteSystemDataRetrieved: true });
      }
    }
    getTorontoWasteSystemData.send();
  }

  // Add IDs to keep track of favourited records.
  initializeIDs(data) {
    for (var i = 0; i < data.length; i++) {
      data[i].recordIndex = i;
    }
    return data;
  }

  initializeFavouriteStatus(data) {
    for (var i = 0; i < data.length; i++) {
      data[i].isFavourite = false;
    }
    return data;
  }

  queryWasteDatabase(keywords) {
    if (this.state.wasteSystemDataRetrieved) {
      // Go through the fetched data and determine the ones that contain one of the keywords:
      var matches = [], nOfRecords = this.state.wasteSystemData.length;
      for (var i = 0; i < nOfRecords; i++) {
        var currentRecord = this.state.wasteSystemData[i], keywordsInCurrentRecord = currentRecord.keywords.replace(',', ' ').split(' ');
        var nOfKeywordsInCurrentRecord = keywordsInCurrentRecord.length;
        for (var j = 0; j < nOfKeywordsInCurrentRecord; j++) {
          if (keywords.includes(keywordsInCurrentRecord[j]) && !matches.includes(currentRecord)) {
            matches.push(currentRecord);
          }
        }
      }
      this.setState({ matchesToQuery: matches.slice(0), userHasSearched: true });
    } else {
      window.alert('No data can be retrieved at this time. There seems to be a problem with the provider of the Toronto Waste System Data. Please let us know so we can look into it and fix this issue.');
    }
  }

  favouritingHandler(recordIndex, wasFavourite) {
    var favouritedRecordsCopy = this.state.favouritedRecords.slice(0), wasteSystemDataCopy = this.state.wasteSystemData.slice(0);
    if (wasFavourite) {
      delete favouritedRecordsCopy.recordIndex;
    } else {
      favouritedRecordsCopy.recordIndex = this.state.wasteSystemData[recordIndex];
    }
    wasteSystemDataCopy[recordIndex].isFavourite = wasFavourite;
    this.setState({ favouritedRecords: favouritedRecordsCopy, wasteSystemData: wasteSystemDataCopy });
  }

  render() {
    const { userHasSearched } = this.state;
    return (
      <div className='App'>
        <Header title='Toronto Waste Lookup' />
        <SearchBox lookup={this.queryWasteDatabase} />
        {userHasSearched && <QueryResults records={this.state.matchesToQuery} />}
      </div>
    );
  }
}

export default App;
