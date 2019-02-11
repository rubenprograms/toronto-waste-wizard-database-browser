import React, {Component} from 'react';

class Description extends Component {

   constructor(props) {
      super(props);
      this.state = {content: props.content};
   }

   render() {
      return (
         <div className="record_description right inline" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
      );
   }
}

export default Description;