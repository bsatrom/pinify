/*!
* jQuery ie9ify Plugin v1.1
* http://ie9ify.codeplex.com
*
* Copyright 2011, Brandon Satrom and Clark Sell
* Licensed under MS-PL.
* http://ie9ify.codeplex.com/license
*
* Date: Friday Apr 15 2011 15:22:23 -05
*/
(function ($) {

    /* ie9ify jQuery Functions:
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
                if ($('link[type^=image]').length === 0) {
                    $('<link>').attr('rel', 'shortcut icon').attr('type', 'image/ico').attr('href', options.favIcon).appendTo(this);
                }

                createMetaTag('application-name', options.applicationName, this);
                createMetaTag('msapplication-tooltip', options.tooltip, this);
                createMetaTag('msapplication-starturl', options.startUrl, this);
                createMetaTag('msapplication-navbutton-color', options.navColor, this);
                createMetaTag('msapplication-window', options.window, this);

                var taskList = options.tasks;
                var head = this;

                $.each(taskList, function (key, value) {
                    createMetaTag('msapplication-task', 'name=' + value.name + ';action-uri=' + value.action + ';icon-uri=' + value.icon, head);
                });
            });
        },
        enablePinning: function (title) {
            return this.each(function () {
                if (title === undefined) {
                    title = "Drag this image to your Windows 7 Taskbar to pin this site with IE9";
                }

                $(this).addClass('msPinSite').attr("title", title);
            });
        },
        enableSiteMode: function (eventName) {
            if (!eventName) {
                eventName = 'click';
            }

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

            options = $.extend({}, defaultOptions, options);

            return this.each(function () {
                //Determine which type of teaser to build. Default is 'hangingChad'
                switch(options.type) {
                    case "topHat": 
                        $(this).addClass('ie9ify-topHat-container ie9ify-teaser').css('color', options.style.textColor);                        
                        if(options.style.backgoundImage) {
                            $(this).css('background-image', options.style.backgroundImage);    
                        }
                        var alignmentDiv = $('<div>').addClass('ie9ify-topHat-alignment').appendTo($(this));
                        var contentDiv = $('<div>').addClass('ie9ify-topHat-content').appendTo(alignmentDiv);
                        $('<img>').attr('id', 'ie9ify-topHat-logo').attr('src', options.icon).attr('alt', 'Drag Me').addClass('msPinSite').appendTo(contentDiv);
                        $('<span>').addClass('ie9ify-topHat-text').attr('innerText', options.pinText).appendTo(contentDiv);                        
                        break;
                    case "brandedTopHat":
                        $(this).addClass('ie9ify-brandedTopHat-container ie9ify-teaser').css('color', options.style.textColor);                        
                        if(options.style.backgoundImage) {
                            $(this).css('background-image', options.style.backgroundImage);    
                        }
                        var contentDiv = $('<div>').addClass('ie9ify-brandedTopHat-content').appendTo($(this));
                        $('<img>').attr('id', 'ie9ify-brandedTopHat-firstLogo').attr('src', options.icon).attr('alt', 'Drag Me').addClass('msPinSite').appendTo(contentDiv);
                        $('<img>').attr('id', 'ie9ify-brandedTopHat-thirdLogo').attr('src', options.icon).attr('alt', 'Drag Me').addClass('msPinSite').appendTo(contentDiv);
                        $('<div>').addClass('ie9ify-mainText').attr('innerText', options.pinText).appendTo(contentDiv);   
                        $('<div>').addClass('ie9ify-brandedTopHat-secondaryText').attr('innerText', options.secondaryText).appendTo(contentDiv);   
                        break;                        
                    case "doubleTopHat":
                         $(this).addClass('ie9ify-doubleTopHat-container ie9ify-teaser').css('color', options.style.textColor);                       
                        
                        var leftDiv = $('<div>').addClass('ie9ify-doubleTopHat-left').appendTo($(this));
                        if(options.style.leftBackgroundImage) {
                            $(leftDiv).css('background-image', options.style.leftBackgoundImage);    
                        }
                        var leftBar = $('<div>').attr('id', 'ie9ify-doubleTopHat-leftBar').appendTo(leftDiv);
                        $('<img>').attr('id', 'ie9ify-doubleTopHat-logo').attr('src', options.icon).attr('alt', 'Drag Me').addClass('msPinSite').appendTo(leftBar);
                        
                        var rightDiv = $('<div>').addClass('ie9ify-doubleTopHat-right').appendTo($(this));
                        if(options.style.rightBackgroundImage) {
                            $(rightDiv).css('background-image', options.style.rightBackgoundImage);    
                        }                        
                        $('<div>').attr('id', 'ie9ify-doubleTopHat-rightBar').appendTo(rightDiv);
                        var mainContent = $('<div>').attr('id', 'ie9ify-doubleTopHat-rightBarMainContent').appendTo(rightDiv);
                        $('<div>').attr('class', 'ie9ify-mainText').attr('innerText', options.pinText).appendTo(mainContent);
                        $('<div>').attr('class', 'ie9ify-doubleTopHat-lighterText').attr('innerText', options.secondaryText).appendTo(rightDiv);                                
                        break;
                    default: //'hangingChad'
                        $(this).hide();
                        $(this).addClass('ie9ify-hanging-container ie9ify-teaser').css('color', options.style.textColor).css('background-color', options.style.backgroundColor);
                        var img = $('<img>').attr('src', options.icon).addClass('msPinSite').appendTo(this);
                        var div = $('<div>').addClass('ie9ify-hanging-content').appendTo($(this));
                        var text = $('<div>').attr('id', 'ie9ify-pinText').attr('innerText', options.pinText).appendTo(this);
                        $(this).fadeIn('slow');                        
                        break;
                }

                //If it's not a sticky teaser, fade it out after a delay. Otherwise put a close button on the div
                if (!options.sticky) {
                    $(this).delay(options.timeout).fadeOut('slow');
                } else {
                    $('<div>').addClass('ie9ify-closePin').click(function() {
                        $('.ie9ify-teaser').slideUp('slow');
                        $(this).slideUp('slow');                
                    }).appendTo(this);
                }

                if (!options.addStartLink) {
                    return;
                }

                link = $('<a>').addClass('ie9ify-addSiteLink').attr('href', '#').click(function (event) {
                    event.preventDefault();

                    try {
                        window.external.msAddSiteMode();
                    } catch (e) { }
                }).css('color', options.linkColor).appendTo(div).text(options.linkText);
            });
        }
    };

    //main entry point for ie9ify methods that operate on a jQuery wrapped set (above)
    $.fn.ie9ify = function (method) {
        if (!siteModeSupported()) {
            return this;
        }

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.ie9ify');
        }
    };

    /*  ie9ify Utility Functions
    *  firstRunState: determines wheter a pinned site has been lanched for the first time
    *  isPinned: Returns true if the site is pinned to the taskbar, false if not
    *  addJumpList: Given options, adds jumplist items to a pinned window
    *  clearJumpList: Clears all dynamic jumplist items from the pinned window 
    *  addOverlay: Given options, adds an overlay icon to the taskbar for the pinned site
    *  clearOverlay: Clears the current overlay icon
    *  flashTaskbar: Flashes the taskbar box of a pinned site
    *  createThumbbarButtons: creates buttons on the pinned site preview window thumbbar, and wires events to respond to button clicks
    */
    $.ie9ify = {}; //create the ie9ify namespace for all of our ie9ify utilty functions

    /* Return Values
    * 0 = The pinned site is not in a first run state, or is not pinned
    * 1 = First run from a drag and drop operation
    * 2 = First run from a shortcut added to the Start menu (msAddSiteMode)
    */
    $.ie9ify.firstRunState = function (preserveState) {
        if (!siteModeSupported()) {
            return 0;
        }

        if (preserveState == undefined) {
            preserveState = false;
        }

        try {
            return window.external.msIsSiteModeFirstRun(preserveState);
        } catch (e) {
            return 0;
        }
    }

    $.ie9ify.isPinned = function () {
        if (!siteModeSupported()) {
            return false;
        }

        try {
            return window.external.msIsSiteMode();
        } catch (e) {
            return false;
        }
    };

    $.ie9ify.addJumpList = function (options) {
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
    }

    $.ie9ify.clearJumpList = function () {
        if (!siteModeSupported()) {
            return this;
        }

        try {
            if (window.external.msIsSiteMode()) {
                window.external.msSiteModeClearJumpList();
            }
        } catch (e) { }
    };

    $.ie9ify.addOverlay = function (options) {
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

    $.ie9ify.clearOverlay = function () {
        if (!siteModeSupported()) {
            return this;
        }

        try {
            if (window.external.msIsSiteMode()) {
                window.external.msSiteModeClearIconOverlay();
            }
        } catch (e) { }
    };

    $.ie9ify.flashTaskbar = function (options) {
        if (!siteModeSupported()) {
            return this;
        }

        try {
            if (window.external.msIsSiteMode()) {
                window.external.msSiteModeActivate();
            }
        } catch (e) { }
    };

    $.ie9ify.createThumbbarButtons = function (options) {
        if (!siteModeSupported()) {
            return this;
        }

        var defaultOptions = {
            buttons: []
        };

        options = $.extend({}, defaultOptions, options);

        try {
            if (window.external.msIsSiteMode()) {
                var buttons = new Array();
                //Create a ButtonStyle Object to hold a reference to the current button, an alternate style, 
                //if any, and the active Style
                function ButtonStyle() { };
                ButtonStyle.prototype.button = null;
                ButtonStyle.prototype.alternateStyle = null;
                ButtonStyle.prototype.activeStyle = 0;
                ButtonStyle.prototype.click = null;

                //Create the method to respond to thumbbar button clicks
                var clickCurrent = function (btn) {
                    var curr = buttons[btn.buttonID];
                    curr.click();

                    if (curr.alternateStyle) {
                        var newStyle = curr.activeStyle == 0 ? curr.alternateStyle : 0
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

                    buttonStyle = new ButtonStyle();
                    buttonStyle.button = btn;
                    buttonStyle.alternateStyle = altBtn;
                    buttonStyle.click = value.click;
                    buttons[btn] = buttonStyle;

                    if (document.addEventListener) {
                        document.addEventListener('msthumbnailclick', clickCurrent, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('onmsthumbnailclick', clickCurrent);
                    }
                });

                //Hide thumbbar buttons when the page is unloaded.
                window.onunload = function () {
                    for(key in buttons) {
                        window.external.msSiteModeUpdateThumbBarButton(buttons[key].button, true, false);
                    }
                };

                //Make sure to re-display thumbbar buttons if they are hidden on a page unload.
                window.onload = function () {
                    for(key in buttons) {
                        window.external.msSiteModeUpdateThumbBarButton(buttons[key].button, true, true);
                    }
                };

                window.external.msSiteModeShowThumbBar();
            }
        } catch (e) { }
    };

    //private functions
    function createMetaTag(name, content, head) {
        if ($('meta[name=' + name + ']').length && name != 'msapplication-task') {
            return;
        }

        if (content.length === 0) {
            return;
        }

        $('<meta>').attr('name', name).attr('content', content).appendTo(head);
    }

    function siteModeSupported() {
        return (!!window.external) && ('msIsSiteMode' in window.external);
    }
})(jQuery);
