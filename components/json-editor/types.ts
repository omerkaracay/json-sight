export interface JsonData {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | JsonData
    | Array<JsonData[keyof JsonData]>;
}

export interface SelectedFields {
  [key: string]: boolean;
}
