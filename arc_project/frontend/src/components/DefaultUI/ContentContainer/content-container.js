import React, { Component } from 'react';
import { render } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import css from './content-container.module.css';

/*
This class implements the ContentContainer component, which contains the main content
of a page. This component supports multi-tabs sections.
@parameters
  tabs: an array of strings specifying tab names.
  onTabChangeCallback: callback function when another tab is selected. The corresponding index
  in `tabs` is passed into the callback.
@class
  classNameTab: for each tab
  classNameSelectedTab: for selected tab
  classNameContent: for content section
*/
export default class ContentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { currentTab: 0 };

  }

  onTabClickHandler = (event) => {
    let newIndex = parseInt(event.target.getAttribute('index'));
    this.setState({ currentTab: newIndex });

    if (this.props.onTabChangeCallback)
      this.props.onTabChangeCallback(newIndex);
  }

  render() {
    let tabs = this.props.tabs.map((tab, index) => {
      let selectedTabStyle = this.state.currentTab === index ? css.selectedTab+' '+this.props.classNameSelectedTab : '';
      return (
        <span key={index} onClick={this.onTabClickHandler} index={index}
              className={css.tab+' '+selectedTabStyle+' '+this.props.classNameTab}>
          {tab}
        </span>
      );
    });
		console.log("children",this.props.children);
		console.log("children",this.props.classNameContent);
		console.log("current index", this.state.currentTab);
    return (
      <div className={css.container}>
        <div className={css.wrapper}>
        <div className={css.tabsContainer}>
          {tabs}
        </div>

        <div className={css.content+' '+this.props.classNameContent}>
          {this.props.children}
        </div>
        </div>
      </div>
    );
  }
}
