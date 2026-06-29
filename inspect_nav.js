const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(fname => {
  const content = fs.readFileSync(fname, 'utf8');
  console.log(`=== ${fname} ===`);
  
  // Find headers
  let headerRegex = /<header\b[^>]*>([\s\S]*?)<\/header>/gi;
  let headerMatch;
  let headerCount = 0;
  while ((headerMatch = headerRegex.exec(content)) !== null) {
    headerCount++;
    const startLine = content.substring(0, headerMatch.index).split('\n').length;
    const endLine = content.substring(0, headerMatch.index + headerMatch[0].length).split('\n').length;
    const lines = headerMatch[0].split('\n');
    const preview = lines[0] + " ... " + lines[lines.length - 1];
    console.log(`  Header ${headerCount}: lines ${startLine}-${endLine} | ${preview}`);
  }
  if (headerCount === 0) console.log("  No <header> found");

  // Find footers
  let footerRegex = /<footer\b[^>]*>([\s\S]*?)<\/footer>/gi;
  let footerMatch;
  let footerCount = 0;
  while ((footerMatch = footerRegex.exec(content)) !== null) {
    footerCount++;
    const startLine = content.substring(0, footerMatch.index).split('\n').length;
    const endLine = content.substring(0, footerMatch.index + footerMatch[0].length).split('\n').length;
    const lines = footerMatch[0].split('\n');
    const preview = lines[0] + " ... " + lines[lines.length - 1];
    console.log(`  Footer ${footerCount}: lines ${startLine}-${endLine} | ${preview}`);
  }
  if (footerCount === 0) console.log("  No <footer> found");

  // Find mobile drawer overlay and mobileDrawer
  let overlayRegex = /<div\b[^>]*id="drawerOverlay"[\s\S]*?<\/div>/gi;
  let overlayMatch = overlayRegex.exec(content);
  if (overlayMatch) {
    const startLine = content.substring(0, overlayMatch.index).split('\n').length;
    console.log(`  drawerOverlay found near line ${startLine}`);
  }

  let drawerRegex = /<div\b[^>]*id="mobileDrawer"[\s\S]*?<\/div>\s*<\/div>/gi;
  // let's try a simpler regex or look for id="mobileDrawer"
  let drawerIndex = content.indexOf('id="mobileDrawer"');
  if (drawerIndex !== -1) {
    const startLine = content.substring(0, drawerIndex).split('\n').length;
    console.log(`  mobileDrawer found near line ${startLine}`);
  }

  // Find script tags
  let scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  let scriptMatch;
  let scriptCount = 0;
  while ((scriptMatch = scriptRegex.exec(content)) !== null) {
    scriptCount++;
    const scriptText = scriptMatch[1];
    if (scriptText.includes('themeToggle') || scriptText.includes('mobileDrawer')) {
      const startLine = content.substring(0, scriptMatch.index).split('\n').length;
      const endLine = content.substring(0, scriptMatch.index + scriptMatch[0].length).split('\n').length;
      console.log(`  Theme/Drawer Script: lines ${startLine}-${endLine}`);
    }
  }
});
