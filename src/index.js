import React from 'react';
import ReactDOM from 'react-dom';
import frenchMessages from 'aor-language-french';
import englishMessages from './js/i18n/messages/defaultMessages';

import Admin from './js/routes/Admin';
import customMessages from './js/i18n/messages';
import Resource from './js/containers/Resource';

import './assets/scss/style.scss';

const messages = {
    fr: { ...frenchMessages, ...customMessages.fr },
    en: { ...englishMessages, ...customMessages.en },
};

ReactDOM.render(
    <Admin locale="en" messages={messages}>
        <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit} show={PostShow} remove={Delete} icon={PostIcon} />
    </Admin>,
  document.getElementById('app'),
);
