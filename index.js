const { exec } = require("child_process");
const { error } = require("console");

_timeIsSet = false;

const Run = () => {
  if (!_timeIsSet) {
    exec('tasklist /fi "imagename eq discord.exe"', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        console.log("stderr: ", stderr);
      } else {
        // console.log("stdout: ", stdout);
        if (!stdout.toString().includes("No tasks")) {
          console.log("Running");
        } else {
          console.log("Not Running");
        }
      }
    });
  }
  setTimeout(Run, 1000);
};

Run();
