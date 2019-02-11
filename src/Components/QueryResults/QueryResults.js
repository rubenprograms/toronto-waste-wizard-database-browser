import React, {Component} from 'react';
import Record from '../Shared Components/Record/Record';

class QueryResult extends Component {
   constructor (props) {
      super(props);
      this.state = {records: props.records, listOfRecordsToDisplay: this.getDisplayList(props.records)};
   }

   componentDidUpdate(prevProps) {
      if (this.props.records !== prevProps.records) {
         this.setState({listOfRecordsToDisplay: this.getDisplayList(this.props.records)});
       }
   }

   getDisplayList(records) {
      var display = records.map((r) => <Record key={r.recordIndex} isFavourite={r.isFavourite} title={r.title} description={r.body}/>);
      return display;
   }

   render() {
      return (
         <div>{this.state.listOfRecordsToDisplay}</div>
      )
   }

}

export default QueryResult;