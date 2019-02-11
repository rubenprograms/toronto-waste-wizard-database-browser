import React, {Component} from 'react';

class Title extends Component {
   
    constructor(props) {
      super(props);
      this.state = {isFavourite: props.isFavourite, content: props.title};
      this.iconClicked = this.iconClicked.bind(this);
   }

   iconClicked() {
      this.setState(function (state, props) {
         return {isFavourite: !state.isFavourite}
      });
   }

   render() {
      return (
            <div className='record_title inline'>
               <img className='internal_component' src={require(this.state.isFavourite? '../../../../Images/favourited.png': '../../../../Images/not_favourited.png')} onClick={this.iconClicked}/>
               <div className='right internal_component title_content'>{this.state.content}</div>
            </div>
      );
   }
}

export default Title;