import cdk = require("@aws-cdk/core");

export interface Config extends cdk.StackProps {
  applicationEnvironment: string;
  gitHubApi: { baseUrl: string; apiKey: string };
}

export type ApplicationEnvironment = "dev" | "qa" | "uat" | "production";
