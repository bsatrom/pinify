###
* jQuery pinify Plugin v1.2.5
* http://ie9ify.codeplex.com
*
* Copyright 2011, Brandon Satrom and Clark Sell
* Licensed under an Apache Foundation License.
* http://github.com/bsatrom/pinify
*
* Date: Tuesday Aug 16 2011 19:13:11 -05
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
  
  # Wrapper method for functions that call (potentially unavailable) window.external methods
  callWindowExternalSafely = (func, returnValue) ->
  	try
  		func()
	  catch e
	  	return returnValue
    
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
    
    pinTeaser: (options) ->
      if window.external.msIsSiteMode()
        @
            
      teaser = $(@)    	
      defaultOptions =
        type: "hangingChad" #Options are: hangingChad, topHad, brandedTopHat and doubleTopHat
        icon: "http://#{location.host}/favicon.ico"
        pinText: "Drag this image to the taskbar to pin this site"
        secondaryText: "Simply deag the icon or tab to the taskbar to pin."
        addStartLink: false
        linkText: "Click here to add this site to the start menu"
        sticky: true
        timeout: 1000
        style: 
          linkColor: "rgb(0, 108, 172)"
          backgroundColor: "rgb(0, 108, 172)"
          textColor: "white"
          backgroundImage: null
          leftBackgroundImage: null
          rightBackgroundImage: null
          closeButtonImage: null
      
      builder = 
        topHat: ->
          teaser.addClass('pinify-topHat-container pinify-teaser').css 'color', options.style.textColor
          
          if options.style.backgroundImage
          	teaser.css 'background-image', options.style.backgroundImage
          	
          alignmentDiv = $('<div>', { 
            'class': 'pinify-topHat-alignment' 
          }).appendTo teaser
          contentDiv = $('<div>', { 
            'class': 'pinify-topHat-content'
          }).appendTo alignmentDiv
          $('<img>', { 
            id: 'pinify-topHat-logo'
            src: options.icon
            alt: 'Drag Me'
            'class': 'msPinSite' 
          }).appendTo contentDiv
          $('<span>').addClass('pinify-topHat-text').text(options.pinText).appendTo contentDiv     
          	     	
        brandedTopHat: ->
        	teaser.addClass('pinify-brandedTopHat-container pinify-teaser').css 'color', options.style.textColor
          
        	if options.style.backgoundImage
          	teaser.css 'background-image', options.style.backgroundImage
            
          contentDiv = $('<div>', { 
          	'class': 'pinify-brandedTopHat-content' 
          }).appendTo teaser
          $('<img>', { 
          	id: 'pinify-brandedTopHat-firstLogo'
          	src: options.icon
          	alt: 'Drag Me'
          	'class': 'msPinSite' 
          }).appendTo contentDiv          
          $('<img>', { 
            id: 'pinify-brandedTopHat-thirdLogo'
            src: options.icon
            alt: 'Drag Me'
            'class': 'msPinSite' 
          }).appendTo contentDiv
          $('<div>', {
          	'class': 'pinify-mainText'
          }).text(options.pinText).appendTo contentDiv
          $('<div>', { 
          	'class': 'pinify-brandedTopHat-secondaryText'
          }).text(options.secondaryText).appendTo contentDiv					
          
        doubleTopHat: ->
        	teaser.addClass('pinify-doubleTopHat-container pinify-teaser').css 'color', options.style.textColor
        	leftDiv = $('<div>', { 
        		'class': 'pinify-doubleTopHat-left'
        	}).appendTo(teaser)
        	if options.style.leftBackgroundImage
          	$(leftDiv).css('background-image', options.style.leftBackgoundImage)
          leftBar = $('<div>', { 
          	id: 'pinify-doubleTopHat-leftBar' 
          }).appendTo leftDiv
          $('<img>', { 
          	id: 'pinify-doubleTopHat-logo'
          	src: options.icon
          	alt: 'Drag Me'
          	'class': 'msPinSite'
          }).appendTo leftBar
          rightDiv = $('<div>', { 
          	'class': 'pinify-doubleTopHat-right' 
          }).appendTo teaser
          if options.style.rightBackgroundImage
          	$(rightDiv).css 'background-image', options.style.rightBackgoundImage
          $('<div>', { 
          	id: 'pinify-doubleTopHat-rightBar' 
          }).appendTo rightDiv
          mainContent = $('<div>', { 
          	id: 'pinify-doubleTopHat-rightBarMainContent' 
          }).appendTo rightDiv
          $('<div>', { 
          	'class': 'pinify-mainText' 
          }).text(options.pinText).appendTo mainContent
          $('<div>', { 
          	'class': 'pinify-doubleTopHat-lighterText' 
          }).text(options.secondaryText).appendTo rightDiv
          
        hangingChad: ->
          teaser.hide()
          teaser.css({ 
            'color': options.style.textColor
            'background-color': options.style.backgroundColor
          }).addClass 'pinify-hanging-container pinify-teaser'
          $('<img>', { 
            src: options.icon
            'class': 'msPinSite' 
          }).appendTo teaser
          $('<div>', { 
            'class': 'pinify-hanging-content' 
          }).appendTo teaser
          $('<div>', { 
            id: 'pinify-pinText' 
          }).text(options.pinText).appendTo teaser
          teaser.fadeIn 'slow'  
      
      options = $.extend {}, defaultOptions, options                             
      
      return @each ->
        builder[options.type]()
        
        if not options.sticky
          @delay(options.timeout).fadeOut 'slow'
        else
          $('<div>').addClass('pinify-closePin').click( ->
            $('.pinify-teaser').slideUp 'slow'
            teaser.slideUp 'slow')
          .appendTo(teaser)
        
        if not options.addStartLink
          return
          
        $('<a>').addClass('pinify-addSiteLink').attr('href', '#').click((event) ->	
            event.preventDefault()
            
            try
              window.external.msAddSiteMode()
            catch e
        ).css('color', options.linkColor).appendTo(teaser).text(options.linkText)      		
  
  # main entry point for pinify methods that operate on a jQuery wrapped set (above)
  $.fn.pinify = (method) ->
    if not siteModeSupported()
      return @
      
    if methods[method]
      return methods[method].apply @, Array.prototype.slice.call arguments, 1
    else if typeof method is 'object' or not method
      return methods.init.apply @, arguments
    else
      $.error "Method #{method} does not exist on jQuery.pinify"
  
  ###
  * pinify Utility Functions
  *  firstRunState: determines wheter a pinned site has been lanched for the first time
  *  isPinned: Returns true if the site is pinned to the taskbar, false if not
  *  addJumpList: Given options, adds jumplist items to a pinned window
  *  clearJumpList: Clears all dynamic jumplist items from the pinned window 
  *  addOverlay: Given options, adds an overlay icon to the taskbar for the pinned site
  *  clearOverlay: Clears the current overlay icon
  *  flashTaskbar: Flashes the taskbar box of a pinned site
  *  createThumbbarButtons: creates buttons on the pinned site preview window thumbbar, and wires events to respond to button clicks
  ###
  $.pinify = {
  	###
  	* Return Values
  	* 0 = The pinned site is not in a first run state, or is not pinned
  	* 1 = First run from a drag and drop operation
  	* 2 = First run from a shortcut added to the Start menu (msAddSiteMode)
  	###
  	firstRunState: (preserveState) ->
      if not siteModeSupported()
        return 0
      
      if preserveState
        preserveState = false
      
      callWindowExternalSafely(-> 
      	window.external.msIsSiteModeFirstRun(preserveState)
      , 0)      
    
    isPinned: ->
        if not siteModeSupported()
          return false
        
        callWindowExternalSafely(->
        	window.external.msIsSiteMode()
        , false)
          
    addJumpList: (options) ->
    	if not siteModeSupported()
    		return false
    		
    	defaultOptions =
    		title: ''
    		items: []
    	
    	options = $.extend {}, defaultOptions, options
    	
    	callWindowExternalSafely(->
    		if window.external.msIsSiteMode()
    			window.external.msSiteModeClearJumpList()
    			window.external.msSiteModeCreateJumpList options.title
    			
    			items = options.items
    			
    			$.each(items, (key, value) -> 
    				window.external.msSiteModeAddJumpListItem(value.name, value.url, value.icon)
    			)
    			
    			window.external.msSiteModeShowJumpList()
    	)
    	
    clearJumpList: ->
    	if not siteModeSupported()
    		return @
    	
    	callWindowExternalSafely(->
    		if window.external.msIsSiteMode()
    			window.external.msSiteModeClearJumpList()
    	)	    	
    
    addOverlay: (options) ->
    	if not siteModeSupported()
    		return @
    		
    	defaultOptions =
    		title: ''
    		icon: ''
    		
    	options = $.extend {}, defaultOptions, options
    	
    	callWindowExternalSafely(->
    		if window.external.msIsSiteMode()
    			window.external.msSiteModeClearIconOverlay()
    			window.external.msSiteModeSetIconOverlay options.icon, options.title
    	)
    
    clearOverlay: ->
    	if not siteModeSupported()
    		return @
    		
    	callWindowExternalSafely(->
    		if window.external.msIsSiteMode()
    			window.external.msSiteModeClearIconOverlay()
    	)
    
    flashTaskbar: ->
    	if not siteModeSupported()
    		return @
    		
    	callWindowExternalSafely(->
    		if window.external.msIsSiteMode()
    			window.external.msSiteModeActivate()
    	)
    
    createThumbbarButtons: (options) ->
    	if not siteModeSupported()
    		return @
    		
    	defaultOptions = 
    		buttons: []
    		
    	options = $.extend {}, defaultOptions, options
    	
    	callWindowExternalSafely(->
    		if window.external.msIsSiteMode()
    			buttons = []
    			
    			class ButtonStyle
    				button: null
    				alternateStyle: null
    				activeStyle: 0
    				click: null
    			
    			clickCurrent = (btn) ->
    				curr = buttons[btn.buttonID]
    				curr.click()
    				
    				if curr.alternateStyle
    					newStyle = if curr.activeStyle is 0 then curr.alternateStyle else 0
    					window.external.msSiteModeShowButtonStyle curr.button, newStyle
    					curr.activeStyle = newStyle
    					
    			$.each(options.buttons, (key, value) ->
    				btn = window.external.msSiteModeAddThumbBarButton value.icon, value.name
    				
    				if value.alternateStyle
    					style = value.alternateStyle
    					altBtn = window.external.msSiteModeAddButtonStyle btn, style.icon, style.name
    				
    				buttonStyle = new ButtonStyle
    				buttonStyle.button = btn
    				buttonStyle.alternateStyle = altBtn
    				buttonStyle.click = value.click
    				buttons[btn] = buttonStyle
    				
    				if document.addEventListener
    					document.addEventListener 'msthumbnailclick', clickCurrent, false      				  				
    				else if document.attachEvent
    					document.attachEvent('onmsthumbnailclick', clickCurrent)
    			);
    			
    			window.onunload = ->
    				for own key, value of buttons
    					window.external.msSiteModeUpdateThumbBarButton buttons[key].button, true, false
    					
    			window.onload = ->
    				for own key, value of buttons
    					window.external.msSiteModeUpdateThumbBarButtons buttons[key].button, true, true		
    			
    			window.external.msSiteModeShowThumbBar()
    	)
  }
)(jQuery)