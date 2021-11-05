## Running

```
yarn install
yarn start
```

webpack server will start on port 3003 http://localhost:3003


## Deploying to AWS

This is a bit tricky but possible

create a new file

```
  touch .env.script
```

then edit and add the following with the proper values from AWS

```
  DISTRIBUTION=<AWS Distribution ID>
  S3_BUCKET=<AWS Bucket Name>
```