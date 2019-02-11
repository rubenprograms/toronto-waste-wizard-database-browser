import React, {Component} from 'react';
import Title from './Subcomponents/Title';
import Description from './Subcomponents/Description';
import {AllHtmlEntities} from 'html-entities';

class Record extends Component {

   constructor(props) {
      super(props);
      this.state = {
         isFavourite: props.isFavourite,
         title: props.title,
         description: this.decode(props.description)
      }
   }

   decode(text) {
      text = AllHtmlEntities.decode(text);
      text = text.replace(/&nbsp;/g, ' ');
      return text;
   }

   render() {
      return (
         <div className='container'>
            <Title isFavourite={this.state.isFavourite} title={this.state.title}/>
            <Description content={this.state.description}/>
         </div>
      )
   }
}

export default Record;