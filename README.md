## companyholidays-webpart


This webpart is build using SharePoint Framework (SPFX) with typescript and without any javascript frameworks. It will load company holiday events from the sharepoint calendar.

The calendar to pick the events from can be configured from the edit properties pane as well as we can configure teh number of events to be loaded in the webpart. Also include the sorting option for the sorting the events based on title or eventdate.

Author : Dhaval Shah
Blog : www.dhavalcodes.com
Email : dhaval.shah01@gmail.com

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* commonjs components - this allows this package to be reused from other packages.
* dist/* - a single bundle containing the components used for uploading to a cdn pointing a registered Sharepoint webpart library to.
* example/* a test page that hosts all components in this package.

### Build options

gulp clean - TODO
gulp test - TODO
gulp watch - TODO
gulp build - TODO
gulp deploy - TODO
