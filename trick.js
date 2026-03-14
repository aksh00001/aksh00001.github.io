import readline from 'readline';
import { execSync } from 'child_process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.clear();
console.log('\x1b[31m%s\x1b[0m', '🚨 WARNING: UNAUTHORIZED CLONE DETECTED 🚨');
console.log('\x1b[33m%s\x1b[0m', 'Your IP has been logged. Preparing to corrupt repository files...\n');

const promptUser = () => {
  rl.question('\x1b[31mWhy did you clone my repo?\nTo unlock this repository, you must type exactly: AKSH MERA PAPA HAI\n> \x1b[0m', (answer) => {
    if (answer === 'AKSH MERA PAPA HAI') {
      console.log('\x1b[32m\nGood boy. Access granted. Welcome to the circus 🤡\x1b[0m\n');
      rl.close();
      // Start the actual vite server (which opens the circus HTML page!)
      try {
        execSync('npm run build && npm run preview', { stdio: 'inherit' });
      } catch (err) {
        // user killed the server
      }
    } else {
      console.log('\x1b[31m\n❌ WRONG ANSWER. Try again, code thief. 😂\x1b[0m\n');
      promptUser(); // Ask again!
    }
  });
};

promptUser();
