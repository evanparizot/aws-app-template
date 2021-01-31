import {Construct, Stack, StackProps, SecretValue} from 'monocdk';
import { Artifact } from 'monocdk/aws-codepipeline';
import { GitHubSourceAction } from 'monocdk/aws-codepipeline-actions';
import { CdkPipeline, SimpleSynthAction} from 'monocdk/pipelines';
import { AppStage } from './stage';

export class PipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // Artifact representing the source code
        const sourceArtifact = new Artifact();

        // Artifact representing the cloud assembly (CF Template + any other assets)
        const cloudAssemblyArtifact = new Artifact();

        const pipeline = new CdkPipeline(this, 'Pipeline', {
            pipelineName: 'Pipeline',
            cloudAssemblyArtifact,

            sourceAction: new GitHubSourceAction({
                actionName: 'Github',
                output: sourceArtifact,
                oauthToken: SecretValue.secretsManager('github-token'),
                owner: 'evanparizot',
                repo:''
            }),

            synthAction: SimpleSynthAction.standardNpmSynth({
                sourceArtifact,
                cloudAssemblyArtifact,
                buildCommand: 'npm run build'
            })
        });

        const alpha = pipeline.addApplicationStage(new AppStage(this, 'Alpha', {
            env : {
                account: '',
                region: ''
            }
        }));

        const beta = pipeline.addApplicationStage(new AppStage(this, 'Beta', {
            env:  {
                account: '',
                region: ''
            }
        }));

        const prod = pipeline.addApplicationStage(new AppStage(this, 'Prod', {
            env: {
                account: '',
                region: ''
            }
        }));

    }


}