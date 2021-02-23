import PropTypes from 'prop-types';

const STANDARD_CURRENCY = {
  'USD': '$',
  'EUR': '€',
  'RUB': '₽'
};

export default function Listing({ items = [] }) {
  return (
    <div className="item-list">
      {items.map(item => {
        if (item.state === 'removed') return null;

        const title = (item.title || '').length > 50 ? item.title.slice(0, 50) + '…' : item.title;

        const price = Object.keys(STANDARD_CURRENCY).includes(item.currency_code) ?
          STANDARD_CURRENCY[item.currency_code] + item.price : item.price + ' ' + item.currency_code;

        const level = item.quantity > 20 ? 'high' :
          item.quantity > 10 ? 'medium' : 'low';

        return (
          <div key={item.listing_id} className="item">
            <div className="item-image">
              <a href={item.url}>
                <img src={item.MainImage?.url_570xN} alt={title}/>
              </a>
            </div>
            <div className="item-details">
              <p className="item-title">{title}</p>
              <p className="item-price">{price}</p>
              <p className={`item-quantity level-${level}`}>{item.quantity} left</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Listing.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    listing_id: PropTypes.number.isRequired,
    url: PropTypes.string,
    MainImage: PropTypes.shape({
      url_570xN: PropTypes.string.isRequired
    }),
    title: PropTypes.string,
    currency_code: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number
  })).isRequired
};
