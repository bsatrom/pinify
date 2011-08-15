###
* jQuery pinify Plugin v1.2.1
* http://ie9ify.codeplex.com
*
* Copyright 2011, Brandon Satrom and Clark Sell
* Licensed under MS-PL.
* http://ie9ify.codeplex.com/license
*
* Date: Thursday Jun 02 2011 19:13:11 -05
###

(($) ->
  createMetaTag = (name, content, head) ->
    if $("meta[name=#{name}]").length and name isnt 'msapplication-task'
      return
      
    if not content.length 
      return
      
    $('<meta>', {
      name
      content
    }).appendTo(head)
  
  siteModeSupported = ->
    (not not window.external) and ("msIsSiteMode" of window.external)
    
  methods = 
    init: (options) ->
      defaultOptions =
        applicationName: document.title.toString()
        favIcon: "http://#{location.host}/favicon.ico"
        navColor: ""
        startUrl: "http://#{location.host}"
        tooltip: document.title.toString()
        window: "width=800;height=600"
        tasks: []
        
      options = $.extend {}, defaultOptions, options
      
      return @.each ->
        taskList = options.tasks
        head = @
        
        if $("link[type^=image]").length is 0
          $("<link />", {
            rel: "shortcut icon"
            type: "image/ico"
            href: options.favIcon
          }).appendTo(@)
          
        createMetaTag 'application-name', options.applicationName, @
        createMetaTag 'msapplication-tooltip', options.tooltip, @
        createMetaTag 'msapplication-starturl', options.startUrl, @
        createMetaTag 'msapplication-navbutton-color', options.navColor, @
        createMetaTag 'msapplication-window', options.window, @

        $.each taskList, (key, value) -> 
          createMetaTag('msapplication-task', "name=#{value.name};action-uri=#{value.action};icon-uri=#{value.icon}", head);
    
    enablePinning: (title) ->
      @.each ->
        title = title or "Drag this image to your Windows 7 Taskbar to pin this site with IE9"
        $(@).addClass("msPinSite").attr title: title
    
    enableSiteMode: (eventName) ->
      eventName = eventName or "click"
      
      @.each ->
        $(@).bind eventName, (event) ->
          event.preventDefault()
          
          try
            window.external.msAddSiteMode()
          catch e          
    
  $.fn.pinify = (method) ->
    if not siteModeSupported()
      return @
      
    if methods[method]
      return methods[method].apply @, Array.prototype.slice.call arguments, 1
    else if typeof method is 'object' or not method
      return methods.init.apply @, arguments
    else
      $.error "Method #{method} does not exist on jQuery.pinify"
  
  $.pinify = {
    firstRunState: (preserveState) ->
      if not siteModeSupported()
        return 0
      if preserveState
        preserveState = false
        
      try
        window.external.msIsSiteModeFirstRun preserveState
      catch e
        0
    
    isPinned: ->
        if not siteModeSupported()
          return false
        
        try
          window.external.msIsSiteMode()
        catch e
          return false
  }
)(jQuery)