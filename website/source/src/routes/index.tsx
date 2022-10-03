import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  holder: {
    fontSize: 20,
    textAlign: "center"
  }
})

const Index = () => {
  const classes = useStyles()

  return (
    <div className={classes.holder}>
      <div>Hello, Welcome to Biography React Test Project</div>
      <div>Please click on the navbar links to get started.</div>
    </div>
  );
}

export default Index