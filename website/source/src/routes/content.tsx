import { createUseStyles } from "react-jss"
import { ActionFunction, Link, LoaderFunction, useLoaderData } from "react-router-dom"
import { BuilderFormDataSet } from "./builder"
import { getBuilderContent } from "./misc/data-manager"
import { RouteKeys } from "./root"

export const routeAction: ActionFunction = async () => { }

export const routeLoader: LoaderFunction = async (): Promise<BuilderFormDataSet> => {
  return {
    content: await getBuilderContent()
  }
}

const useStyles = createUseStyles({
  nothingToShow: {
    fontSize: 20,
    textAlign: "center"
  }
})

const Content = () => {
  const classes = useStyles()
  const loaderData = useLoaderData() as BuilderFormDataSet

  return (
    loaderData.content === "" ?
      <div className={classes.nothingToShow}>
        We've got nothing to show here 🤷‍♂️ <br />
        Please <Link to={RouteKeys.Builder}>go to builder</Link>
      </div>
      :
      <div dangerouslySetInnerHTML={{ __html: loaderData.content }}></div>
  )
}

export default Content