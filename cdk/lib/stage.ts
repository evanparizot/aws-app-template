import { Construct, Stage, StageProps } from 'monocdk';
import { AppStack } from './stack';

export class AppStage extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        new AppStack(this, 'AppStack');
    }
}