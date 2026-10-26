import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';
import { format, parseISO } from 'date-fns';
import { Meetup } from '../../../src/components/Meetup';
import { factory } from '../../utils/factory';
import { pt } from 'date-fns/locale/pt';

describe('Meetup', () => {
  it('should be able to show meetup details', async () => {
    const meetup = await factory.attrs('Subscription');

    const tagText = 'Tag';
    const childrenText = 'Lorem Ipsum';

    const date = parseISO(meetup.date);
    const options = {
      locale: pt,
    };

    meetup.full_date = true;
    meetup.start_time = format(date, 'HH:mm', options);
    meetup.short_date = format(date, 'dd MMM', options);
    meetup.weekday = format(date, 'EEEE', options);

    const { getByText, getByTestId } = await render(
      <Meetup
        data={meetup}
        tag={{
          icon: <View testID="icon" />,
          text: tagText,
        }}
      >
        <Text>{childrenText}</Text>
      </Meetup>
    );

    expect(getByTestId(`banner_` + meetup.id).props.source.uri).toBe(
      meetup.banner.url
    );
    expect(getByTestId('icon')).toBeTruthy();
    expect(getByText(tagText)).toBeTruthy();

    expect(getByText(meetup.title)).toBeTruthy();
    expect(getByText(meetup.description)).toBeTruthy();

    expect(getByText(meetup.short_date)).toBeTruthy();
    expect(getByText(meetup.weekday)).toBeTruthy();
    expect(getByText(meetup.start_time)).toBeTruthy();

    expect(
      getByText(
        meetup.localization
          .split(/-/)
          .map((s) => s.trim())
          .join('\n')
      )
    ).toBeTruthy();
    expect(getByText(meetup.organizer.name)).toBeTruthy();

    expect(getByText(childrenText)).toBeTruthy();
  });
});
