#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { InfrastructureStack } from "../lib/infrastructure-stack";
import { ConfigService } from "../config/config.service";
import { ApplicationEnvironment } from "../config/config.model";

const app = new cdk.App();
var config = ConfigService.getConfig(<ApplicationEnvironment>process.env.ENV);
new InfrastructureStack(app, "InfrastructureStack", config);
