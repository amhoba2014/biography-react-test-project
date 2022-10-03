import { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useAppSelector } from '../state/hooks';
import { ThemeMode } from '../state/reducers/theming';
import { Button, Spin, notification } from 'antd';
import { createUseStyles } from 'react-jss';
import { getBuilderContent, setBuilderContent } from './misc/data-manager';
import { ActionFunction, LoaderFunction, Form, useLoaderData } from 'react-router-dom'

export interface BuilderFormDataSet {
  content: string
}

export const routeAction: ActionFunction = async ({ request, params }) => {
  const updates = Object.fromEntries(await request.formData()) as unknown as BuilderFormDataSet
  await setBuilderContent(updates.content)
}

export const routeLoader: LoaderFunction = async (): Promise<BuilderFormDataSet> => {
  return {
    content: await getBuilderContent()
  }
}

const useStyles = createUseStyles({
  buttonHolder: {
    textAlign: "center",
    paddingTop: 10
  },
  spinner: {
    display: "none",
    height: "400px",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    "& .ant-spin-text": {
      paddingLeft: 10,
      fontWeight: "bolder",
    },
  },
  spinnerVisible: {
    display: "flex"
  },
  editor: {
    display: "none"
  },
  editorVisible: {
    display: "initial"
  },
  notificationDark: {
    background: '#001e39',
    color: "white",
    "& .ant-notification-notice-message , & .ant-notification-notice-close": {
      color: "white"
    },
  }
})

const Builder = () => {
  const classes = useStyles()
  const themeMode = useAppSelector((state) => state.theming.mode)
  const loaderData = useLoaderData() as BuilderFormDataSet

  const editorRef = useRef<Editor>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const inputContentRef = useRef<HTMLInputElement>(null)

  const save = async () => {
    if (editorRef.current !== null && formRef.current !== null && inputContentRef.current !== null) {
      inputContentRef.current.value = editorRef.current.editor?.getContent() ?? ""
      formRef.current?.requestSubmit()
      notification.open({
        message: "Saved Successfully!",
        description: "Your modifications were saved successfully.",
        duration: 1,
        className: (themeMode === ThemeMode.Dark ? classes.notificationDark : "")
      })
    }
  }

  // Manage editor loading
  const [editorIsLoaded, setEditorIsLoaded] = useState(false)
  useEffect(() => {
    setEditorIsLoaded(false)
  }, [themeMode])

  return (
    <Form method="post" ref={formRef}>
      <Spin tip="Loading Editor..." className={[classes.spinner, (editorIsLoaded ? "" : classes.spinnerVisible)].join(' ')}></Spin>
      <div className={[classes.editor, (editorIsLoaded ? classes.editorVisible : "")].join(' ')}>
        <Editor
          key={themeMode}
          ref={editorRef}
          apiKey={"yux6044esynz4xz4ihah0jirffamsf41wegcqp5ukmn4vhe4"}
          initialValue={loaderData.content}
          onInit={() => {
            setEditorIsLoaded(true)
          }}
          init={{
            height: 400,
            menubar: false,
            plugins: [
              'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
              'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
              'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
            ],
            toolbar: 'fontfamily fontsize blocks | bold italic forecolor backcolor | ' +
              'alignleft aligncenter alignright alignjustify | ' +
              'bullist numlist checklist outdent indent | removeformat',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt 60pt 72pt 84pt 96pt 108pt 120pt',
            skin: (themeMode === ThemeMode.Dark ? "oxide-dark" : undefined),
            content_css: (themeMode === ThemeMode.Dark ? "dark" : undefined),
          }}
        />
      </div>
      <input name={"content"} type={"hidden"} ref={inputContentRef} />
      <div className={classes.buttonHolder}>
        <Button type="primary" onClick={save} disabled={!editorIsLoaded}>Save</Button>
      </div>
    </Form>
  );
}

export default Builder