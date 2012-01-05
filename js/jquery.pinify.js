(function() {
  /*
  * jQuery pinify Plugin v1.3
  * http://ie9ify.codeplex.com
  *
  * Copyright 2011, Brandon Satrom and Clark Sell
  * Licensed under an Apache Foundation License.
  * http://github.com/bsatrom/pinify
  *
  * Date: Monday Nov 07 2011 12:44:28 -06
  */
  var __hasProp = Object.prototype.hasOwnProperty;
  (function($) {
    var callWindowExternalSafely, createMetaTag, methods, siteModeSupported;
    createMetaTag = function(name, content, head) {
      if ($("meta[name=" + name + "]").length && name !== 'msapplication-task') {
        return;
      }
      if (!content.length) {
        return;
      }
      return $('<meta>', {
        name: name,
        content: content
      }).appendTo(head);
    };
    siteModeSupported = function() {
      return (!!window.external) && ("msIsSiteMode" in window.external);
    };
    callWindowExternalSafely = function(func, returnValue) {
      try {
        return func();
      } catch (e) {
        return returnValue;
      }
    };
    methods = {
      init: function(options) {
        var defaultOptions;
        defaultOptions = {
          applicationName: document.title.toString(),
          favIcon: "http://" + location.host + "/favicon.ico",
          navColor: "",
          startUrl: "http://" + location.host,
          tooltip: document.title.toString(),
          window: "width=800;height=600",
          tasks: []
        };
        options = $.extend({}, defaultOptions, options);
        return this.each(function() {
          var head, taskList;
          taskList = options.tasks;
          head = this;
          if ($("link[type^=image]").length === 0) {
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
          return $.each(taskList, function(key, value) {
            return createMetaTag('msapplication-task', "name=" + value.name + ";action-uri=" + value.action + ";icon-uri=" + value.icon, head);
          });
        });
      },
      enablePinning: function(title) {
        return this.each(function() {
          title = title || "Drag this image to your Windows 7 Taskbar to pin this site with IE9";
          return $(this).addClass("msPinSite").attr({
            title: title
          });
        });
      },
      enableSiteMode: function(eventName) {
        eventName = eventName || "click";
        return this.each(function() {
          return $(this).bind(eventName, function(event) {
            event.preventDefault();
            try {
              return window.external.msAddSiteMode();
            } catch (e) {

            }
          });
        });
      },
      pinTeaser: function(options) {
        var builder, defaultOptions, teaser;
        if (window.external.msIsSiteMode()) {
          this;
        }
        teaser = $(this);
        defaultOptions = {
          type: "hangingChad",
          icon: "http://" + location.host + "/favicon.ico",
          pinText: "Drag this image to the taskbar to pin this site",
          secondaryText: "Simply drag the icon or tab to the taskbar to pin.",
          addStartLink: false,
          linkText: "Click here to add this site to the start menu",
          sticky: true,
          timeout: 1000,
          style: {
            linkColor: "rgb(0, 108, 172)",
            backgroundColor: "rgb(0, 108, 172)",
            textColor: "white",
            backgroundImage: null,
            leftBackgroundImage: null,
            rightBackgroundImage: null,
            closeButtonImage: null
          }
        };
        builder = {
          topHat: function() {
            var alignmentDiv, contentDiv;
            teaser.addClass('pinify-topHat-container pinify-teaser').css('color', options.style.textColor);
            if (options.style.backgroundImage) {
              teaser.css('background-image', options.style.backgroundImage);
            }
            alignmentDiv = $('<div>', {
              'class': 'pinify-topHat-alignment'
            }).appendTo(teaser);
            contentDiv = $('<div>', {
              'class': 'pinify-topHat-content'
            }).appendTo(alignmentDiv);
            $('<img>', {
              id: 'pinify-topHat-logo',
              src: options.icon,
              alt: 'Drag Me',
              'class': 'msPinSite'
            }).appendTo(contentDiv);
            return $('<span>').addClass('pinify-topHat-text').text(options.pinText).appendTo(contentDiv);
          },
          brandedTopHat: function() {
            var contentDiv;
            teaser.addClass('pinify-brandedTopHat-container pinify-teaser').css('color', options.style.textColor);
            if (options.style.backgoundImage) {
              teaser.css('background-image', options.style.backgroundImage);
            }
            contentDiv = $('<div>', {
              'class': 'pinify-brandedTopHat-content'
            }).appendTo(teaser);
            $('<img>', {
              id: 'pinify-brandedTopHat-firstLogo',
              src: options.icon,
              alt: 'Drag Me',
              'class': 'msPinSite'
            }).appendTo(contentDiv);
             $('<img>', {
              id: 'pinify-brandedTopHat-secondLogo',
              src: options.icon,
              alt: 'Drag Me',
              'class': 'msPinSite'
            }).appendTo(contentDiv);
            $('<img>', {
              id: 'pinify-brandedTopHat-thirdLogo',
              src: options.icon,
              alt: 'Drag Me',
              'class': 'msPinSite'
            }).appendTo(contentDiv);
            $('<div>', {
              'class': 'pinify-mainText'
            }).text(options.pinText).appendTo(contentDiv);
            return $('<div>', {
              'class': 'pinify-brandedTopHat-secondaryText'
            }).text(options.secondaryText).appendTo(contentDiv);
          },
          doubleTopHat: function() {
            var leftBar, leftDiv, mainContent, rightDiv;
            teaser.addClass('pinify-doubleTopHat-container pinify-teaser').css('color', options.style.textColor);
            leftDiv = $('<div>', {
              'class': 'pinify-doubleTopHat-left'
            }).appendTo(teaser);
            if (options.style.leftBackgroundImage) {
              $(leftDiv).css('background-image', options.style.leftBackgoundImage);
            }
            leftBar = $('<div>', {
              id: 'pinify-doubleTopHat-leftBar'
            }).appendTo(leftDiv);
            $('<img>', {
              id: 'pinify-doubleTopHat-logo',
              src: options.icon,
              alt: 'Drag Me',
              'class': 'msPinSite'
            }).appendTo(leftBar);
            rightDiv = $('<div>', {
              'class': 'pinify-doubleTopHat-right'
            }).appendTo(teaser);
            if (options.style.rightBackgroundImage) {
              $(rightDiv).css('background-image', options.style.rightBackgoundImage);
            }
            $('<div>', {
              id: 'pinify-doubleTopHat-rightBar'
            }).appendTo(rightDiv);
            mainContent = $('<div>', {
              id: 'pinify-doubleTopHat-rightBarMainContent'
            }).appendTo(rightDiv);
            $('<div>', {
              'class': 'pinify-mainText'
            }).text(options.pinText).appendTo(mainContent);
            return $('<div>', {
              'class': 'pinify-doubleTopHat-lighterText'
            }).text(options.secondaryText).appendTo(rightDiv);
          },
          hangingChad: function() {
            teaser.hide();
            teaser.css({
              'color': options.style.textColor,
              'background-color': options.style.backgroundColor
            }).addClass('pinify-hanging-container pinify-teaser');
            $('<img>', {
              src: options.icon,
              'class': 'msPinSite'
            }).appendTo(teaser);
            $('<div>', {
              'class': 'pinify-hanging-content'
            }).appendTo(teaser);
            $('<div>', {
              id: 'pinify-pinText'
            }).text(options.pinText).appendTo(teaser);
            return teaser.fadeIn('slow');
          }
        };
        options = $.extend({}, defaultOptions, options);
        return this.each(function() {
          builder[options.type]();
          if (!options.sticky) {
            this.delay(options.timeout).fadeOut('slow');
          } else {
            $('<div>').addClass('pinify-closePin').click(function() {
              $('.pinify-teaser').slideUp('slow');
              return teaser.slideUp('slow');
            }).appendTo(teaser);
          }
          if (!options.addStartLink) {
            return;
          }
          return $('<a>').addClass('pinify-addSiteLink').attr('href', '#').click(function(event) {
            event.preventDefault();
            try {
              return window.external.msAddSiteMode();
            } catch (e) {

            }
          }).css('color', options.linkColor).appendTo(teaser).text(options.linkText);
        });
      }
    };
    $.fn.pinify = function(method) {
      if (!siteModeSupported()) {
        return this;
      }
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || !method) {
        return methods.init.apply(this, arguments);
      } else {
        return $.error("Method " + method + " does not exist on jQuery.pinify");
      }
    };
    /*
      * pinify Utility Functions
      *  firstRunState: determines wheter a pinned site has been lanched for the first time
      *  isPinned: Returns true if the site is pinned to the taskbar, false if not
      *  addJumpList: Given options, adds jumplist items to a pinned window
      *  clearJumpList: Clears all dynamic jumplist items from the pinned window 
      *  addOverlay: Given options, adds an overlay icon to the taskbar for the pinned site
      *  clearOverlay: Clears the current overlay icon
      *  flashTaskbar: Flashes the taskbar box of a pinned site
      *  createThumbbarButtons: creates buttons on the pinned site preview window thumbbar, and wires events to respond to button clicks
      */
    return $.pinify = {
      /*
        	* Return Values
        	* 0 = The pinned site is not in a first run state, or is not pinned
        	* 1 = First run from a drag and drop operation
        	* 2 = First run from a shortcut added to the Start menu (msAddSiteMode)
        	*/
      firstRunState: function(preserveState) {
        if (!siteModeSupported()) {
          return 0;
        }
        if (preserveState) {
          preserveState = false;
        }
        return callWindowExternalSafely(function() {
          return window.external.msIsSiteModeFirstRun(preserveState);
        }, 0);
      },
      isPinned: function() {
        if (!siteModeSupported()) {
          return false;
        }
        return callWindowExternalSafely(function() {
          return window.external.msIsSiteMode();
        }, false);
      },
      addJumpList: function(options) {
        var defaultOptions;
        if (!siteModeSupported()) {
          return false;
        }
        defaultOptions = {
          title: '',
          items: []
        };
        options = $.extend({}, defaultOptions, options);
        return callWindowExternalSafely(function() {
          var items;
          if (window.external.msIsSiteMode()) {
            window.external.msSiteModeClearJumpList();
            window.external.msSiteModeCreateJumpList(options.title);
            items = options.items;
            $.each(items, function(key, value) {
              return window.external.msSiteModeAddJumpListItem(value.name, value.url, value.icon);
            });
            return window.external.msSiteModeShowJumpList();
          }
        });
      },
      clearJumpList: function() {
        if (!siteModeSupported()) {
          return this;
        }
        return callWindowExternalSafely(function() {
          if (window.external.msIsSiteMode()) {
            return window.external.msSiteModeClearJumpList();
          }
        });
      },
      addOverlay: function(options) {
        var defaultOptions;
        if (!siteModeSupported()) {
          return this;
        }
        defaultOptions = {
          title: '',
          icon: ''
        };
        options = $.extend({}, defaultOptions, options);
        return callWindowExternalSafely(function() {
          if (window.external.msIsSiteMode()) {
            window.external.msSiteModeClearIconOverlay();
            return window.external.msSiteModeSetIconOverlay(options.icon, options.title);
          }
        });
      },
      clearOverlay: function() {
        if (!siteModeSupported()) {
          return this;
        }
        return callWindowExternalSafely(function() {
          if (window.external.msIsSiteMode()) {
            return window.external.msSiteModeClearIconOverlay();
          }
        });
      },
      flashTaskbar: function() {
        if (!siteModeSupported()) {
          return this;
        }
        return callWindowExternalSafely(function() {
          if (window.external.msIsSiteMode()) {
            return window.external.msSiteModeActivate();
          }
        });
      },
      createThumbbarButtons: function(options) {
        var defaultOptions;
        if (!siteModeSupported()) {
          return this;
        }
        defaultOptions = {
          buttons: []
        };
        options = $.extend({}, defaultOptions, options);
        return callWindowExternalSafely(function() {
          var ButtonStyle, buttons, clickCurrent;
          if (window.external.msIsSiteMode()) {
            buttons = [];
            ButtonStyle = (function() {
              function ButtonStyle() {}
              ButtonStyle.prototype.button = null;
              ButtonStyle.prototype.alternateStyle = null;
              ButtonStyle.prototype.activeStyle = 0;
              ButtonStyle.prototype.click = null;
              ButtonStyle.prototype.hidden = false;
              return ButtonStyle;
            })();
            clickCurrent = function(btn) {
              var curr, newStyle;
              curr = buttons[btn.buttonID];
              curr.click();
              if (curr.alternateStyle) {
                newStyle = curr.activeStyle === 0 ? curr.alternateStyle : 0;
                window.external.msSiteModeShowButtonStyle(curr.button, newStyle);
                return curr.activeStyle = newStyle;
              }
            };
            $.each(options.buttons, function(key, value) {
              var altBtn, btn, buttonStyle, style;
              btn = window.external.msSiteModeAddThumbBarButton(value.icon, value.name);
              if (value.alternateStyle) {
                style = value.alternateStyle;
                altBtn = window.external.msSiteModeAddButtonStyle(btn, style.icon, style.name);
              }
              buttonStyle = new ButtonStyle;
              buttonStyle.button = btn;
              buttonStyle.alternateStyle = altBtn;
              buttonStyle.click = value.click;
              buttonStyle.hidden = value.hidden || false;
              buttons[btn] = buttonStyle;
              if (document.addEventListener) {
                return document.addEventListener('msthumbnailclick', clickCurrent, false);
              } else if (document.attachEvent) {
                return document.attachEvent('onmsthumbnailclick', clickCurrent);
              }
            });
            window.onunload = function() {
              var key, value, _results;
              _results = [];
              for (key in buttons) {
                if (!__hasProp.call(buttons, key)) continue;
                value = buttons[key];
                _results.push(window.external.msSiteModeUpdateThumbBarButton(value.button, true, false));
              }
              return _results;
            };
            window.onload = function() {
              var key, value, _results;
              _results = [];
              for (key in buttons) {
                if (!__hasProp.call(buttons, key)) continue;
                value = buttons[key];
                _results.push(!value.hidden ? window.external.msSiteModeUpdateThumbBarButton(value.button, true, true) : void 0);
              }
              return _results;
            };
            return window.external.msSiteModeShowThumbBar();
          }
        });
      }
    };
  })(jQuery);
}).call(this);
