import React from "react";
import { jss } from "react-jss";
import { ThemeMode } from "../../state/reducers/theming";
import CloseButton from "./modal/close-button";

const { classes } = jss.createStyleSheet({
  '@keyframes fadeShow': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  mask: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "auto",
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  wrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "auto",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animationName: '$fadeShow',
    animationDuration: "0.5s",
  },
  holder: {
    width: 500,
    height: 300,
    background: "#ffffff",
    color: "#000000",
    display: "flex",
    flexFlow: "column",
  },
  holderDark: {
    background: "#001529",
    color: "#ffffff",
  },
  header: {
    fontSize: 16,
    borderBottom: "1px solid #f0f0f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& span": {
      display: "inline-flex",
      alignSelf: "center",
    },
    "& span:first-child": {
      padding: "16px 24px",
    },
    "& span:last-child": {
      padding: "20px",
      cursor: "pointer",
    }
  },
  headerDark: {
    borderBottomColor: "#002141"
  },
  content: {
    padding: "24px",
    overflow: "auto"
  },
}).attach()

interface PropsType {
  children: React.ReactNode
  mode: ThemeMode
  title: string
}

interface StateType {
  isOpen: boolean
}

class Modal extends React.Component<PropsType, StateType> {
  constructor(props: any) {
    super(props)
    this.state = {
      isOpen: true
    }
  }

  close = () => {
    this.setState({
      isOpen: false
    })
  }

  render(): React.ReactNode {
    return this.state.isOpen ? (
      <>
        <div className={classes.mask}></div>
        <div className={classes.wrapper} onClick={(e) => { this.close(); e.stopPropagation(); }}>
          <div className={[classes.holder, (this.props.mode === ThemeMode.Dark ? classes.holderDark : "")].join(' ')} onClick={(e) => { e.stopPropagation() }}>
            <div className={[classes.header, (this.props.mode === ThemeMode.Dark ? classes.headerDark : "")].join(' ')}>
              <span>{this.props.title}</span>
              <span onClick={this.close}><CloseButton></CloseButton></span>
            </div>
            <div className={classes.content}>
              {this.props.children}
            </div>
          </div>
        </div>
      </>
    ) : <></>
  }
}

export default Modal