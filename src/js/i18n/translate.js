import PropTypes from 'prop-types';
import { getContext } from 'recompose';

const Translate = (BaseComponent) => {
    const TranslatedComponent = getContext({
        locale: PropTypes.string.isRequired,
        translate: PropTypes.func.isRequired,
    })(BaseComponent);
    TranslatedComponent.defaultProps = BaseComponent.defaultProps;
    return TranslatedComponent;
};

export default Translate;
