// React
import { React } from 'react';

// Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Styling
import './App.css';

// Components
import SignUp from './components/Authentication/SignUp';
import { AuthProvider } from './context/AuthContext';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Authentication/Login';
import { PrivateRoute } from './components/Authentication/PrivateRoute';
import { ForgotPassword } from './components/Authentication/ForgotPassword';

function App() {
	const userLocal = JSON.parse(localStorage.getItem('isSigned'));

	return (
		// <main className='main'>
		<section className='section-center'>
			<Router>
				<AuthProvider>
					<Routes>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route path='/' element={<Dashboard />} />
						</Route>
						<Route exact path='/signup' element={<SignUp />} />
						<Route exact path='/login' element={<Login />} />
						<Route exact path='/forgot-password' element={<ForgotPassword />} />
					</Routes>
				</AuthProvider>
			</Router>
		</section>
		// </main>
	);
}

export default App;
