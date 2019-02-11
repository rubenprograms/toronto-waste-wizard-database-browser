import React, { Component } from 'react';

class SearchBox extends Component {
   constructor(props) {
      super(props);
      this.lookup = props.lookup;
      this.updateKeywords = this.updateKeywords.bind(this);
      this.sendQuery = this.sendQuery.bind(this);
      this.state = {keywords: []};
   }

   sendQuery() {
      this.lookup(this.state.keywords);
   }

   updateKeywords(event) {
      var keywords = event.target.value.split(/\s+/);
      this.setState({keywords: keywords});
   }

   render() {
      return (
         <div className='container searchbox_container'>
            <input className='searchbox_ele left' type="text" placeholder='Enter a keyword' onChange={this.updateKeywords}/>
            <img className='searchbox_ele right' onClick={this.sendQuery} src={require('../../Images/lookup_icon.png')} alt='Icon that when clicked starts a query on the database.'/>
         </div>
      );

   }
}

export default SearchBox;