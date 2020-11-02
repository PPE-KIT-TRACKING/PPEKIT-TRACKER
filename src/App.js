import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/app/common/components/GlobalStyles';
import 'src/app/common/mixins/chartjs';
import theme from 'src/app/common/theme';
import routes from 'src/routes';

const App = () => {
	const routing = useRoutes(routes);

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			{routing}
		</ThemeProvider>
	);
};

export default App;
