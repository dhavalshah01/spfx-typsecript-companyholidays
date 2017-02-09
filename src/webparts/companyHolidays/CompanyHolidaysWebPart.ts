require('set-webpack-public-path!')
import {
  Version,
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './CompanyHolidays.module.scss';
import * as strings from 'companyHolidaysStrings';
import { ICompanyHolidaysWebPartProps } from './ICompanyHolidaysWebPartProps';
import { ICompanyHolidays, ICompanyHoliday } from './CompanyHolidays'
import MockCompanyHolidaysListData from './MockCompanyHolidaysListData'
import { SPHttpClient } from '@microsoft/sp-http'

export default class CompanyHolidaysWebPart extends BaseClientSideWebPart<ICompanyHolidaysWebPartProps> {

  private renderCompanyEventsAsync(): void {
    // Local environment
    
    if (Environment.type === EnvironmentType.Local) {
      //Todo: replace with the logging from sp-client-base
      console.log('Getting values from the local workbench');
      this.getCompanyMockListData().then((response) => {
        this.renderCompanyHolidayEvents(response.value);
      });
    }
    else if (Environment.type == EnvironmentType.SharePoint ||
      Environment.type == EnvironmentType.ClassicSharePoint) {
      console.log('Getting values from the SharePoint workbench');
      this.getCompanyListData()
        .then((response) => {
          this.renderCompanyHolidayEvents(response.value);
        });
    }
  }

  private renderCompanyHolidayEvents(items: ICompanyHoliday[]): void {
    let html: string = '';
    let calendarImgPath: string = String(require('./img/calendar-image-png-3.png'));
    console.log(this.properties.sortOrder);

    items.forEach((item: ICompanyHoliday) => {
      html += `      
        <ul class="${styles.list}">
            <li class="${styles.listItem}">
            <div class="${styles.eventContainer}">
              <div class="${styles.calendarImg}">
                <img src='${calendarImgPath}' />
              </div>

              <div class="${styles.eventInfo}">
                <div><h3>${item.Title}</h3></div>
                <div class="${styles.eventDate}"><i>Date : ${item.EventDate}</i></div>
                <div class="${styles.eventDescription}">${item.Description}</div>
              </div>
            </div>                
            </li>
        </ul>`;
        
    });

    const listContainer: Element = this.domElement.querySelector('#spListContainer');
    listContainer.innerHTML = html;
  }

  private getCompanyMockListData(): Promise<ICompanyHolidays> {
    return MockCompanyHolidaysListData.get(this.context.pageContext.web.absoluteUrl)
      .then((data: ICompanyHoliday[]) => {
        var listData: ICompanyHolidays = { value: data };
        return listData;
      }) as Promise<ICompanyHolidays>;
  }

  private getCompanyListData(): Promise<ICompanyHolidays> {
    console.log(this.properties.sortOrder);
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl
      + `/_api/web/lists/getbytitle('` + this.properties.calendarName + `')/items?$top=`
      + this.properties.numberOfEvents + `&$orderby=` + this.properties.sortOrder,
      SPHttpClient.configurations.v1)
      .then((response: Response) => {
        console.log("response  -->" + response);
        return response.json();
      });
  }

  public render(): void {
    this.domElement.innerHTML = `
         <div>
            <h1>${this.properties.description}</h1>
            <div id="spListContainer"></div>
         </div>`;
    this.renderCompanyEventsAsync();

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('calendarName', {
                  label: strings.CalendarNameFieldLabel
                }),
                PropertyPaneSlider('numberOfEvents', {
                  label: strings.NumberOfEventsFieldLabel,
                  min: 1,
                  max: 10
                }), PropertyPaneDropdown('sortOrder', {
                  label: strings.SortOrderFieldLabel,
                  options: [
                    { key: 'Title asc', text: 'Title(Ascending)' },
                    { key: 'Title desc', text: 'Title(Descending)' },
                    { key: 'EventDate asc', text: 'EventDate(Ascending)' },
                    { key: 'EventDate desc', text: 'EventDate (Descending))' }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
