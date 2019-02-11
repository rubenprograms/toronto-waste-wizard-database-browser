import React, {Component} from 'react';

class Header extends Component {
   constructor(props) {
      super(props);
      this.state = {title: props.title};
   }

   render() {
      return (
         <header>{this.state.title}</header>
      );
   }
}

export default Header;