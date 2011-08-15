/*!
* jQuery pinify Plugin v1.2
* http://ie9ify.codeplex.com
*
* Copyright 2011, Brandon Satrom and Clark Sell
* Licensed under MS-PL.
* http://ie9ify.codeplex.com/license
*
* Date: Wednesday May 11 2011 11:47:27 -05
*/
(function ($, undefined) {
    //private functions
    function createMetaTag(name, content, head) {
        if ($('meta[name=' + name + ']').length && name !== 'msapplication-task') {
            return;
        }

        if (!content.length) { return; }

        $('<meta>', {
            name: name,
            content: content
        }).appendTo(head);
    }

    function siteModeSupported() {
        return (!!window.external) && ('msIsSiteMode' in window.external);
    }

    /* pinify jQuery Functions:
    *  init: Adds meta tags and startup tasks to a page
    *  enablePinning: Enables a content item to be enabled for pinning (meaning that it can be dragged to the taskbar to pin a site)
    *  enableSiteMode: Enables binding of an event that triggers a site mode dialog (asking if the user wants to pin the site to the *start* menu)
    *  pinTeaser: Adds a teaser bar to the site, directly underneath the address bar. Teaser bar encourages the user to pin the site.
    */
    var methods = {
        init: function (options) {
            var defaultOptions = {
                applicationName: document.title.toString(),
                favIcon: 'http://' + location.host + '/favicon.ico',
                navColor: '',
                startUrl: 'http://' + location.host,
                tooltip: document.title.toString(),
                window: 'width=800;height=600',
                tasks: []
            };

            options = $.extend({}, defaultOptions, options);

            return this.each(function () {
                var taskList = options.tasks;
                var head = this;

                if ($('link[type^=image]').length === 0) {
                    $("<link />", {
                        rel: "shortcut icon",
                        type: "image/ico",
                        href: options.favIcon
                    }).appendTo(this);

                }

                createMetaTag('application-name', options.applicationName, this);
                createMetaTag('msapplication-tooltip', options.tooltip, this);
                createMetaTag('msapplication-starturl', options.startUrl, this);
                createMetaTag('msapplication-navbutton-color', options.navColor, this);
                createMetaTag('msapplication-window', options.window, this);

                $.each(taskList, function (key, value) {
                    createMetaTag('msapplication-task', 'name=' + value.name + ';action-uri=' + value.action + ';icon-uri=' + value.icon, head);
                });
            });
        },
        enablePinning: function (title) {
            return this.each(function () {
                title = title || "Drag this image to your Windows 7 Taskbar to pin this site with IE9";

                $(this).addClass('msPinSite').attr("title", title);
            });
        },
        enableSiteMode: function (eventName) {
            eventName = eventName || "click";

            return this.each(function () {
                $(this).bind(eventName, function (event) {
                    event.preventDefault();

                    try {
                        window.external.msAddSiteMode();
                    } catch (e) { }
                });
            });
        },
        pinTeaser: function (options) {
            if (window.external.msIsSiteMode()) {
                return this;
            }

            var teaser = $(this);
            var defaultOptions = {
                type: 'hangingChad', //Options are: hangingChad, topHat, brandedTopHat and doubleTopHat
                icon: 'http://' + location.host + '/favicon.ico',
                pinText: 'Drag this image to the taskbar to pin this site',
                secondaryText: 'Simply drag the icon or tab to taskbar to pin.',
                addStartLink: true,
                linkText: 'Click here to add this site to the start menu',
                sticky: true,
                timeout: 10000,
                style: {
                    linkColor: 'rgb(0, 108, 172)',
                    backgroundColor: 'rgb(0, 108, 172)',
                    textColor: 'white',
                    backgroundImage: null,
                    leftBackgoundImage: null,
                    rightBackgoundImage: null,
                    closeButtonImage: null
                }
            };
            var alignmentDiv, contentDiv, leftDiv, leftBar, rightDiv, mainContent;
            var builder = {
                topHat: function () {
                    teaser.addClass('pinify-topHat-container pinify-teaser').css('color', options.style.textColor);
                    if (options.style.backgoundImage) {
                        teaser.css('background-image', options.style.backgroundImage);
                    }
                    alignmentDiv = $('<div>', { 'class': 'pinify-topHat-alignment' }).appendTo(teaser);
                    contentDiv = $('<div>', { 'class': 'pinify-topHat-content' }).appendTo(alignmentDiv);
                    $('<img>', { id: 'pinify-topHat-logo', src: options.icon, alt: 'Drag Me', 'class': 'msPinSite' }).appendTo(contentDiv);
                    $('<span>').addClass('pinify-topHat-text').text(options.pinText).appendTo(contentDiv);
                },
                brandedTopHat: function () {
                    teaser.addClass('pinify-brandedTopHat-container pinify-teaser').css('color', options.style.textColor);
                    if (options.style.backgoundImage) {
                        teaser.css('background-image', options.style.backgroundImage);
                    }

                    contentDiv = $('<div>', { 'class': 'pinify-brandedTopHat-content' }).appendTo(teaser);
                    $('<img>', { id: 'pinify-brandedTopHat-firstLogo', src: options.icon, alt: 'Drag Me', 'class': 'msPinSite' }).appendTo(contentDiv);
                    $('<img>', { id: 'pinify-brandedTopHat-thirdLogo', src: options.icon, alt: 'Drag Me', 'class': 'msPinSite' }).appendTo(contentDiv);
                    $('<div>', { 'class': 'pinify-mainText' }).text(options.pinText).appendTo(contentDiv);
                    $('<div>', { 'class': 'pinify-brandedTopHat-secondaryText' }).text(options.secondaryText).appendTo(contentDiv);
                },
                doubleTopHat: function () {
                    teaser.addClass('pinify-doubleTopHat-container pinify-teaser').css('color', options.style.textColor);

                    leftDiv = $('<div>', { 'class': 'pinify-doubleTopHat-left' }).appendTo(teaser);
                    if (options.style.leftBackgroundImage) {
                        $(leftDiv).css('background-image', options.style.leftBackgoundImage);
                    }
                    leftBar = $('<div>', { id: 'pinify-doubleTopHat-leftBar' }).appendTo(leftDiv);
                    $('<img>', { id: 'pinify-doubleTopHat-logo', src: options.icon, alt: 'Drag Me', 'class': 'msPinSite' }).appendTo(leftBar);

                    rightDiv = $('<div>', { 'class': 'pinify-doubleTopHat-right' }).appendTo(teaser);
                    if (options.style.rightBackgroundImage) {
                        $(rightDiv).css('background-image', options.style.rightBackgoundImage);
                    }
                    $('<div>', { id: 'pinify-doubleTopHat-rightBar' }).appendTo(rightDiv);
                    mainContent = $('<div>', { id: 'pinify-doubleTopHat-rightBarMainContent' }).appendTo(rightDiv);
                    $('<div>', { 'class': 'pinify-mainText' }).text(options.pinText).appendTo(mainContent);
                    $('<div>', { 'class': 'pinify-doubleTopHat-lighterText' }).text(options.secondaryText).appendTo(rightDiv);
                },
                hangingChad: function () {
                    teaser.hide();
                    teaser.css({ 'color': options.style.textColor, 'background-color': options.style.backgroundColor }).addClass('pinify-hanging-container pinify-teaser');
                    $('<img>', { src: options.icon, 'class': 'msPinSite' }).appendTo(teaser);
                    $('<div>', { 'class': 'pinify-hanging-content' }).appendTo(teaser);
                    $('<div>', { id: 'pinify-pinText' }).text(options.pinText).appendTo(teaser);
                    teaser.fadeIn('slow');
                }
            };

            options = $.extend({}, defaultOptions, options);

            return this.each(function () {
                //Call the correct builder function based on the type passed in
                builder[options.type]();

                //If it's not a sticky teaser, fade it out after a delay. Otherwise put a close button on the div
                if (!options.sticky) {
                    this.delay(options.timeout).fadeOut('slow');
                } else {
                    $('<div>').addClass('pinify-closePin').click(function () {
                        $('.pinify-teaser').slideUp('slow');
                        teaser.slideUp('slow');
                    }).appendTo(teaser);
                }

                if (!options.addStartLink) {
                    return;
                }

                $('<a>').addClass('pinify-addSiteLink').attr('href', '#').click(function (event) {
                    event.preventDefault();

                    try {
                        window.external.msAddSiteMode();
                    } catch (e) { }
                }).css('color', options.linkColor).appendTo(teaser).text(options.linkText);
            });
        }
    };

    //main entry point for pinify methods that operate on a jQuery wrapped set (above)
    $.fn.pinify = function (method) {
        if (!siteModeSupported()) {
            return this;
        }

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.pinify');
        }
    };

    /*  pinify Utility Functions
    *  firstRunState: determines wheter a pinned site has been lanched for the first time
    *  isPinned: Returns true if the site is pinned to the taskbar, false if not
    *  addJumpList: Given options, adds jumplist items to a pinned window
    *  clearJumpList: Clears all dynamic jumplist items from the pinned window 
    *  addOverlay: Given options, adds an overlay icon to the taskbar for the pinned site
    *  clearOverlay: Clears the current overlay icon
    *  flashTaskbar: Flashes the taskbar box of a pinned site
    *  createThumbbarButtons: creates buttons on the pinned site preview window thumbbar, and wires events to respond to button clicks
    */
    $.pinify = {}; //create the pinify namespace for all of our pinify utilty functions

    /* Return Values
    * 0 = The pinned site is not in a first run state, or is not pinned
    * 1 = First run from a drag and drop operation
    * 2 = First run from a shortcut added to the Start menu (msAddSiteMode)
    */
    $.pinify.firstRunState = function (preserveState) {
        if (!siteModeSupported()) {
            return 0;
        }

        if (preserveState) {
            preserveState = false;
        }

        try {
            return window.external.msIsSiteModeFirstRun(preserveState);
        } catch (e) {
            return 0;
        }
    };

    $.pinify.isPinned = function () {
        if (!siteModeSupported()) {
            return false;
        }

        try {
            return window.external.msIsSiteMode();
        } catch (e) {
            return false;
        }
    };

    $.pinify.addJumpList = function (options) {
        if (!siteModeSupported()) {
            return this;
        }

        var defaultOptions = {
            title: '',
            items: []
        };

        options = $.extend({}, defaultOptions, options);

        try {
            if (window.external.msIsSiteMode()) {
                window.external.msSiteModeClearJumplist();
                window.external.msSiteModeCreateJumplist(options.title);

                var items = options.items;

                $.each(items, function (key, value) {
                    window.external.msSiteModeAddJumpListItem(value.name, value.url, value.icon);
                });

                window.external.msSiteModeShowJumplist();
            }
        } catch (e) { }

        return this;
    };

    $.pinify.clearJumpList = function () {
        if (!siteModeSupported()) {
            return this;
        }

        try {
            if (window.external.msIsSiteMode()) {
                window.external.msSiteModeClearJumpList();
            }
        } catch (e) { }
    };

    $.pinify.addOverlay = function (options) {
        if (!siteModeSupported()) {
            return this;
        }

        var defaultOptions = {
            eventName: 'click',
            title: '',
            icon: ''
        };

        options = $.extend({}, defaultOptions, options);

        try {
            if (window.external.msIsSiteMode()) {
                window.external.msSiteModeClearIconOverlay();
                window.external.msSiteModeSetIconOverlay(options.icon, options.title);
            }
        } catch (e) { }
    };

    $.pinify.clearOverlay = function () {
        if (!siteModeSupported()) {
            return this;
        }

        try {
            if (window.external.msIsSiteMode()) {
                window.external.msSiteModeClearIconOverlay();
            }
        } catch (e) { }
    };

    $.pinify.flashTaskbar = function (options) {
        if (!siteModeSupported()) {
            return this;
        }

        try {
            if (window.external.msIsSiteMode()) {
                window.external.msSiteModeActivate();
            }
        } catch (e) { }
    };

    $.pinify.createThumbbarButtons = function (options) {
        if (!siteModeSupported()) {
            return this;
        }

        var defaultOptions = {
            buttons: []
        };

        options = $.extend({}, defaultOptions, options);

        try {
            if (window.external.msIsSiteMode()) {
                var buttons = [];
                //Create a ButtonStyle Object to hold a reference to the current button, an alternate style, 
                //if any, and the active Style
                var ButtonStyle = function () { };
                ButtonStyle.prototype.button = null;
                ButtonStyle.prototype.alternateStyle = null;
                ButtonStyle.prototype.activeStyle = 0;
                ButtonStyle.prototype.click = null;

                //Create the method to respond to thumbbar button clicks
                var clickCurrent = function (btn) {
                    var curr = buttons[btn.buttonID];
                    curr.click();

                    if (curr.alternateStyle) {
                        var newStyle = curr.activeStyle === 0 ? curr.alternateStyle : 0;
                        window.external.msSiteModeShowButtonStyle(curr.button, newStyle);
                        curr.activeStyle = newStyle;
                    }
                };

                $.each(options.buttons, function (key, value) {
                    var btn = window.external.msSiteModeAddThumbBarButton(value.icon, value.name);
                    var altBtn;

                    if (value.alternateStyle) {
                        var style = value.alternateStyle;
                        altBtn = window.external.msSiteModeAddButtonStyle(btn, style.icon, style.name);
                    }

                    var buttonStyle = new ButtonStyle();
                    buttonStyle.button = btn;
                    buttonStyle.alternateStyle = altBtn;
                    buttonStyle.click = value.click;
                    buttons[btn] = buttonStyle;

                    document.addEventListener('msthumbnailclick', clickCurrent, false);
                });

                //Hide thumbbar buttons when the page is unloaded.
                window.onunload = function () {
                    var key;
                    for (key in buttons) {
                        if (buttons.hasOwnProperty(key)) {
                            window.external.msSiteModeUpdateThumbBarButton(buttons[key].button, true, false);
                        }
                    }
                };

                //Make sure to re-display thumbbar buttons if they are hidden on a page unload.
                window.onload = function () {
                    var key;
                    for (key in buttons) {
                        if (buttons.hasOwnProperty(key)) {
                            window.external.msSiteModeUpdateThumbBarButton(buttons[key].button, true, true);
                        }
                    }
                };

                window.external.msSiteModeShowThumbBar();
            }
        } catch (e) { }
    };
})(jQuery);
