import { useRouteError } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  errorHolder: {
    padding: "20px 30px"
  },
  header: {
    fontWeight: "bolder"
  }
})

const ErrorPage = () => {
  const classes = useStyles()

  const error: any = useRouteError()
  console.error(error)

  return (
    <div className={classes.errorHolder}>
      <h1 className={classes.header}>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}

export default ErrorPage