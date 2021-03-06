# ember-collection-select [![Build Status](https://travis-ci.org/arenoir/ember-collection-select.svg?branch=master)](https://travis-ci.org/arenoir/ember-collection-select)

A select component built for Ember.js. Uses Ember Collection to incrementally render large lists of options.

## Status

This is a work in progress.  


## Demo

Checkout the [demo](http://arenoir.github.io/ember-collection-select/).



## Usage

This addon provides an `ember-collection-select` component.

```handlebars
{{#ember-collection-select content=items selection=model as |item searchTerm|}}
  {{item.fullname}}
{{/ember-collection-select}}
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
    <td valign="top">ember-collection-select will set this property to the selection that was made. Usually some property on a model, for example. If <code>multiple</code> is <code>true</code>, then it should be an array.</td>
  </tr>
  <tr>
    <td valign="top"><code>rowHeight</code></td>
    <td valign="top"></td>
  </tr>
  <tr>
    <td valign="top"><code>multiple</code></td>
    <td valign="top"></td>
  </tr>
  <tr>
    <td valign="top"><code>loading</code></td>
    <td valign="top">When <code>true</code> ember-collection-select will show loading span.</td>
  </tr>
  <tr>
    <td valign="top">
      <code>scoreFunction</code>
    </td>
    <td valign="top"></td>
  </tr>
</table>


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
