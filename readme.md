# jQuery.pinify
Contributors: Brandon Satrom, Clark Sell

Tags: jquery, ie9, pinning

A jQuery Plugin for adding Site Pinning features to your websites.

## Prerequisites
* jQuery 1.5.1+
* [Internet Explorer 9+] (http://ietestdrive.com)

## Description

A jQuery Plugin for adding IE9 features (site pinning, site mode, etc.) to your websites. Several new features of Internet Explorer 9 are designed to enhance the browsing experience of consumers by enabling sites that leverage certain features to behave like applications on the desktop when those sites are "pinned" to the taskbar in Windows 7. A user pins a site by dragging the site's tab (or favicon in the address bar) to the taskbar. For all sites, IE9 will create a default experience (called "site mode") that will use information about the site to create an instance of the browser customized to look specific to that site. Developers can also add specific meta tags and script commands to extend these features to further customize user's pinned experience of the site.

The purpose of the pinify jQuery plugin is to enable developers to safely leverage IE9 side mode features with simple commands and no need for additional browser checks. To view the full documentation, click here, or on the Documentation tab above. For more information about site pinning, and for a whirlwind walkthrough of pinify, check out Brandon Satrom's blog post "Applify Your Sites with Pinned Site and ie9ify, the IE9 jQuery Plugin."

To install the pinify plugin, [use NuGet] (http://nuget.org/List/Packages/jQuery.ie9ify) or download the source directly from here or from [plugins.jquery.com] (http://plugins.jquery.com/project/pinify). 

Note: NuGet package will be changed from jquery.ie9ify to jquery.pinify in the near future.

To view a screencast covering ALL aspects of the pinify Plugin, [click here] (http://channel9.msdn.com/posts/ASPNET-MVC-With-Community-Tools-Part-7-ie9ify).

## Installation

This section describes how to install the plugin and get it working.And by installing it you can discover new feature and become a good coder.

### Vanilla Install

1. Place jquery.pinify.js (or jquery.pinify.min.js) in your scripts folder
2. Place jquery.pinify.css (or jquery.pinify.min.css) in your CSS folder
3. Add references to the JS and CSS file in your page, similar to:

		<link rel="stylesheet" type="text/css" media="screen" href="/css/jquery.pinify.min.css" />
		<script type="text/javascript" src="/js/jquery-1.6.min.js"></script>
		<script type="text/javascript" src="/js/jquery.pinify.js"></script>		

4. In a script block call ````$('head').pinify();````
5. Run your site in IE9, drag it to the taskbar and watch it pin!

For more information and additonal documentation, see the Wiki pages at this site

Using NuGet in Visual Studio

1. In the Package Manager Console, type ````install-package jquery.ie9ify````

2. In a script block call ````$('head').pinify();````

3. Run your site in IE9, drag it to the taskbar and watch it pin!

For more information and additonal documentation, see the Wiki pages at this site

## Changelog

### 1.3
* Removed CoffeeScript source (yeah, we did.)
* Bumped to jQuery 1.7.1
* Roll-up of previous patches, including:
	- Issue #8 - dynamic path for icon (thanks, foxp2!)
	- Issue #7 - fixed error type (thanks, foxp2!)
	- Issue #6 - Added window.target (thanks, foxp2!)
	- Issue #4 - Second logo missing on brandedTopHat teaser (thanks, garjitech!)
	- Issue #1 - Typo fix (thanks, nakajima!)

### 1.2.5
* Migrated source to CoffeeScript
* Removed redundant js and css files from tests and sample directories
* Completed full suite of qUnit tests for current functionality
* Minor bug fixes related to funcitonality previously not under test

### 1.2
* [MAJOR BREAKING CHANGE] Changed name of plugin from ie9ify to pinify. Script/Style references and calls to the plugin should be updated accordingly:

		jquery.ie9ify.js ==> jquery.pinify.js
		jquery.ie9ify.css ==> jquery.pinify.css
		$(*).ie9ify(); ==> $(*).pinify();
		
### 1.1
* [BREAKING CHANGE] Added .css stylesheet for calls to pinTeaser() and removed inline styles from that method.
* Modified all for loops to use jquery $.each 
* Modified Site Mode feature detection to be more reliable and not browser-version specific
* Modified ready handler in sample and qunit tests
* Upgraded to jQuery 1.5.2
* Created build PowerShell script to auto-minify jquery.ie9ify.js (using yuicompressor) and move to the sample/js and root js folders.
* Completed build, package and push scripts to: 1)auto-version and timestamp the ie9ify js file, 2) minify .js and .css, 3) create a zip archive for Codeplex releases, 4) create a NuGet package and 5) deploy the package to NuGet.org
* Added fadeIn for pinTeaser element, and created options to hide the teaser after an interval, and set the timeout length
* Implemented Thumbbar buttons style support in $.ie9ify.createThumbbarButtons() through a new property called alternateStyle. Modified sample to include example of thumbbar buttons with alternate styling.
* [BREAKING CHANGE] Deprecated the mainContentSelector option in pinTeaser. Use the topHat teaser type if you need to move your page down to fit in a teaser
* [BREAKING CHANGE] Moved pinTeaser options linkText, linkColor, backgroundColor and textColor into a container "style" option. You can now use style: { linkText: ... }
* Added 3 additional pinTeaser type options 'topHat,' 'brandedTopHat,' and 'doubleTopHat.' Default is 'hangingChad' and is accesible via the 'type' option in the call to pinTeaser. These new types require the .css stylesheet introduced in this version and images contained in the 'images' directory.
