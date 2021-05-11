<img style="float: left; height: 80px; width: unset;" src="/assets/img/demo/logo.svg" alt="Vex Logo"/>
<h1 style="height: 80px; line-height: 80px; margin: 0 0 0 70px; font-weight: 700; border: none;">VEX</h1>

# Changelog

## 10.0.0 (2020-07-06)

### Features
- Upgrade to Angular 10+
- Upgrade all dependencies to latest compatible versions

### Breaking Changes

We switched from ngx-take-until-destroy to ngneat/until-destroy (the successor of the first library available for Angular 10+) and there are adjustments needed. There's an easy migration script:
1. `cd src` (into your /src folder in the vex-angular folder)
2. run `npx @ngneat/until-destroy --removeOnDestroy`

A few occurences could still appear, because the automated script can't pick them up. Here's a step-by-step on how to manually adjust the entries:

Replace:
`import { untilDestroyed } from 'ngx-take-until-destroy';`

With:
`import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';`

and add `@UntilDestroy()` above your `@Component()` or `@Injectable()`

Example:

```typescript
@UntilDestroy()
@Injectable()
export class TestService {
    test() {
        test$.pipe(
            untilDestroyed(this)
        ).subscribe(value => doStuff(value));
    }   
}
```

This library and structure is needed so any subscriptions we create get automatically cleaned up (unsubscribed) when the component/service gets destroyed by Angular.

## 9.2.0 (2020-06-03)

### Features
- Add [Mailbox](/apps/mail)
- Improve letter-spacing/line-height of Typography for best readability: [Inter Dynamic Metrics](https://rsms.me/inter/dynmetrics/)

### Fixes
- Load icons on icons demo page deferred to improve build time when developing

## 9.1.0 (2020-05-13)

### Features
- Add [Social/Timeline](/apps/social/timeline) page
- Simplify color customization, simply change the CSS Variables
- Add Progress Bar indicating lazy loaded routes being loaded
- Changing direction (RTL/LTR) now doesn't require a reload and can be changed anytime
- Upgrade dependencies
- Change Font Family

### Fixes
- Sidenav now hidden correctly on Hermes/Ikaros (Vertical Layouts)
- Input Dropdown Icon now correctly aligned (vertical & horizontal)
- Ares Layout: Navigation active color correctly used now

## 9.0.0 (2020-03-24)

### Features
- Upgrade to Angular 9+
- Upgrade to Angular Material 9+
- Upgrade all dependencies to be compatible with Angular 9
- Upgrade to TypeScript 3.7.5

## 8.4.0 (2019-11-18)

### Features
- Add CustomLayoutComponent to easily create your own custom layout component and customize the template even easier
- If needed, you can now enable strictFunctionTypes & noImplicitReturns in your tsconfig.json
- Add more customization options using NavigationService (Change title & logo in sidenav)
- Add example config with customized completely customized layout and custom title & logo

## 8.3.0 (2019-10-22)

### Features

- Add global search (click on the search button in toolbar)
- Add WYSIWYG Editor
- Add more custom columns to All-In-One Table

### Fixes
- Improve dark mode styles, especially color usage is using opacity now
- Contact Table is now fully responsive
- General style improvements

## 8.2.0 (2019-10-07)

### Features
- Add Typings for TailwindCSS, use TailwindCSS configuration inside your Angular application - 1 Configuration file!

### Fixes
- Fix minor issue on mobile devices, dashboard was overflowing and forced a horizontal scroll on some devices

## 8.1.0 (2019-10-02)

### Features
- Add PurgeCSS to improve build size even more

### Fixed
- Fix minor issue with styles and build

## 8.0.0 (2019-09-19)

### Features
- Added 15 design variations (5 layouts with 3 different styles per layout)
- Allow Top Navigation to have direct links instead of only dropdowns
- Add TailwindCSS for easy customization of Utility CSS

### Fixes
- Optimize Paddings/Margins
- Optimize RTL
- Optimize Styling for Layouts

## 1.0.0 (2019-08-22)

### Features
- Initial release
