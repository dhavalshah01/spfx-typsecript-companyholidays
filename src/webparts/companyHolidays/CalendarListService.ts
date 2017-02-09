import {
  IWebPartContext,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-webpart-base';

//import the HttpClient to make calls to SharePoint
import { HttpClient } from '@microsoft/sp-http';
import { SPHttpClient } from '@microsoft/sp-http'
//create the exportable interface to different classes
export interface ICalendarListService {
  getCalendarLists(): Promise<IPropertyPaneDropdownOption[]>;  
}

//create an interface for array helpers. Should normally be in its own file, but for ease of use, added here
export interface IArrayHelper {
    sortByKey(array: Object[], key: string): Object[];
}
export class ArrayHelper implements IArrayHelper {
  constructor() {
  }

  //return a new array that is sorted by the object key of an array of objects
  public sortByKey(array: Object[], key: string) {
    return array.sort((a, b) => {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
}

//Class for mock data - when not conntected to SharePoint - for testing
export class MockListsService implements ICalendarListService {
  constructor() {
  }
//get a list of list names
  public getCalendarLists(): Promise<IPropertyPaneDropdownOption[]> {
    return new Promise<IPropertyPaneDropdownOption[]>(resolve => {
      //add a delay to simulate slow connection
      setTimeout(() => {
        var options: Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();
        options.push( { key: '1', text: 'List 1' });
        options.push( { key: '2', text: 'List 2' });

        resolve(options);
      }, 1000);
    });
  }
}
