import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as path from 'path';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. Backend Hono Lambda Function
    const fn = new nodejs.NodejsFunction(this, 'HonoFunction', {
      entry: path.join(__dirname, '../../../apps/api/src/index.ts'),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_20_X,
      architecture: lambda.Architecture.ARM_64, // Faster & lower cost on Lambda
      bundling: {
        minify: true,
        sourceMap: true,
        // Inlines monorepo packages into the Lambda bundle
        externalModules: [],
      },
      environment: {
        NODE_ENV: 'production',
        SUPABASE_URL: process.env.SUPABASE_URL || '',
        SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || '',
        GROQ_API_KEY: process.env.GROQ_API_KEY || '',
      },
    });

    // Create a public Function URL for the Hono Lambda as shown in Hono docs
    const fnUrl = fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['*'],
        allowedMethods: [lambda.HttpMethod.ALL],
        allowedHeaders: ['*'],
      },
    });

    // 2. Private S3 Bucket for Vite Web Assets
    const websiteBucket = new s3.Bucket(this, 'ViteSiteBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Change to RETAIN for production state
      autoDeleteObjects: true,
    });

    // 3. CloudFront Distribution (CDN)
    const distribution = new cloudfront.Distribution(this, 'ViteDistribution', {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(websiteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
      // Handles Single Page App (SPA) client-side routing (React Router / TanStack)
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
    });

    // 4. Deploy local Vite dist build assets to S3 and invalidate CloudFront cache
    new s3deploy.BucketDeployment(this, 'DeployViteSite', {
      sources: [s3deploy.Source.asset(path.join(__dirname, '../../../apps/web/dist'))],
      destinationBucket: websiteBucket,
      distribution,
      distributionPaths: ['/*'],
      // Explicitly set memory size for CDK's internal helper Lambda
      memoryLimit: 512,
    });

    // Stack Outputs
    new cdk.CfnOutput(this, 'ApiUrl', { value: fnUrl.url });
    new cdk.CfnOutput(this, 'CloudFrontUrl', { value: `https://${distribution.distributionDomainName}` });
  }
}