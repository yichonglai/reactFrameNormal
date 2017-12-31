import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';//react专属热替换
import {Provider} from 'react-redux';
import store from './redux/store';
import {BrowserRouter as Router} from 'react-router-dom';
import App from 'components/App/App';

//模拟ajax数据 开发环境下、ie11以下不兼容
/* if (MOCK) {
    require('mock/mock');
} */

/*初始化*/
renderWithHotReload(App);

/*热替换*/
if (module.hot) {
    module.hot.accept('components/App/App', () => {
        const NextApp = require('components/App/App').default;
        renderWithHotReload(NextApp);
    });
}

function renderWithHotReload(RootElement) {
    ReactDom.render(
        <AppContainer>
            <Provider store={store}>
                <Router>
                    <RootElement/>
                </Router>
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    )
}
