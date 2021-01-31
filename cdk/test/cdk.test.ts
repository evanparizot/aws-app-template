import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import { App} from 'monocdk';
import {AppStack} from '../lib/stack';

test('Empty Stack', () => {
    const app = new App();
    // WHEN
    const stack = new AppStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
