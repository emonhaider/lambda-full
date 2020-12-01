import { ApplicationEnvironment, Config } from "./config.model";

import dev = require("../config.dev.json");
import uat = require("../config.production.json");
import qa = require("../config.qa.json");
import production = require("../config.production.json");

export class ConfigService {
  static getConfig(env: ApplicationEnvironment): Config {
    if (!env) throw new Error("Invalid argument. Env variable is not valid!");

    console.log(`Getting configuration from ${env}.json`);
    var config: Config;
    switch (env) {
      case "dev":
      default:
        config = <Config>dev;
      case "qa":
        config = <Config>qa;
      case "uat":
        config = <Config>uat;
      case "production":
        config = <Config>production;
    }
    if (!process.env.GITHUB_API_KEY) {
      throw new Error(
        "GITHUB_API_KEY key not setup. Please make it available through the environment!"
      );
    }
    config.gitHubApi.apiKey = process.env.GITHUB_API_KEY;
    return config;
  }
}
