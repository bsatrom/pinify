var windowMocks = {};
windowMocks.window = window;

//Should be called by user after each test
windowMocks.resetWindow = function() {
    window = windowMocks.window;    
};

windowMocks.mockWindowExternal = function() {
  window = {};                
  window.external = function() {};                    
};

windowMocks.mockMsIsSiteMode = function(value) {
  this.mockWindowExternal();

  window.external.msIsSiteMode = function() { 
    return value || true;      
  };  
};

windowMocks.mockMsIsSiteModeFirstRun = function(value) {
  this.mockWindowExternal();
  this.mockMsIsSiteMode();  

  window.external.msIsSiteModeFirstRun = function() {
    return !!value ? value : 0; 
  }
};

windowMocks.mockSetIconOverlay = function() {
	this.mockWindowExternal();
	this.mockMsIsSiteMode();
	
	window.external.overlayProperties = {};
	window.external.overlayProperties.clearWasCalled = false;
	
	window.external.msSiteModeClearIconOverlay = function() {
		window.external.overlayProperties.clearWasCalled = true;
	}
	
	window.external.msSiteModeSetIconOverlay = function(icon, title) {
		window.external.overlayProperties.title = title;
		window.external.overlayProperties.icon = icon;
	}
};

windowMocks.mockClearIconOverlay = function() {
	this.mockWindowExternal();
	this.mockMsIsSiteMode();
	
	window.external.overlayProperties = {};
	window.external.overlayProperties.clearWasCalled = false;
	
	window.external.msSiteModeClearIconOverlay = function() {
		window.external.overlayProperties.clearWasCalled = true;
	}
};

windowMocks.mockAddJumpList = function() {
	this.mockWindowExternal();
	this.mockMsIsSiteMode();
	
	window.external.jumpListProperties = {};
	window.external.jumpListProperties.clearWasCalled = false;
	window.external.jumpListProperties.showWasCalled = false;
	window.external.jumpListProperties.items = [];
	
	window.external.msSiteModeClearJumpList = function() {
		window.external.jumpListProperties.clearWasCalled = true;
	}
	
	window.external.msSiteModeCreateJumpList = function(title) {
		window.external.jumpListProperties.title = title;		
	}
	
	window.external.msSiteModeAddJumpListItem = function(name, url, icon) {
		var item = {
			'name': name,
			'url': url,
			'icon': icon
		};
		
		window.external.jumpListProperties.items.push(item);
	};
	
	window.external.msSiteModeShowJumpList = function() {
		window.external.jumpListProperties.showWasCalled = true;
	}
};

windowMocks.mockClearJumpList = function() {
	this.mockWindowExternal();
	this.mockMsIsSiteMode();
	
	window.external.jumpListProperties = {};
	window.external.jumpListProperties.clearWasCalled = false;
	
	window.external.msSiteModeClearJumpList = function() {
		window.external.jumpListProperties.clearWasCalled = true;
	}
};

windowMocks.mockThumbbarButtons = function() {
	this.mockWindowExternal();
	this.mockMsIsSiteMode();
	
	window.external.thumbbarProperties = {};
	window.external.thumbbarProperties.showWasCalled = false;
	window.external.thumbbarProperties.showStyleWasCalled = false;
	window.external.thumbbarProperties.buttons = [];
	window.external.thumbbarProperties.buttonStyles = [];
	
	window.external.msSiteModeAddThumbBarButton = function(icon, name) {
		var button = {
			'icon': icon,
			'name': name
		};
		
		window.external.thumbbarProperties.buttons.push(button);
		return button;
	}
	
	window.external.msSiteModeAddButtonStyle = function(btn, icon, name) {
		var buttonStyle = {
			'btn': btn,
			'icon': icon,
			'name': name
		};
	
		window.external.thumbbarProperties.buttonStyles.push(buttonStyle);	
		return buttonStyle;
	}
	
	window.external.msSiteModeShowButtonStyle = function(icon, name) {
		window.external.thumbbarProperties.showStyleWasCalled = true;
	}
	
	window.external.msSiteModeShowThumbBar = function(icon, name) {
		window.external.thumbbarProperties.showWasCalled = true;
	}
};