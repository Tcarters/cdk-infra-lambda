import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class CdkInfraLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
  
    // Create a Lambda function
    new lambda.Function(this, 'LambdaFunction', {
      functionName: 'MyfirstLbdaFunction',
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: new lambda.AssetCode('src'),
      timeout: cdk.Duration.seconds(30),
      memorySize: 128,
      // environment: {
      //   LAMBDA_TASK_ROOT: '/tmp',
      // },
    });
  }
}
