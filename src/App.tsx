import DefaultThemeApp from './configs/DefaultTheme';
import GlobalStyle from './configs/GlobalStyle';
import { RoutesApp } from './routes/RoutesApp';

export function App() {
	return (
		<DefaultThemeApp>
			<GlobalStyle />
			<RoutesApp />
		</DefaultThemeApp>
	);
}
