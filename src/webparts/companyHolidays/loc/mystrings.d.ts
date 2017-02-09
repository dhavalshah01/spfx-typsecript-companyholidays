declare interface ICompanyHolidaysStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  CalendarNameFieldLabel:string;
  NumberOfEventsFieldLabel:string;
  SortOrderFieldLabel:string;
}

declare module 'companyHolidaysStrings' {
  const strings: ICompanyHolidaysStrings;
  export = strings;
}
