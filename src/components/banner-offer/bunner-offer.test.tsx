import { render, screen} from '@testing-library/react';

import { withHistory } from '../mock-component/mock-component';
import { BannerOfferComponent } from './banner-offer';
import { mockOffer } from '../../mock-test/mock-offer/mock-offer';

describe('component: BannerOffer', () => {
  it('should render correctly', () => {
    const expectedText = 'banner-offer';
    const preparedComponent = withHistory(<BannerOfferComponent offer={mockOffer}/>);

    render(preparedComponent);

    expect(screen.getByTestId(expectedText)).toBeInTheDocument();
  });
});
