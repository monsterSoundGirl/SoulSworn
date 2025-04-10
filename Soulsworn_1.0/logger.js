// logger.js - Logging system for SoulSworn
//
// This module provides logging, performance tracking, and error reporting
// capabilities for the SoulSworn game.

/**
 * Logging levels in order of severity (lower index = less severe)
 */
const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

// Configuration options
const config = {
  minLevel: LOG_LEVELS.DEBUG,      // Minimum level to log
  maxLogs: 1000,                   // Maximum number of logs to store in memory
  logToConsole: true,              // Whether to output logs to console
  useTimestamps: true,             // Add timestamps to logs
  captureStack: true,              // Capture stack traces for errors
  performanceThreshold: 100,       // Time threshold in ms to flag slow functions
  monitoredFunctions: []           // Functions to automatically monitor
};

// Log storage
const logs = [];
const performanceLogs = [];
const errorLogs = [];

// Performance timing map
const timers = new Map();

// Performance profiles
const performanceProfiles = {
  UI: {
    description: 'UI Rendering Operations',
    operations: {},
    thresholds: {
      slow: 50,
      critical: 200
    },
    stats: {
      totalTime: 0,
      callCount: 0,
      avgTime: 0,
      maxTime: 0
    }
  },
  Network: {
    description: 'Network Operations',
    operations: {},
    thresholds: {
      slow: 300,
      critical: 1000
    },
    stats: {
      totalTime: 0,
      callCount: 0,
      avgTime: 0,
      maxTime: 0
    }
  },
  Game: {
    description: 'Game Logic Operations',
    operations: {},
    thresholds: {
      slow: 100,
      critical: 500
    },
    stats: {
      totalTime: 0,
      callCount: 0,
      avgTime: 0,
      maxTime: 0
    }
  },
  Deck: {
    description: 'Card Deck Operations',
    operations: {},
    thresholds: {
      slow: 20,
      critical: 100
    },
    stats: {
      totalTime: 0,
      callCount: 0,
      avgTime: 0,
      maxTime: 0
    }
  }
};

/**
 * Main logging function
 * @param {string} message - The message to log
 * @param {string} level - Log level (DEBUG, INFO, WARN, ERROR)
 * @param {object} data - Additional data to include with the log
 */
function log(message, level = 'INFO', data = null) {
  const logLevel = LOG_LEVELS[level] || LOG_LEVELS.INFO;
  
  // Check if we should log this message based on minimum level
  if (logLevel < config.minLevel) return;
  
  const timestamp = config.useTimestamps ? new Date() : null;
  const logEntry = {
    timestamp,
    level,
    message,
    data
  };
  
  // Add source info if available
  if (config.captureStack && logLevel >= LOG_LEVELS.WARN) {
    try {
      throw new Error();
    } catch (e) {
      // Get the caller from the stack trace (skip first two lines which are this function and Error constructor)
      const stackLines = e.stack.split('\n');
      if (stackLines.length > 2) {
        logEntry.source = stackLines[2].trim();
      }
    }
  }
  
  // Add to log storage
  logs.push(logEntry);
  
  // Trim logs if needed
  if (logs.length > config.maxLogs) {
    logs.shift();
  }
  
  // Add to error logs if it's an error
  if (level === 'ERROR') {
    errorLogs.push(logEntry);
  }
  
  // Output to console if enabled
  if (config.logToConsole) {
    const consoleMethod = level === 'DEBUG' ? 'debug' 
      : level === 'INFO' ? 'log'
      : level === 'WARN' ? 'warn'
      : 'error';
    
    const prefix = timestamp ? `[${timestamp.toISOString()}] [${level}]` : `[${level}]`;
    
    if (data) {
      console[consoleMethod](`${prefix} ${message}`, data);
    } else {
      console[consoleMethod](`${prefix} ${message}`);
    }
  }
  
  return logEntry;
}

/**
 * Debug level logging
 */
function debug(message, data = null) {
  return log(message, 'DEBUG', data);
}

/**
 * Info level logging
 */
function info(message, data = null) {
  return log(message, 'INFO', data);
}

/**
 * Warning level logging
 */
function warn(message, data = null) {
  return log(message, 'WARN', data);
}

/**
 * Error level logging
 */
function error(message, data = null) {
  return log(message, 'ERROR', data);
}

/**
 * Start timing a function or operation
 * @param {string} label - Label for the operation being timed
 * @param {string} profile - Optional performance profile category
 */
function startTimer(label, profile = null) {
  timers.set(label, {
    startTime: performance.now(),
    profile: profile
  });
  return label;
}

/**
 * End timing a function and log the result
 * @param {string} label - Label used in startTimer
 * @param {boolean} logResult - Whether to log the result
 * @param {Object} metadata - Additional metadata about the operation
 * @returns {number} The elapsed time in milliseconds
 */
function endTimer(label, logResult = true, metadata = null) {
  if (!timers.has(label)) {
    warn(`No timer found with label: ${label}`);
    return -1;
  }
  
  const timerData = timers.get(label);
  const endTime = performance.now();
  const elapsed = endTime - timerData.startTime;
  
  // Remove timer
  timers.delete(label);
  
  // Get performance severity
  let performanceSeverity = 'normal';
  let profileThresholds = { slow: config.performanceThreshold, critical: config.performanceThreshold * 5 };
  
  // Check if this operation belongs to a profile
  if (timerData.profile && performanceProfiles[timerData.profile]) {
    const profile = performanceProfiles[timerData.profile];
    profileThresholds = profile.thresholds;
    
    // Update profile stats
    profile.stats.totalTime += elapsed;
    profile.stats.callCount++;
    profile.stats.avgTime = profile.stats.totalTime / profile.stats.callCount;
    profile.stats.maxTime = Math.max(profile.stats.maxTime, elapsed);
    
    // Track operation within profile
    if (!profile.operations[label]) {
      profile.operations[label] = {
        calls: 0,
        totalTime: 0,
        avgTime: 0,
        maxTime: 0
      };
    }
    
    const op = profile.operations[label];
    op.calls++;
    op.totalTime += elapsed;
    op.avgTime = op.totalTime / op.calls;
    op.maxTime = Math.max(op.maxTime, elapsed);
  }
  
  if (elapsed > profileThresholds.critical) {
    performanceSeverity = 'critical';
  } else if (elapsed > profileThresholds.slow) {
    performanceSeverity = 'slow';
  }
  
  // Add to performance logs
  const perfEntry = {
    label,
    elapsed,
    timestamp: new Date(),
    severity: performanceSeverity,
    profile: timerData.profile,
    metadata
  };
  
  performanceLogs.push(perfEntry);
  
  // Trim performance logs if needed
  if (performanceLogs.length > config.maxLogs) {
    performanceLogs.shift();
  }
  
  // Log the result if requested
  if (logResult) {
    let level = 'DEBUG';
    if (performanceSeverity === 'critical') {
      level = 'ERROR';
    } else if (performanceSeverity === 'slow') {
      level = 'WARN';
    }
    
    log(`Performance: ${label} took ${elapsed.toFixed(2)}ms`, level, {
      ...perfEntry,
      memoryUsage: getMemoryUsage()
    });
  }
  
  return elapsed;
}

/**
 * Get memory usage information if available in the browser
 * @returns {Object|null} Memory usage data or null if not available
 */
function getMemoryUsage() {
  if (window.performance && window.performance.memory) {
    const memory = window.performance.memory;
    return {
      totalJSHeapSize: Math.round(memory.totalJSHeapSize / (1024 * 1024)),
      usedJSHeapSize: Math.round(memory.usedJSHeapSize / (1024 * 1024)),
      jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / (1024 * 1024))
    };
  }
  return null;
}

/**
 * Get a snapshot of the current performance profiles
 * @returns {Object} Performance profiles data
 */
function getPerformanceProfiles() {
  return { ...performanceProfiles };
}

/**
 * Reset performance profile statistics
 * @param {string} profileName - Optional profile name to reset, or all if omitted
 */
function resetPerformanceStats(profileName = null) {
  if (profileName && performanceProfiles[profileName]) {
    // Reset specific profile
    const profile = performanceProfiles[profileName];
    profile.operations = {};
    profile.stats = {
      totalTime: 0,
      callCount: 0,
      avgTime: 0,
      maxTime: 0
    };
    debug(`Reset performance stats for profile: ${profileName}`);
  } else {
    // Reset all profiles
    Object.keys(performanceProfiles).forEach(profile => {
      performanceProfiles[profile].operations = {};
      performanceProfiles[profile].stats = {
        totalTime: 0,
        callCount: 0,
        avgTime: 0,
        maxTime: 0
      };
    });
    debug('Reset all performance stats');
  }
}

/**
 * Start a performance mark using the browser's Performance API if available
 * @param {string} name - Name of the performance mark
 */
function startMark(name) {
  if (window.performance && window.performance.mark) {
    performance.mark(`${name}-start`);
  }
  return startTimer(name);
}

/**
 * End a performance mark and measure the time elapsed
 * @param {string} name - Name of the performance mark to end
 */
function endMark(name) {
  if (window.performance && window.performance.mark && window.performance.measure) {
    performance.mark(`${name}-end`);
    try {
      performance.measure(name, `${name}-start`, `${name}-end`);
    } catch (e) {
      console.error(`Error measuring performance: ${e.message}`);
    }
  }
  return endTimer(name);
}

/**
 * Measure performance of a function and return the result
 * @param {Function} fn - Function to measure
 * @param {string} label - Label for the measurement
 * @param {string} profile - Optional performance profile
 * @returns {*} The result of the function
 */
function measure(fn, label, profile = null) {
  startTimer(label, profile);
  try {
    return fn();
  } finally {
    endTimer(label);
  }
}

/**
 * Wrap a function with performance monitoring
 * @param {Function} fn - The function to wrap
 * @param {string} name - Optional name for the function
 * @param {Object} options - Optional configuration
 * @param {boolean} options.logParams - Whether to log function parameters (default: true)
 * @param {boolean} options.logReturn - Whether to log function return value (default: true)
 * @param {boolean} options.logPerformance - Whether to log performance (default: true)
 * @param {string} options.profile - Performance profile category
 * @returns {Function} The wrapped function
 */
function monitorFunction(fn, name = null, options = {}) {
  const fnName = name || fn.name || 'anonymous';
  const defaultOptions = {
    logParams: true,
    logReturn: true,
    logPerformance: true,
    profile: null
  };
  
  // Merge options with defaults
  const config = { ...defaultOptions, ...options };
  
  return function(...args) {
    const label = `fn:${fnName}`;
    
    // Start performance timing if enabled
    if (config.logPerformance) {
      startTimer(label, config.profile);
    }
    
    try {
      // Log function entry with parameters if enabled
      if (config.logParams) {
        // Format the arguments in a readable way
        const formattedArgs = args.map(arg => {
          if (arg === null) return 'null';
          if (arg === undefined) return 'undefined';
          if (typeof arg === 'function') return 'function()';
          if (typeof arg === 'object') {
            // For objects, include type and some key properties for identification
            if (Array.isArray(arg)) {
              return `Array(${arg.length})`;
            }
            // Try to identify the object by common properties
            if (arg.id) return `{id: "${arg.id}", ...}`;
            if (arg.name) return `{name: "${arg.name}", ...}`;
            return `${arg.constructor?.name || 'Object'}{...}`;
          }
          return String(arg);
        });
        
        debug(`Function call: ${fnName}(${formattedArgs.join(', ')})`, { 
          function: fnName,
          type: 'entry'
        });
      }
      
      // Execute original function
      const result = fn.apply(this, args);
      
      // Check if result is a promise
      if (result && typeof result.then === 'function') {
        // Handle async functions
        return result.then(
          (resolvedValue) => {
            // End timing if enabled
            if (config.logPerformance) {
              endTimer(label, true, { args: args.length });
            }
            
            // Log return value for async functions if enabled
            if (config.logReturn) {
              const formattedValue = formatReturnValue(resolvedValue);
              debug(`Function return: ${fnName} → ${formattedValue}`, {
                function: fnName,
                type: 'return',
                async: true
              });
            }
            
            return resolvedValue;
          },
          (error) => {
            // End timing if enabled
            if (config.logPerformance) {
              endTimer(label, true, { args: args.length, error: true });
            }
            
            // Log error
            error(`Error in async function ${fnName}:`, error);
            throw error;
          }
        );
      } else {
        // Handle synchronous functions
        
        // End timing if enabled
        if (config.logPerformance) {
          endTimer(label, true, { args: args.length });
        }
        
        // Log return value if enabled
        if (config.logReturn) {
          const formattedValue = formatReturnValue(result);
          debug(`Function return: ${fnName} → ${formattedValue}`, {
            function: fnName,
            type: 'return',
            async: false
          });
        }
        
        return result;
      }
    } catch (e) {
      // End timing if enabled
      if (config.logPerformance) {
        endTimer(label, true, { args: args.length, error: true });
      }
      
      // Log error
      error(`Error in function ${fnName}:`, e);
      throw e;
    }
  };
}

/**
 * Helper function to format return values for logging
 * @private
 */
function formatReturnValue(value) {
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return `Array(${value.length})`;
    }
    // Try to identify the object by common properties
    if (value.id) return `{id: "${value.id}", ...}`;
    if (value.name) return `{name: "${value.name}", ...}`;
    return `${value.constructor?.name || 'Object'}{...}`;
  }
  
  return String(value);
}

/**
 * Monitor an object's methods for performance and logging
 * @param {Object} obj - The object whose methods should be monitored
 * @param {Array<string>} methods - Array of method names to monitor, or empty for all
 * @param {string} prefix - Prefix for the monitored methods
 * @param {Object} options - Optional monitoring options (see monitorFunction)
 * @returns {Object} The original object with monitored methods
 */
function monitorMethods(obj, methods = [], prefix = '', options = {}) {
  const methodsToMonitor = methods.length > 0 
    ? methods 
    : Object.getOwnPropertyNames(obj).filter(
        prop => typeof obj[prop] === 'function' && prop !== 'constructor'
      );
  
  methodsToMonitor.forEach(methodName => {
    const originalMethod = obj[methodName];
    if (typeof originalMethod === 'function') {
      obj[methodName] = monitorFunction(
        originalMethod,
        prefix ? `${prefix}.${methodName}` : methodName,
        options
      );
    }
  });
  
  return obj;
}

/**
 * Get all logs
 * @param {string} level - Optional filter by log level
 * @returns {Array} Array of log entries
 */
function getLogs(level = null) {
  if (level) {
    return logs.filter(entry => entry.level === level);
  }
  return [...logs];
}

/**
 * Get performance logs
 * @param {boolean} slowOnly - Whether to only return slow operations
 * @returns {Array} Array of performance log entries
 */
function getPerformanceLogs(slowOnly = false) {
  if (slowOnly) {
    return performanceLogs.filter(entry => entry.severity === 'slow');
  }
  return [...performanceLogs];
}

/**
 * Get error logs
 * @returns {Array} Array of error log entries
 */
function getErrorLogs() {
  return [...errorLogs];
}

/**
 * Clear all logs
 */
function clearLogs() {
  logs.length = 0;
  performanceLogs.length = 0;
  errorLogs.length = 0;
}

/**
 * Configure the logger
 * @param {Object} options - Configuration options
 */
function configure(options) {
  Object.assign(config, options);
}

/**
 * Create a formatted log export for sharing/saving
 * @returns {Object} Formatted log data
 */
function exportLogs() {
  return {
    timestamp: new Date().toISOString(),
    config: { ...config },
    logs: getLogs(),
    performanceLogs: getPerformanceLogs(),
    errorLogs: getErrorLogs(),
    performanceProfiles: getPerformanceProfiles()
  };
}

/**
 * Download logs as a JSON file
 */
function downloadLogs() {
  const exportData = exportLogs();
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `soulsworn-logs-${new Date().toISOString().replace(/:/g, '-')}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generate a summary of logs
 * @returns {Object} Log summary statistics
 */
function getLogSummary() {
  const summary = {
    total: logs.length,
    byLevel: {
      DEBUG: logs.filter(entry => entry.level === 'DEBUG').length,
      INFO: logs.filter(entry => entry.level === 'INFO').length,
      WARN: logs.filter(entry => entry.level === 'WARN').length,
      ERROR: logs.filter(entry => entry.level === 'ERROR').length
    },
    performance: {
      total: performanceLogs.length,
      slow: performanceLogs.filter(entry => entry.severity === 'slow').length,
      critical: performanceLogs.filter(entry => entry.severity === 'critical').length
    },
    timeRange: { 
      start: logs.length > 0 ? logs[0].timestamp : null,
      end: logs.length > 0 ? logs[logs.length - 1].timestamp : null
    },
    mostFrequentMessages: getMostFrequentMessages(10)
  };
  
  // Calculate time span
  if (summary.timeRange.start && summary.timeRange.end) {
    summary.timeRange.span = new Date(summary.timeRange.end) - new Date(summary.timeRange.start);
  }
  
  return summary;
}

/**
 * Get the most frequent log messages
 * @param {number} limit - Maximum number of results
 * @returns {Array} Most frequent messages with counts
 */
function getMostFrequentMessages(limit = 10) {
  const messageCount = {};
  
  // Count occurrences of each message
  logs.forEach(entry => {
    // Use first 100 chars as key to group similar messages
    const key = entry.message.substring(0, 100);
    messageCount[key] = (messageCount[key] || 0) + 1;
  });
  
  // Convert to array and sort by count
  return Object.entries(messageCount)
    .map(([message, count]) => ({ message, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/**
 * Search logs for specific terms
 * @param {Object} options - Search options
 * @param {string} options.term - Search term
 * @param {Array<string>} options.levels - Log levels to include
 * @param {Date} options.startTime - Start time for filtering
 * @param {Date} options.endTime - End time for filtering
 * @param {boolean} options.caseSensitive - Whether search is case sensitive
 * @returns {Array} Filtered log entries
 */
function searchLogs(options) {
  const { 
    term = '', 
    levels,
    startTime, 
    endTime,
    caseSensitive = false 
  } = options;
  
  return logs.filter(entry => {
    // Filter by levels if specified
    if (levels && levels.length > 0 && !levels.includes(entry.level)) {
      return false;
    }
    
    // Filter by time range if specified
    if (startTime && new Date(entry.timestamp) < startTime) {
      return false;
    }
    if (endTime && new Date(entry.timestamp) > endTime) {
      return false;
    }
    
    // Filter by search term if specified
    if (term) {
      const searchIn = JSON.stringify(entry);
      if (caseSensitive) {
        return searchIn.includes(term);
      } else {
        return searchIn.toLowerCase().includes(term.toLowerCase());
      }
    }
    
    return true;
  });
}

/**
 * Group logs by specified field
 * @param {string} field - Field to group by (level, timestamp.hour, etc.)
 * @returns {Object} Grouped logs
 */
function groupLogs(field) {
  const result = {};
  
  logs.forEach(entry => {
    let value;
    
    if (field === 'timestamp.hour') {
      const date = new Date(entry.timestamp);
      value = date.toISOString().substring(0, 13); // YYYY-MM-DDTHH format
    } else if (field === 'timestamp.date') {
      const date = new Date(entry.timestamp);
      value = date.toISOString().substring(0, 10); // YYYY-MM-DD format
    } else if (field.includes('.')) {
      // Handle nested fields like "data.function"
      const parts = field.split('.');
      let current = entry;
      for (const part of parts) {
        current = current && current[part];
      }
      value = current;
    } else {
      value = entry[field];
    }
    
    // Group undefined values under "unknown"
    const key = value !== undefined ? String(value) : 'unknown';
    
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(entry);
  });
  
  return result;
}

/**
 * Generate a distribution chart data from logs
 * @param {string} field - Field to analyze
 * @param {Array} bins - Optional array of bin values
 * @returns {Object} Chart data object
 */
function generateChartData(field, bins = null) {
  const grouped = groupLogs(field);
  
  // Convert to chart-friendly format
  const labels = Object.keys(grouped);
  const data = labels.map(label => grouped[label].length);
  
  return {
    labels,
    datasets: [{
      label: `Distribution by ${field}`,
      data
    }]
  };
}

/**
 * Aggregate performance data by operation
 * @returns {Array} Aggregated performance data
 */
function aggregatePerformanceByOperation() {
  const operations = {};
  
  performanceLogs.forEach(entry => {
    const key = entry.label;
    if (!operations[key]) {
      operations[key] = {
        label: key,
        calls: 0,
        totalTime: 0,
        minTime: Infinity,
        maxTime: 0,
        avgTime: 0,
        profile: entry.profile || 'Uncategorized'
      };
    }
    
    const op = operations[key];
    op.calls++;
    op.totalTime += entry.elapsed;
    op.minTime = Math.min(op.minTime, entry.elapsed);
    op.maxTime = Math.max(op.maxTime, entry.elapsed);
    op.avgTime = op.totalTime / op.calls;
  });
  
  return Object.values(operations);
}

/**
 * Track usage patterns
 * @returns {Object} Usage patterns data
 */
function analyzeUsagePatterns() {
  // Analyze function calls
  const functionCalls = logs.filter(entry => 
    entry.data && entry.data.type === 'entry' && entry.data.function
  );
  
  const functionStats = {};
  functionCalls.forEach(entry => {
    const funcName = entry.data.function;
    if (!functionStats[funcName]) {
      functionStats[funcName] = { count: 0, timestamps: [] };
    }
    functionStats[funcName].count++;
    functionStats[funcName].timestamps.push(entry.timestamp);
  });
  
  // Find call sequences
  const sequences = [];
  let currentSequence = [];
  
  for (let i = 0; i < functionCalls.length; i++) {
    currentSequence.push(functionCalls[i].data.function);
    
    if (currentSequence.length >= 3) {
      sequences.push([...currentSequence]);
      currentSequence.shift();
    }
  }
  
  // Count sequence occurrences
  const sequenceCounts = {};
  sequences.forEach(seq => {
    const key = seq.join(' → ');
    sequenceCounts[key] = (sequenceCounts[key] || 0) + 1;
  });
  
  // Find most common sequences
  const commonSequences = Object.entries(sequenceCounts)
    .map(([sequence, count]) => ({ sequence, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  
  return {
    functionStats,
    commonSequences
  };
}

// Expose the logger API globally
window.Logger = {
  // Basic logging
  log,
  debug,
  info,
  warn,
  error,
  
  // Configuration
  configure,
  
  // Performance monitoring
  startTimer,
  endTimer,
  monitorFunction,
  monitorMethods,
  
  // New performance monitoring features
  getMemoryUsage,
  getPerformanceProfiles,
  resetPerformanceStats,
  startMark,
  endMark,
  measure,
  
  // Function call tracking
  trackFunctionCall: function(fnName, args, type = 'entry') {
    if (type === 'entry') {
      debug(`Function TRACK: ${fnName} called`, { args, type: 'entry' });
    } else if (type === 'exit') {
      debug(`Function TRACK: ${fnName} returned`, { args, type: 'exit' });
    } else if (type === 'error') {
      warn(`Function TRACK: ${fnName} error`, { args, type: 'error' });
    }
  },
  
  // Utility for manual call stack tracking
  startCallStack: function(name = 'CallStack') {
    // Generate a unique call stack ID
    const stackId = `stack_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    debug(`Call stack started: ${name}`, { stackId, name });
    return stackId;
  },
  
  endCallStack: function(stackId, summary = null) {
    debug(`Call stack ended: ${stackId}`, { stackId, summary });
  },
  
  // Log retrieval
  getLogs,
  getPerformanceLogs,
  getErrorLogs,
  clearLogs,
  exportLogs,
  downloadLogs,
  
  // Log filtering
  getCallsForFunction: function(functionName) {
    return logs.filter(entry => 
      entry.data && 
      entry.data.function === functionName
    );
  },
  
  // Performance log filtering
  getCriticalPerformanceLogs: function() {
    return performanceLogs.filter(entry => entry.severity === 'critical');
  },
  
  getProfilePerformanceLogs: function(profileName) {
    return performanceLogs.filter(entry => entry.profile === profileName);
  },
  
  // Log analysis features
  getLogSummary,
  searchLogs,
  groupLogs,
  generateChartData,
  aggregatePerformanceByOperation,
  analyzeUsagePatterns,
  getMostFrequentMessages,
  
  // Constants
  LOG_LEVELS,
  
  // Performance profile constants
  PERFORMANCE_PROFILES: Object.keys(performanceProfiles)
}; 