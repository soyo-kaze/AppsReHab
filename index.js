const { exec } = require("child_process");

_timeIsSet = false;

let appData = {
  discord: {
    imageName: "discord.exe",
    start_time: { hh: 0, mm: 0, ss: 0 },
    end_time: { hh: 0, mm: 0, ss: 0 },
    limit: { hh: 0, mm: 0, ss: 10 },
    running_time: 0,
  },
};

const defaultTime = { hh: 0, mm: 0, ss: 0 };

const timeToSimple = (time) => time.hh + time.mm / 60 + (time.ss * 0.01) / 60;

const RunningTime = (start, end) => timeToSimple(end) - timeToSimple(start);

const limitChecker = (limit, runningTime) => timeToSimple(limit) <= runningTime;

const Running = (program) => {
  // return isTrue;
};

const Close = (program) => {
  exec(`taskkill /f /im ${program}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      console.log("stderr: ", stderr);
      return false;
    } else {
      // console.clear();
      // console.log("stdout: ", stdout);
      if (stdout.toString().includes("SUCCESS")) {
        console.log("Closed");
      } else {
        console.log("Program already Closed");
      }
    }
  });
};

// TODO:  Comment out the code.

const Run = async () => {
  if (!timeToSimple(appData["discord"].start_time)) {
    // console.log(Running(appData["discord"].imageName));
    exec(
      `tasklist /fi "imagename eq ${appData["discord"].imageName}"`,
      (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          console.log("stderr: ", stderr);
        } else {
          console.clear();
          // console.log("stdout: ", stdout);
          if (!stdout.toString().includes("No tasks")) {
            console.log("Running without startTime");
            const date = new Date(Date.now());
            appData["discord"].start_time = {
              hh: date.getHours(),
              mm: date.getMinutes(),
              ss: date.getSeconds(),
            };
          }
        }
      }
    );
  } else {
    exec(
      `tasklist /fi "imagename eq ${appData["discord"].imageName}"`,
      (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          console.log("stderr: ", stderr);
          isTrue = false;
        } else {
          console.clear();
          // console.log("stdout: ", stdout);
          if (!stdout.toString().includes("No tasks")) {
            console.log("Running with startTime");
            const date = new Date(Date.now());
            const end = {
              hh: date.getHours(),
              mm: date.getMinutes(),
              ss: date.getSeconds(),
            };
            let elapsedTime = RunningTime(appData["discord"].start_time, end);
            if (
              limitChecker(
                appData["discord"].limit,
                appData["discord"].running_time + elapsedTime
              )
            ) {
              appData["discord"].start_time = defaultTime;
              appData["discord"].running_time = timeToSimple(
                appData["discord"].limit
              );
              console.log("closing...");
              exec("some.vbs");
              Close(appData["discord"].imageName);
            }
          } else {
            console.log("closing with startTime");
            const date = new Date(Date.now());
            const end = {
              hh: date.getHours(),
              mm: date.getMinutes(),
              ss: date.getSeconds(),
            };
            appData["discord"].running_time = RunningTime(
              appData["discord"].start_time,
              end
            );
            appData["discord"].start_time = defaultTime;
          }
        }
      }
    );
  }
  // console.log(appData);
  setTimeout(Run, 1000);
};

Run();
