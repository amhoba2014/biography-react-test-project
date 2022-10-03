import localforage from "localforage";

enum LocalStorageKeys {
  BuilderContent = "BuilderContent"
}

export const getBuilderContent = async (): Promise<string> => {
  return (await localforage.getItem<string>(LocalStorageKeys.BuilderContent)) ?? ""
}

export const setBuilderContent = async (content: string) => {
  await localforage.setItem(LocalStorageKeys.BuilderContent, content)
}