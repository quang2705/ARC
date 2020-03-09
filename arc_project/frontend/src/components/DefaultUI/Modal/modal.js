import React, { Component } from 'react';
import { render } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import css from './modal.module.css';

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { screenTop: 0,
                   contentHeight: 0,
                   titleWidth: 0, };
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeHandler);

    this.resizeHandler();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
  }

  resizeHandler = () => {
    // Set height for content for overflow scroll
    let winHeight = window.innerHeight;
    this.setState({ contentHeight: winHeight*0.9-50-10*4 });

    // Set max-width for title text
    let headerWidth = document.getElementsByClassName(css.header)[0].offsetWidth;
    console.log(headerWidth);
    this.setState({ titleWidth: headerWidth-10*2-20*2 });
  }

  render() {
    return (
      <div className={css.wrapper} style={{ visibility: this.props.isVisible ? 'visible': 'hidden', }}
           onScroll={this.scrollHandler}>
        <div className={css.screen} onClick={this.props.toggle}/>
        <div className={css.container+' '+this.props.className} style={{ opacity: this.props.isVisible ? 1 : 0,
                                                                         top: this.props.isVisible ? '0px' : '300px' }}>

          <div className={css.header+' '+this.props.classNameTitle}>
            <div className={css.title} title={this.props.title}>
              <div style={{ fontSize: '25px', fontWeight: '700', maxWidth: this.state.titleWidth }}>
                {this.props.title}
              </div>
            </div>
            <div className={css.closeIcon} onClick={this.props.toggle}>
              <FontAwesomeIcon icon='times'/>
            </div>
          </div>

          <div className={css.content+' '+this.props.classNameContent}
               style={{ maxHeight: this.state.contentHeight }}>
            {this.props.children}
          </div>

          <div className={css.footer+' '+this.props.classNameFooter}>

          </div>
        </div>
      </div>
    );
  }
}
