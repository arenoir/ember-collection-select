# Ember-select

A select component built for Ember.js. Uses Ember List View to incrementally render large lists of options.

## Status

This is a work in progress.  

The name grab "ember-select" is as ambitious as my intentions for this add-on.  I believe there is a standard way a select component should work.  Select2,  selectize.js and chosen are all good examples.  This project aims to produce such a component built with ember.js for ember.js.

## Demo

Checkout the [demo](http://arenoir.github.io/ember-select/).



## Usage

This addon provides an `ember-select` component.

```handlebars
{{ember-select
  content=controller.items
  optionLabelPath="fullname"
  optionSelectionPath="fullname"
  selection=model }}
```

### Properties

<table width="100%">
  <tr>
    <th valign="top" width="120px" align="left">Property</th>
    <th valign="top" align="left">Description</th>
  </tr>
  <tr>
    <td valign="top"><code>content</code></td>
    <td valign="top">Array containing all the options to select from</td>
  </tr>
  <tr>
    <td valign="top"><code>selection</code></td>
    <td valign="top">ember-select will set this property to the selection that was made. Usually some property on a model, for example. If <code>multiple</code> is <code>true</code>, then it should be an array.</td>
  </tr>
  <tr>
    <td valign="top"><code>optionValuePath</code></td>
    <td valign="top">Selectize requires a unique hash for each option available. Set this to a path to such a property on your options. Example: <code>id</code></td>
  </tr>
  <tr>
    <td valign="top"><code>optionLabelPath</code></td>
    <td valign="top">Set this to a path where selectize can get a label for display. Computed properties are many times useful for this. If ember-select detects a "falsy" value, it will use an empty string. Example: <code>content.name</code></td>
  </tr>
  <tr>
    <td valign="top"><code>multiple</code></td>
    <td valign="top">If <code>true</code> ember-select will enter multiple mode. <code>selection</code> is an array of options.</td>
  </tr>
  <tr>
    <td valign="top"><code>loading</code></td>
    <td valign="top">When <code>true</code> ember-select will show loading span.</td>
  </tr>
  <tr>
    <td valign="top">
      <code>scoreFunction</code>
    </td>
    <td valign="top"></td>
  </tr>
  <tr>
    <td valign="top">
      <code>optionFunction</code>
    </td>
    <td valign="top">Used to format the option.</td>
  </tr>
</table>

ember-select also supports [selectize's general options](https://github.com/brianreavis/selectize.js/blob/master/docs/usage.md#general), excluding `options` and `items` (equivalent to `content` and `selection` respectively).

### Actions


<table width="100%">
  <tr>
    <th valign="top" width="160px" align="left">Action</th>
    <th valign="top" align="left">Description</th>
  </tr>
  <tr>
    <td valign="top"><code>search</code></td>
    <td valign="top">sent when the user types in the input element</tr>
  </tr>
  <tr>
    <td valign="top"><code>select-item</code></td>
    <td valign="top">sent when the user selects an item (functional equivalent of observing <code>selection</code> property). The selected object is sent as a parameter. When the user deselects the option, parameter is <code>null</code>.</tr>
  </tr>
</table>


## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
