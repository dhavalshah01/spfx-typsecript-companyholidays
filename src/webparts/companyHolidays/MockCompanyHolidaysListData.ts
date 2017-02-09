import { ICompanyHoliday } from './CompanyHolidays'

export default class MockCompanyHolidaysListData {

    private static companyHolidayEvents: ICompanyHoliday[] = [
        { Title: 'Mock Event #1', Description: 'company event description', EventDate: new Date(), Id: '1' },
        { Title: 'Mock Event #2', Description: 'company event description', EventDate: new Date(), Id: '2' },
        { Title: 'Mock Event #3', Description: 'company event description', EventDate: new Date(), Id: '3' },
        { Title: 'Mock Event #4', Description: 'company event description', EventDate: new Date(), Id: '4' },
        { Title: 'Mock Event #5', Description: 'company event description', EventDate: new Date(), Id: '5' },
        { Title: 'Mock Event #6', Description: 'company event description', EventDate: new Date(), Id: '6' },
        { Title: 'Mock Event #7', Description: 'company event description', EventDate: new Date(), Id: '7' }
    ];

    public static get(restUrl: string, options?: any): Promise<ICompanyHoliday[]> {
        return new Promise<ICompanyHoliday[]>((resolve) => {
            resolve(MockCompanyHolidaysListData.companyHolidayEvents);
        });
    }
}