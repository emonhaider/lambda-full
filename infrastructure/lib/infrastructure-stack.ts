import * as cdk from "@aws-cdk/core";
import lambda = require("@aws-cdk/aws-lambda");
import { Duration } from "@aws-cdk/core";
import { Config } from "../config/config.model";
import {
  AuthorizationType,
  Cors,
  LambdaIntegration,
  MethodLoggingLevel,
  RestApi,
} from "@aws-cdk/aws-apigateway";
import { Tracing } from "@aws-cdk/aws-lambda";

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: Config) {
    super(scope, id, props);
    const lambdaFunction = new lambda.Function(this, "function", {
      functionName: "gitub-api-proxy",
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.handler",
      code: new lambda.AssetCode("../app/dist"),
      timeout: Duration.seconds(30),
      memorySize: 256,
      environment: {
        NODE_ENV: props.applicationEnvironment,
        GITHUB_BASE_URL: props.gitHubApi.baseUrl,
        GITHUB_API_KEY: props.gitHubApi.apiKey,
      },
      tracing: Tracing.ACTIVE, // enables x-ray tracing
    });

    const api = new RestApi(this, "Api", {
      restApiName: `Github-Proxy`,
      deployOptions: {
        loggingLevel: MethodLoggingLevel.INFO,
        dataTraceEnabled: true, // logs the incoming request to cloudwatch
        tracingEnabled: true, // enables x-ray tracing
      },
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS, // Only limit to certain websites in production
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: Cors.DEFAULT_HEADERS,
      },
    });

    var lambdaIntegration = new LambdaIntegration(lambdaFunction);
    api.root.addMethod("GET", lambdaIntegration);

    // const usersResource = api.root.addResource("users/{username}");
    // usersResource.addMethod("GET", new LambdaIntegration(lambdaFunction), {
    //   authorizationType: AuthorizationType.NONE,
    // });
  }
}
