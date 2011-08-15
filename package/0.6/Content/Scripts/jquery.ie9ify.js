(function($){

    $.fn.ie9ify = function(options){
        if (checkForIE())
            return this;
    
        var defaultOptions = {
            applicationName: document.title.toString(), 
            favIcon: window.location.href + '/favicon.ico',
            navColor: '',
            startUrl: window.location.href,
            tooltip: document.title.toString(),
            window: 'width=800;height=600',
            tasks: []
        }
    
        options = $.extend({}, defaultOptions, options); 
         
        return this.each(function() {         
            if ($('link[type^=image]').length == 0) {        
                $('<link>').attr('rel', 'shortcut icon')
                    .attr('type', 'image/ico')
                    .attr('href', options.favIcon)
                    .appendTo(this);
            }
                    
            createMetaTag('application-name', options.applicationName, this);
            createMetaTag('msapplication-tooltip', options.tooltip, this);
            createMetaTag('msapplication-starturl', options.startUrl, this);
            createMetaTag('msapplication-navbutton-color', options.navColor, this);
            createMetaTag('msapplication-window', options.window, this);
                    
            var taskList = options.tasks;        
            for(var i=0; i< taskList.length; i++) {
                var task = taskList[i];            
                createMetaTag('msapplication-task', 'name=' + task.name 
                    + ';action-uri=' + task.action 
                    + ';icon-uri=' + task.icon, this);            
            }        
            
        });        
    };
    
    $.fn.enablePinning = function(title) {
        if (checkForIE())
            return this;
        
        return this.each(function() {
            if (title == undefined)
                title = "Drag this image to your Windows 7 Taskbar to pin this site with IE9";
                    
            // Image Pinning only works when msPinSite is the only class defined. This is an RC bug that will be fixed by RTM
            $(this).removeClass()
                   .addClass('msPinSite')
                   .attr("title", title);            
        });
    }
    
    $.fn.enableIESiteMode = function(eventName) {
        if (checkForIE())
            return this;
           
        if(!eventName)
            eventName = 'click';
                
        return this.each(function() {
            $(this).bind(   eventName, function(event) {
                event.preventDefault();
                
                try {
                    window.external.msAddSiteMode();
                } catch(e) {}  
            });    
        });
    }
    
    $.fn.pinTeaser = function(options) {
        if (checkForIE())
          return this;
        
        var defaultOptions = {
            icon: window.location.href + '/favicon.ico',
            pinText: 'Drag this image or the tab to the taskbar to pin this site',
            addStartLink: true,
            linkText: 'Click here to add this site to the start menu',
            linkColor: 'rgb(0, 108, 172)',
            backgroundColor: 'rgb(0, 108, 172)',
            textColor: 'white'
        }
        
        options = $.extend({}, defaultOptions, options);        
        
        return this.each(function() {            
            $(this).css('padding', '5px')
                   .css('color', options.textColor)
                   .css('width', '350px')
                   .css('height', '20px')
                   .css('position', 'fixed')
                   .css('top', '0px')
                   .css('left', '80px')
                   .css('background-color', options.backgroundColor) 
                   .css('border-radius', '0px 0px 10px 10px')
                   .css('font-size', '.87em')
            
            var img = $('<img>').addClass('msPinSite')
                      .attr('src', options.icon)
                      .css('height', '20px')
                      .css('width', '20px')
                      .css('vertical-align', 'top')
                      .css('float', 'left')
                      .css('margin-right', '5px')
                      .appendTo(this);
                    
            var div = $('<div>').attr('id', 'divAddSite')
                                .css('width', '280px')
                                .css('height', '15px')
                                .css('position', 'fixed')
                                .css('top', '30px')
                                .css('left', '80px')
                                .css('padding', '5px')
                                .css('-webkit-border-radius', '10px')
                                .css('-moz-border-radius', '10px')
                                .css('border-radius', '10px 10px 10px 10px')
                                .appendTo($(this));                                
                                
            var text = $('<div>').attr('id', 'pinText')
                                 .attr('innerText', options.pinText)
                                 .appendTo(this);
            
            if(!options.addStartLink)
                return;
            
            link = $('<a>').attr('id', 'linkAddSite')
                           .attr('href', '#')
                           .click(function(event) {
                                event.preventDefault();
                                  
                                try {
                                    window.external.msAddSiteMode();                                    
                                } catch(e) {}
                            })
                            .css('text-decoration', 'none')
                            .css('color', options.linkColor) 
                            .appendTo(div)
                            .text(options.linkText);
        });
    }
    
    $.fn.addJumpList = function(options) {
        if (checkForIE())
          return this;
        
        var defaultOptions = {
            eventName: 'click',
            title: '',
            items: []
        }
        
        options = $.extend({}, defaultOptions, options);
        
        return this.each(function() {
            $(this).bind(options.eventName, function(event) {
                event.preventDefault();
                
                try {
                    if (window.external.msIsSiteMode()) {
                        window.external.msSiteModeClearJumplist();
                        window.external.msSiteModeCreateJumplist(options.title);
                        
                        var items = options.items;
                        for(var i = 0;i< items.length;i++) {
                            var item = items[i];
                            window.external.msSiteModeAddJumpListItem(item.name, item.url, item.icon);
                        }
                        
                        window.external.msSiteModeShowJumplist();
                    }
                } catch(e) {}
            });
        });
    }
    
    $.fn.clearJumpList = function(eventName) {
        if (checkForIE())
            return this;
            
        if(!eventName)
            eventName = 'click';
            
        return this.each(function() {
            $(this).bind(eventName, function(event) {
                event.preventDefault();
                
                try {
                    if (window.external.msIsSiteMode()) {
                        window.external.msSiteModeClearJumpList();
                    }
                } catch(e) {}
            });
        });    
    }
    
    $.fn.addOverlay = function(options) {
        if (checkForIE())
          return this;
        
        var defaultOptions = {
            eventName: 'click',
            title: '',
            icon: this.attr("data-overlay")
        }
    
        options = $.extend({}, defaultOptions, options); 
                
        return this.each(function() {
            $(this).bind(options.eventName, function(event) {
                event.preventDefault();
            
                try {
                    if (window.external.msIsSiteMode()) {                
                        window.external.msSiteModeClearIconOverlay();            
                        window.external.msSiteModeSetIconOverlay(options.icon, options.title); 
                    }
                } catch(e) {} 
            });
        });
    }
    
    $.fn.clearOverlay = function(eventName) {
        if (checkForIE())
          return this;
        
        if(!eventName)
            eventName = 'click';
        
        return this.each(function() {
            $(this).bind(eventName, function(event) {
                event.preventDefault();
                
                try {
                    if (window.external.msIsSiteMode()) {                
                        window.external.msSiteModeClearIconOverlay();
                    }
                } catch(e) {}
            });    
        });    
    }
        
    $.fn.flashTaskbar = function() {
        if (checkForIE())
            return this;
            
        try {
            if (window.external.msIsSiteMode()) {
                window.external.msSiteModeActivate();
            }                
        } catch(e) {} 
    }
        
    function createMetaTag(name, content, head) {
        if($('meta[name=' + name + ']').length && name != 'msapplication-task')
            return;
        
        if(content.length == 0)
            return;
            
        $('<meta>').attr('name', name)
                .attr('content', content)
                .appendTo(head);
    }
    
    function checkForIE() {
        if ($.browser.msie == undefined)
            return true;
        
        if ($.browser.version < 9)
            return true;
        
        return false;
    }
    
})(jQuery);