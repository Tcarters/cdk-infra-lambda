# Welcome to Small CDK TypeScript project to ccreate a Lambda function.

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template


## Requirements

- Before starting, we need to initialize project like this:
```bash
    ## Install cdk  and typescript
    sudo npm install -g aws-cdk

    sudo  npm install -g npm@9.6.3

    cdk --version
 
    sudo npm install -g typescript

```


## Bootstrap our AWS Account:
- We need initialize our environment with our AWS Account
```bash
    # Configure our AWS Account locally using aws credentials
    aws configure

    # Get Our AWS Account
    aws sts get-caller-identity

    #Display the default region
    aws configure get region

    ## Bootstrap our AWS Account
    cdk bootstrap aws://ACCOUNT-NUMBER/REGION

```

## Build the stack & Check the Difference

```bash
    ## Build the stack
    npm run build

    ## Check the difference to see what will be deployed or Not ..
    cdk diff

    ## Output:
    []:~/cdk-infra-lambda$ cdk diff
        Stack CdkInfraLambdaStack
        IAM Statement Changes
        ┌───┬───────────────────────────────────┬────────┬────────────────┬──────────────────────────────┬───────────┐
        │   │ Resource                          │ Effect │ Action         │ Principal                    │ Condition │
        ├───┼───────────────────────────────────┼────────┼────────────────┼──────────────────────────────┼───────────┤
        │ + │ ${LambdaFunction/ServiceRole.Arn} │ Allow  │ sts:AssumeRole │ Service:lambda.amazonaws.com │           │
        └───┴───────────────────────────────────┴────────┴────────────────┴──────────────────────────────┴───────────┘
        IAM Policy Changes
        ┌───┬───────────────────────────────┬────────────────────────────────────────────────────────────────────────────────┐
        │   │ Resource                      │ Managed Policy ARN                                                             │
        ├───┼───────────────────────────────┼────────────────────────────────────────────────────────────────────────────────┤
        │ + │ ${LambdaFunction/ServiceRole} │ arn:${AWS::Partition}:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole │
        └───┴───────────────────────────────┴────────────────────────────────────────────────────────────────────────────────┘
        (NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

        Parameters
        [+] Parameter BootstrapVersion BootstrapVersion: {"Type":"AWS::SSM::Parameter::Value<String>","Default":"/cdk-bootstrap/hnb659fds/version","Description":"Version of the CDK Bootstrap resources in this environment, automatically retrieved from SSM Parameter Store. [cdk:skip]"}

        Conditions
        [+] Condition CDKMetadata/Condition CDKMetadataAvailable: {"Fn::Or":[{"Fn::Or":[{"Fn::Equals":[{"Ref":"AWS::Region"},"af-south-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"ap-east-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"ap-northeast-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"ap-northeast-2"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"ap-south-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"ap-southeast-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"ap-southeast-2"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"ca-central-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"cn-north-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"cn-northwest-1"]}]},{"Fn::Or":[{"Fn::Equals":[{"Ref":"AWS::Region"},"eu-central-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"eu-north-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"eu-south-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"eu-west-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"eu-west-2"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"eu-west-3"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"me-south-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"sa-east-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"us-east-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"us-east-2"]}]},{"Fn::Or":[{"Fn::Equals":[{"Ref":"AWS::Region"},"us-west-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"us-west-2"]}]}]}

        Resources
        [+] AWS::IAM::Role LambdaFunction/ServiceRole LambdaFunctionServiceRoleC555A460 
        [+] AWS::Lambda::Function LambdaFunction LambdaFunctionBF21E41F 

        Other Changes
        [+] Unknown Rules: {"CheckBootstrapVersion":{"Assertions":[{"Assert":{"Fn::Not":[{"Fn::Contains":[["1","2","3","4","5"],{"Ref":"BootstrapVersion"}]}]},"AssertDescription":"CDK bootstrap stack version 6 required. Please run 'cdk bootstrap' with a recent version of the CDK CLI."}]}}
```

