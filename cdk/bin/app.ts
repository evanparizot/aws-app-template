#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'monocdk';
import { PipelineStack } from '../lib/pipeline';

const app = new App();
new PipelineStack(app, 'CdkStack', {
    env: {
        account: '',
        region: ''
    }
});
