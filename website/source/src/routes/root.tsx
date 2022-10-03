import {
  Outlet,
  Link,
  useLocation,
} from "react-router-dom";
import { createUseStyles } from 'react-jss'
import 'antd/dist/antd.css';
import { Switch, Layout, Menu } from 'antd';
import { useAppSelector, useAppDispatch } from '../state/hooks'
import { ThemeMode, toggleThemeMode } from '../state/reducers/theming'

const { Header, Content, Footer } = Layout;

const useStyles = createUseStyles({
  "@global": {
    "html, body": {
      minHeight: "100%",
      minWidth: "100%",
      margin: 0,
      lineHeight: 1.5,
    },
    "#root": {
      height: "100%",
      width: "100%",
    },
  },
  layout: {
    minHeight: "100%",
    minWidth: "100%",
  },
  header: {
    position: "relative"
  },

  light_background: {
    background: "#ffffff",
    color: "black"
  },
  dark_background: {
    background: "#001529",
    color: "white"
  },

  content: {
    padding: "20px 50px",
  },
  footer: {
    textAlign: "center"
  },
  switchElement: {
    position: "absolute",
    zIndex: 2,
    top: 20,
    right: 70,
  }
})

export enum RouteKeys {
  Builder = "/builder/",
  Content = "/content/",
  Biography = "/biography/"
}

const Root = () => {
  const classes = useStyles()
  const location = useLocation()

  const themeMode = useAppSelector((state) => state.theming.mode)
  const dispatch = useAppDispatch()

  return (
    <Layout className={classes.layout}>
      <Header className={[classes.header, (themeMode === ThemeMode.Dark ? "" : classes.light_background)].join(' ')}>
        <Menu
          theme={themeMode === ThemeMode.Dark ? "dark" : "light"}
          mode="horizontal"
          selectedKeys={[location.pathname.replaceAll("/", "")]}
          items={[
            { label: <Link to={RouteKeys.Builder}>Builder</Link>, key: RouteKeys.Builder.replaceAll("/", "") },
            { label: <Link to={RouteKeys.Content}>Content</Link>, key: RouteKeys.Content.replaceAll("/", "") },
            { label: <Link to={RouteKeys.Biography}>Biography</Link>, key: RouteKeys.Biography.replaceAll("/", "") },
          ]}
        />
        <Switch
          checkedChildren="🌜"
          unCheckedChildren="🌞"
          checked={themeMode === ThemeMode.Dark}
          onChange={() => { dispatch(toggleThemeMode()) }}
          className={classes.switchElement}
        />
      </Header>
      <Content className={[classes.content, (themeMode === ThemeMode.Dark ? classes.dark_background : classes.light_background)].join(' ')}>
        <Outlet />
      </Content>
      <Footer className={[classes.footer, (themeMode === ThemeMode.Dark ? classes.dark_background : classes.light_background)].join(' ')}>
        &copy; 2022 &nbsp;|&nbsp; Amir
      </Footer>
    </Layout>
  )
}

export default Root