/*
* jQuery pinify Plugin v1.2.1
* http://ie9ify.codeplex.com
*
* Copyright 2011, Brandon Satrom and Clark Sell
* Licensed under MS-PL.
* http://ie9ify.codeplex.com/license
*
* Date: Thursday Jun 02 2011 19:13:11 -05
*/(function($) {
  var createMetaTag, methods, siteModeSupported;
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
  return $.pinify = {
    firstRunState: function(preserveState) {
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
    },
    isPinned: function() {
      if (!siteModeSupported()) {
        return false;
      }
      try {
        return window.external.msIsSiteMode();
      } catch (e) {
        return false;
      }
    }
  };
})(jQuery);