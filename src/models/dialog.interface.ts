export interface InputDialogResult {
  ok: boolean,
  data: any,
}

export interface InputItemStore {
  name: string,
  value: string | number | boolean,
}

export interface DialogInputItem extends InputItemStore {
  propName: string, // the name of the field holding the property value
  type?: "text" | "textArea" | "checkBox" | "number",
  isRequired?: boolean,
}