import React from "react";
import { jss } from "react-jss";
import { RootState } from "../state/store";
import Modal from "./biography/modal";
import { connect } from "react-redux";
import { ThemeMode } from "../state/reducers/theming";
import { Dispatch } from "@reduxjs/toolkit";

const { classes } = jss.createStyleSheet({
  holder: {
    fontSize: 20,
    textAlign: "center"
  }
}).attach()

interface PropsType {
  dispatch: Dispatch
  mode: ThemeMode
}

class Biography extends React.Component<PropsType, any> {
  render() {
    return (
      <>
        <Modal title="My Info" mode={this.props.mode}>
          <div>My Contact Information</div>
          <div>
            <span>Phone:&nbsp;</span><span><a href={"tel:+989108395385"}>+989108395385</a></span>
          </div>
          <div>
            <span>Email:&nbsp;</span><span><a href={"mailto:amhoba2014@gmail.com"}>amhoba2014@gmail.com</a></span>
          </div>
        </Modal>
        <div className={classes.holder}>
          Hello, My name is Amir hossein baghernezhad.<br />
          I have 9 years experience in Software Engineering / Development / Architecture.
        </div>
      </>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    mode: state.theming.mode
  }
}

export default connect(mapStateToProps)(Biography)
