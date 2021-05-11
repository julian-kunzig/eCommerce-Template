# Introduction

Infinovae is a Creative, Responsive Material Design Admin Template built with Angular 10+ and the Angular-CLI. It extends the Material Design components built by the Angular team and it offers you everything you need to get started with your next CRM, CMS, Project Management, or other projects.

Infinovae has **no dependency on jQuery or similiar libraries**, Angular's functionality is completely used.

## Installation

Angular-CLI allows you to create a new App in a matter of seconds and provides an awesome way to generate scaffolds for basically all Angular-Components. [You can take a look at what commands are available here.](//github.com/angular/angular-cli/blob/master/packages/angular/cli/README.md#generating-components-directives-pipes-and-services)

In this section, we are going to install Angular-CLI and it's prerequisites and then generate our first project with a few various components.

### Prerequisites
> Before we can install Angular-CLI we will have to get a few thing set up first. To run Angular-CLI we will need to install this prerequisite first:
* **NodeJS** v10 or newer

[A detailed instruction on how to install NodeJS is available here.](//docs.npmjs.com/getting-started/installing-node)

### Installing Angular-CLI

Installing Angular-CLI is as simple as running this simple command:

`npm install -g @angular/cli@latest`  
or
`sudo npm install -g @angular/cli@latest`

and the package manager `npm` will do the rest.

### Install Dependencies

Navigate to the Infinovae folder and run `npm install` to install all dependencies required by Infinovae.

`npm install ng2-pdf-viewer --save` 
`npm install ngx-image-cropper --save`

## Start Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build for Production

If you want to create a build for a production environment you can simply run `npm run build` or `ng build --prod` and you will get static HTML and JS files in the `/dist` folder ready to be uploaded to any server.