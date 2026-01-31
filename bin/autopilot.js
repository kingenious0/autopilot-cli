#!/usr/bin/env node
const { Command } = require("commander");
const { initRepo } = require("../src/init");
const { startWatcher } = require("../src/start");
const { stopWatcher } = require("../src/stop");
const { statusWatcher } = require("../src/status");

const program = new Command();

program
  .name("autopilot")
  .description("Auto commit & push with safety rails")
  .version("0.1.0");

program.command("init").description("Initialize autopilot in this repo").action(initRepo);
program.command("start").description("Start autopilot watcher").action(startWatcher);
program.command("stop").description("Stop autopilot watcher").action(stopWatcher);
program.command("status").description("Show autopilot status").action(statusWatcher);

program.parse();
