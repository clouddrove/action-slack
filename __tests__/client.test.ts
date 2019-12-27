process.env.GITHUB_WORKFLOW = 'PR Checks';
process.env.GITHUB_SHA = 'b24f03a32e093fe8d55e23cfd0bb314069633b2f';
process.env.GITHUB_REF = 'refs/heads/feature/19';
process.env.GITHUB_EVENT_NAME = 'push';
import { Client, With } from '../src/client';

const fixedFields = () => {
  return [
    {
      short: true,
      title: 'repo',
      value: '<https://github.com/8398a7/action-slack|8398a7/action-slack>',
    },
    {
      short: true,
      title: 'message',
      value: '[#19] support for multiple user mentions',
    },
    {
      short: true,
      title: 'commit',
      value:
        '<https://github.com/8398a7/action-slack/commit/b24f03a32e093fe8d55e23cfd0bb314069633b2f|b24f03a32e093fe8d55e23cfd0bb314069633b2f>',
    },
    { short: true, title: 'author', value: '839<8398a7@gmail.com>' },
    {
      short: true,
      title: 'action',
      value:
        '<https://github.com/8398a7/action-slack/commit/b24f03a32e093fe8d55e23cfd0bb314069633b2f/checks|action>',
    },
    { short: true, title: 'eventName', value: process.env.GITHUB_EVENT_NAME },
    { short: true, title: 'ref', value: process.env.GITHUB_REF },
    { short: true, title: 'workflow', value: process.env.GITHUB_WORKFLOW },
  ];
};

describe('8398a7/action-slack', () => {
  beforeEach(() => {
    process.env.GITHUB_REPOSITORY = '8398a7/action-slack';
  });

  it('#success is the expected template', async () => {
    const withParams: With = {
      status: 'success',
      mention: '',
      author_name: '',
      only_mention_fail: '',
      username: '',
      icon_emoji: '',
      icon_url: '',
      channel: '',
    };
    const client = new Client(withParams, process.env.GITHUB_TOKEN, '');
    const msg = 'hello';
    const text = `:white_check_mark: Succeeded GitHub Actions\n${msg}`;
    expect(await client.success(msg)).toStrictEqual({
      attachments: [
        {
          author_name: '',
          channel: '',
          color: 'good',
          fields: fixedFields(),
          icon_emoji: '',
          icon_url: '',
          username: '',
        },
      ],
      text,
    });
  });
});
