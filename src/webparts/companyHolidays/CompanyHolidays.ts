export interface ICompanyHolidays{
    value: ICompanyHoliday[];
}


export interface ICompanyHoliday{
    Id:string;
    Title:string;
    Description:string;
    EventDate:Date;
}