#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log(' Starting Heal Development Environment');
console.log('=====================================');

// Check if netlify.toml exists
const netlifyConfigExists = fs.existsSync('netlify.toml');
const hasNetlifyFunctions = fs.existsSync('netlify/functions');

if (netlifyConfigExists && hasNetlifyFunctions) {
  console.log(' Netlify configuration detected');
  console.log(' Starting with Netlify Dev (includes functions)...');
  
  const netlifyDev = spawn('npx', ['netlify', 'dev'], {
    stdio: 'inherit',
    shell: true
  });

  netlifyDev.on('error', (error) => {
    console.error(' Failed to start Netlify Dev:', error.message);
    console.log(' Falling back to regular Next.js dev server...');
    startNextDev();
  });

  netlifyDev.on('close', (code) => {
    if (code !== 0) {
      console.log(' Netlify Dev exited, starting Next.js dev server...');
      startNextDev();
    }
  });
} else {
  console.log(' Starting Next.js development server...');
  startNextDev();
}

function startNextDev() {
  const nextDev = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true
  });

  nextDev.on('error', (error) => {
    console.error(' Failed to start Next.js dev server:', error.message);
    process.exit(1);
  });
}