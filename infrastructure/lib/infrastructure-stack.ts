import * as cdk from "@aws-cdk/core";
import lambda = require("@aws-cdk/aws-lambda");
import { Duration } from "@aws-cdk/core";
import { Config } from "../config/config.model";

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: Config) {
    super(scope, id, props);
    // const lambdaFunction = new lambda.Function(this, "function", {
    //   functionName: "gitub-api-proxy",
    //   runtime: lambda.Runtime.NODEJS_12_X,
    //   handler: "lambda.handler",
    //   code: new lambda.AssetCode("../app/dist"),
    //   timeout: Duration.seconds(30),
    //   memorySize: 256,
    //   environment: {
    //     NODE_ENV: props.applicationEnvironment,
    //     GITHUB_BASE_URL: props.gitHubApi.baseUrl,
    //     GITHUB_API_KEY: props.gitHubApi.apiKey,
    //   },
    // });
  }
}
