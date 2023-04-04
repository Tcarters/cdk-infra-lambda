# Use AWS CDK Tool to create a Lambda function in AWS Account.

In this repo, we write the Aws CDK code to create a Lambda function with as base language TypeScript and we deploy it to AWS...

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
* The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Requirements

- Before starting, we need to initialize project like this:
```bash
    ## Install cdk  and typescript
    sudo npm install -g aws-cdk

    sudo  npm install -g npm@9.6.3

    cdk --version
 
    sudo npm install -g typescript
```

## Checking my Account  before Launch

![image](https://user-images.githubusercontent.com/71230412/229918731-95431bd0-2129-4ef9-9423-4c2dc3bca771.png)
    
 ![image](https://user-images.githubusercontent.com/71230412/229919639-ef164442-15a4-4502-96cb-9721e4ee219e.png)


- - -

## Setting up
- Create our working directory
```bash
    mkdir cdk-infra-lambda && cdk-infra-lambda

    ## Initialize our App
    cdk init --language typescript

```
## Code our function
- We have to write our code in the file `lib/cdk-infra-lambda-stack.ts` :

```Javascript
    // We are just creating a function name `MyfirstLbdaFunction` which take a name & value pair and return a string
     new lambda.Function(this, 'LambdaFunction', {
      functionName: 'MyfirstLbdaFunction',
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: new lambda.AssetCode('src'),
      timeout: cdk.Duration.seconds(30),
      memorySize: 128,
```
- The instructing code is defined in the folder `src/index.ts`

```javascript
    export const handler = async (event: { name: string } ) => {
        const result : string = event.name ? `Nice Job ${event.name}!` : 'Failure downgraded!';
        return result;
};
```


## Bootstrap our AWS Account:
- We need to initialize our environment with our AWS Account before building our application.
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

    ## Output got with the `cdk diff` command :
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


## Deploy our Stack to AWS

```bash
    cdk deploy
```


## Result & Test the deployment

- In our CloudFormation page, we can see really that a new stack were created by AWS CDk CLI
![image](https://user-images.githubusercontent.com/71230412/229923131-978878a0-dd40-4486-b5c0-e8460fbcc577.png)

- A new Lambda function named `MyfirstLbdafunction ` was created also.
![image](https://user-images.githubusercontent.com/71230412/229923433-aa717870-1e35-4c78-93e1-781e84330cdc.png)

- Now test our created function on AWS :

![image](https://user-images.githubusercontent.com/71230412/229924561-5bda9191-836d-4c3b-b0cf-c0e384d7eb8a.png)

![image](https://user-images.githubusercontent.com/71230412/229924919-4da6dd14-dd7b-4a18-bcda-c38841712f07.png)

And we can see our Function works as expected...



## Cleaning up by destroying our stack
```bash
    cdk destroy
```
![image](https://user-images.githubusercontent.com/71230412/229930968-20cf91d4-0dff-461e-a263-412151f5dc3d.png)

- In Our AWS Account, we can see the Lambda function was deleted after run `cdk destroy`...

![image](https://user-images.githubusercontent.com/71230412/229932436-f254d688-f8dc-4b45-ad90-1e00577cce45.png)

