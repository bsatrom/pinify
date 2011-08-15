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